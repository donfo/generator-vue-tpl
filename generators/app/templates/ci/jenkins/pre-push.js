var chalk = require('chalk')

console.log(chalk.bgRed.white('pre-push'))

try {
  var env = require('../env')
  var config = env.ci
} catch (err) {
  console.log(utils.error('no env config'))
  console.log(chalk.white.bgRed.bold(' Warn ') + ' ' + chalk.green.bold('Please copy env.example.js as env.js'))
  process.exit(1)
}

if (
  (!config.jenkinsJobName || !config.jenkinsJobName.length)
  || (!config.jenkinsServer || !config.jenkinsServer.length)
  || (!config.jenkinsUsername || !config.jenkinsUsername.length)
  || (!config.jenkinsPassword || !config.jenkinsPassword.length)
) {
  console.log(utils.error('wrong jenkins config'))
  process.exit(1)
}

var JOB_NAME = config.jenkinsJobName
var BUILD_BRANCH = config.jenkinsBuildBranch || 'master'
var SRC_DIR_REGEXP = 'frontend.src'

var JENKINS_SERVER = config.jenkinsServer
var JENKINS_USER = config.jenkinsUsername
var JENKINS_PASSWORD = config.jenkinsPassword

var jenkins = require('jenkins')('http://' + JENKINS_USER + ':' + JENKINS_PASSWORD + '@' + JENKINS_SERVER);
var exec = require('child_process').exec

exec('git status', (error, statusStdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(statusStdout)
  var branchRegExp = new RegExp(`On branch ${BUILD_BRANCH}`)
  if (branchRegExp.test(statusStdout)) {
    exec('git show HEAD --stat', (error, showSdtdout, stderr) => {
      console.log(showSdtdout)
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      var srcDirRegExp = new RegExp(SRC_DIR_REGEXP)
      if (srcDirRegExp.test(showSdtdout)) {
        console.log('[*] src changed')
        gitPull(function () {
          if (!(/jenkins_auto_build/.test(showSdtdout))) {
            console.log('[*] run jenkins build, it will push the built version for you automatically')
            runJenkinsJob()
          }
        })
      } else {
        console.log('[*] src not change, no need to run jenkins build')
        gitPull()
      }
    })
  } else {
    console.log('[*] not on build branch')
    gitPull()
  }
})

var emptyFunc = function () {}

function gitPull (cb, errorCb) {
  cb = cb || emptyFunc
  errorCb = errorCb || emptyFunc
  exec(`git pull origin ${BUILD_BRANCH}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      errorCb()
      return
    }
    console.log(`[*] pull ${BUILD_BRANCH}`)
    cb()
  })
}

function runJenkinsJob () {
  jenkins.job.build(JOB_NAME, function(err) {
    if (err) throw err
  })
}