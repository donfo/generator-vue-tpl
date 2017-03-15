'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-nodejs-bin:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
    .withArguments(['name-x'])
    .toPromise()
  })

  it('creates files', () => {
    assert.file([
      'package.json'
    ])
  })
})
