import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import * as path from 'path';

describe('PullRequestStatus Suite', function () {
  this.retries(2);

  beforeEach(function () {
    process.env['SYSTEM_TEAMFOUNDATIONCOLLECTIONURI'] = 'http://localhost/someproject';
    process.env['BUILD_REPOSITORY_ID'] = 'a5253ab2-00bf-4ce9-824a-d3449b1f49e1';
    process.env['SYSTEM_ACCESSTOKEN'] = '123';
    process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'] = '10';
  });

  afterEach(() => {
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

  it('should not update if existing state is not in whenState', function () {
    const taskPath = path.join(__dirname, 'WhenStateNoMatch.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(
      tr.stdOutContained(
        'Skipping updating state. NotSet is not in any of the updatable states Failed,Pending'
      )
    );
  });
  it('should update if existing state is in whenState', function () {
    const taskPath = path.join(__dirname, 'WhenStateMatches.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(`Updated status with id 12345 on pull request with id 10`));
  });
  it('should update if whenState is not defined', function () {
    const taskPath = path.join(__dirname, 'WhenStateNotDefined.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(`Updated status with id 12345 on pull request with id 10`));
  });
  it('should create when whenState is set, but no status is created', function () {
    const taskPath = path.join(__dirname, 'WhenStateUpdateDoesNotExist.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(`Updated status with id 12345 on pull request with id 10`));
  });
});
