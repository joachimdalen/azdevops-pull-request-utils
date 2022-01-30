import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import * as path from 'path';
import tl = require('azure-pipelines-task-lib/task');

describe('PullRequestStatus Suite', function () {
  this.retries(2);
  
  before(function () {
    process.env['SYSTEM_TEAMFOUNDATIONCOLLECTIONURI'] = 'http://localhost/someproject';
    process.env['BUILD_REPOSITORY_ID'] = 'a5253ab2-00bf-4ce9-824a-d3449b1f49e1';
    process.env['SYSTEM_ACCESSTOKEN'] = '123';
    process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'] = '10';
  });

  after(() => {
    delete process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'];
    delete process.env['SYSTEM_TEAMFOUNDATIONCOLLECTIONURI'];
    delete process.env['BUILD_REPOSITORY_ID'];
    delete process.env['SYSTEM_ACCESSTOKEN'];
  });

  it('should complete with warnings if pull request id is not set', function () {
    delete process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'];

    const taskPath = path.join(__dirname, 'L0NoPullRequestId.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(
      tr.warningIssues[0].indexOf('Pull request id is not set') !== -1,
      'task should have completed with warnings'
    );
  });

  it('should use pre-defined pull request id if given', function () {
    const taskPath = path.join(__dirname, 'L0AlternativePrId.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();
    assert(tr.stdOutContained(`Created status with id 12345 on pull request with id 123`));
  });
});
