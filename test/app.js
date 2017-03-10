'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-nodejs-bin:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
    .withArguments(['name-x'])
    .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json'
    ]);
  });
});