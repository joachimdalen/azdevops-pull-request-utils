import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import * as path from 'path';

describe('PullRequestTags Suite', function () {
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

  it('should assign tag', function () {
    const taskPath = path.join(__dirname, 'AssignTag.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Assigned tag My tag on PR 10'));
  });

  it('should use pre-defined pull request id for assign if given', function () {
    const taskPath = path.join(__dirname, 'AssignTagAlternativePrId.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Assigned tag My tag on PR 123'));
  });

  it('should assign tag', function () {
    const taskPath = path.join(__dirname, 'DeleteTag.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Deleted tag Custom Tag32 from PR 10'));
  });

  it('should use pre-defined pull request id for delete if given', function () {
    const taskPath = path.join(__dirname, 'DeleteTagAlternativePrId.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Deleted tag Custom Tag32 from PR 123'));
  });
});
