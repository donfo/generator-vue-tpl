var path = require('path');
var express = require('express');
var app = express();

process.env.NODE_ENV = 'testing';
var config = require('../../../config/index');

const RESULT_PATH = path.join(__dirname, '../flow-test-results');

var showReport;
var filterTest;
var debugMode;
var remoteDebug;
var dashboard;
var port = config.build.port || 9001;

process.argv.forEach(function(arg, i){
	if(arg === 'report'){
		showReport = true;
	}
	if(/^debug/.test(arg)){
		debugMode = true;
	}
	if(/^remoteDebug/.test(arg)){
		remoteDebug = true;
	}
	if(/^test=/.test(arg)){
		filterTest = arg.split('=')[1];
	}
	if(/^dashboard/.test(arg)){
		dashboard = true;
	}
});

var flow = require('phantomflow').init({
// var flow = require('E:/01wangmeng/phantomflow/phantomflow').init({
// var flow = require('E:\\02Project\\MyGitHub\\PhantomFlow\\phantomflow.js').init({
	//earlyexit: true, // abort as soon as a test fails (also prevents report creation)
	debug: debugMode ? 2 : undefined,
	includes: null,
  skipVisualTests: false,
  test: filterTest,
	remoteDebug: remoteDebug,
	dashboard: dashboard,
	createReport: true,
	results: path.resolve(RESULT_PATH)
});

if(showReport){

	flow.report();

} else {
	// console.log(config.build.assetsRoot)
	// connect(
	// 	connect.static(config.build.assetsRoot) // Serve the system under test for this example
	// ).listen(port);
	// console.log('\n' + 'Test server is listening at http://localhost:' + port + '\n')
	app.use('/', express.static(config.build.assetsRoot))
	app.listen(port, function (err) {
		if (err) {
			console.log(err)
			return
		}
		console.log('\n' + 'Test server is listening at http://localhost:' + port + '\n')
	})

	// flow.event.on('exit', function(){
	// 	process.exit(0);
	// });

	flow.run(function(code){
		process.exit(code);
	});
}