import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import * as path from 'path';

describe('PullRequestComments Suite', function () {
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

    assert(tr.succeeded);
    assert(
      tr.warningIssues[0].indexOf('Pull request id is not set') !== -1,
      'task should have completed with warnings'
    );
  });
  it('should error when no content is set', function () {
    process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'] = '10';
    const taskPath = path.join(__dirname, 'L0NoCommentSet.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.failed);

    assert(
      tr.errorIssues[0].indexOf('Comment content is not set') !== -1,
      'task should have completed with warnings'
    );
  });
  it('should post comment if skipIfCommentExists=true and comment is not posted', function () {
    const taskPath = path.join(__dirname, 'L0PostCommentSkipTrueNotExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Posted pull request thread'));
  });

  it('should not post comment if skipIfCommentExists=true and comment is posted', function () {
    const taskPath = path.join(__dirname, 'L0NotPostCommentSkipTrueExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Posted pull request thread') === false);
  });

  it('should post comment if skipIfCommentExists=false and comment is posted', function () {
    const taskPath = path.join(__dirname, 'L0PostCommentSkipFalseExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Posted pull request thread'));
  });

  it('should post comment when action is createOrUpdate and comment does not exsist', function () {
    const taskPath = path.join(__dirname, 'L0CreateOrUpdateCreatesIfNotExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Posted pull request thread'));
  });
  it('should post comment when action is createOrUpdate and comments exists but target does not', function () {
    const taskPath = path.join(__dirname, 'L0CreateOrUpdateCreatesIfNoMatchFound.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Posted pull request thread'));
  });
  it('should post comment when action is createOrUpdate and comments exists with id but target does not', function () {
    const taskPath = path.join(__dirname, 'L0CreateOrUpdateCreatesIfMulitpleButNoMatch.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Posted pull request thread'));
  });

  it('should update comment when action is createOrUpdate and comment exsist', function () {
    const taskPath = path.join(__dirname, 'L0CreateOrUpdateUpdatesIfExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(
      tr.stdOutContained(
        'Updated pull request comment with id: 123 on thread with id: 1222 on PR with id: 10'
      )
    );
  });
  it('should update correct comment when action is createOrUpdate and multiple comments exsist', function () {
    const taskPath = path.join(__dirname, 'L0CreateOrUpdateUpdatesCorrectComment.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(
      tr.stdOutContained(
        'Updated pull request comment with id: 123 on thread with id: 4321 on PR with id: 10'
      )
    );
  });
  it('should skip when action is update and comment does not exist', function () {
    const taskPath = path.join(__dirname, 'L0UpdateSkipsIfNoCommentExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Comment does not exist, skipping'));
  });
  it('should update comment when action is update and comment exists', function () {
    const taskPath = path.join(__dirname, 'L0UpdatesIfCommentExists.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(
      tr.stdOutContained(
        'Updated pull request comment with id: 123 on thread with id: 4567 on PR with id: 10'
      )
    );
  });
  it('should update thread status if changed', function () {
    const taskPath = path.join(__dirname, 'L0UpdatesThreadStatusIfDifferent.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Updated thread 9898 from status Pending to Closed'));
  });
  it('should not update thread status if same', function () {
    const taskPath = path.join(__dirname, 'L0DoesNotUpdateThreadStatusIfSame.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.stdOutContained('Updated thread 9999 from status Pending to Pending') === false);
  });
});
