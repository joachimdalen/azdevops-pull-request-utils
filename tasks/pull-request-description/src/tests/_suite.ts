import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import { EOL } from 'os';
import * as path from 'path';

import { joinTestString } from './utils/utils';
describe('PullRequestDescription Suite', function () {
  this.retries(2);

  before(function () {
    process.env['SYSTEM_TEAMFOUNDATIONCOLLECTIONURI'] = 'http:localhost/someproject';
    process.env['BUILD_REPOSITORY_ID'] = 'a5253ab2-00bf-4ce9-824a-d3449b1f49e1';
    process.env['SYSTEM_ACCESSTOKEN'] = '123';
    process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'] = '10';
    process.env['SYSTEM_TEAMPROJECTID'] = 'a5253ab2-00bf-4ce9-824a-d3449b1f49e1';
  });

  after(() => {
    delete process.env['SYSTEM_PULLREQUEST_PULLREQUESTID'];
    delete process.env['SYSTEM_TEAMFOUNDATIONCOLLECTIONURI'];
    delete process.env['BUILD_REPOSITORY_ID'];
    delete process.env['SYSTEM_ACCESSTOKEN'];
  });

  it('should throw on unknown action', function () {
    const taskPath = path.join(__dirname, 'UnknownActionThrows.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();
    assert(tr.failed);
    assert(tr.createdErrorIssue('nope is not a know action. Must be replace, append or view'));
  });
  it('should replace all content on first run when no description is set', function () {
    const taskPath = path.join(__dirname, 'FirstIterationReplaceNoDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();
    assert(tr.stdOutContained('This is the pr'));
  });
  it('should replace all content on first run if description is set', function () {
    const taskPath = path.join(__dirname, 'FirstIterationReplaceDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Replace with this content'));
    assert(tr.stdOutContained('This is my pr description') === false);
  });

  it('should use pre-defined pull request id if given', function () {
    const taskPath = path.join(__dirname, 'FirstIterationAlternativePrId.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained('Description for pull request My first pr (123) was updated'));
    assert(tr.stdOutContained('Replace with this content'));
    assert(tr.stdOutContained('This is my pr description') === false);
  });

  it('should append content on first run when no description is set', function () {
    const taskPath = path.join(__dirname, 'FirstIterationAppendNoDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    const expected = joinTestString([
      EOL +
        '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',
      'This is the pr'
    ]);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(expected));
  });
  it('should append content on first run when description is set', function () {
    const taskPath = path.join(__dirname, 'FirstIterationAppendDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    const expected = joinTestString([
      'This is my long pr description' + EOL + 'It has some good content',
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',
      'This is the pr'
    ]);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(expected));
  });

  it('should replace appended content on second run when no original description is set', function () {
    const taskPath = path.join(__dirname, 'SecondIterationAppendNoDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    const expected = joinTestString([
      EOL +
        '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',
      'This is the content from the second run'
    ]);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(expected));
    assert(tr.stdOutContained('This is the pr') === false);
  });
  it('should replace appended content on second run when no original description is set', function () {
    const taskPath = path.join(__dirname, 'SecondIterationAppendNoDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    const expected = joinTestString([
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',
      'This is the content from the second run'
    ]);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(expected));
    assert(tr.stdOutContained('This is the pr') === false);
  });
  it('should replace only appended content on second run when original description is set', function () {
    const taskPath = path.join(__dirname, 'SecondIterationAppendDescription.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    const expected = joinTestString([
      '# Hello' + EOL + 'This is my long PR description',
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',
      'This is the content from the second run'
    ]);
    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(expected));
    assert(tr.stdOutContained('This is the pr') === false);
  });

  it('should append to appended content on second run when original description is set and option is defined', function () {
    const taskPath = path.join(__dirname, 'MultipleIterationsOfAppendKeepsOld.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    const expected = joinTestString([
      '# Hello' + EOL + 'This is my long PR description',
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',
      'This is the pr' + EOL + 'This is the content from the second run'
    ]);

    tr.run();

    assert(tr.succeeded);
    assert(tr.stdOutContained(expected));
    assert(tr.stdOutContained('This is the pr'));
    assert(tr.stdOutContained('This is the content from the second run'));
  });

  it('should write description to variable', function () {
    const taskPath = path.join(__dirname, 'ViewSetsVariable.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(tr.stdOutContained('##vso[task.setvariable variable=PullRequest.DescriptionContent;]'));
    assert(tr.succeeded);
  });

  it('should write description to output variable', function () {
    const taskPath = path.join(__dirname, 'ViewSetsOutputVariable.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();

    assert(
      tr.stdOutContained(
        '##vso[task.setvariable variable=PullRequest.DescriptionContent;isOutput=true;]'
      )
    );
    assert(tr.succeeded);
  });

  it('should replace modifiers', function () {
    const taskPath = path.join(__dirname, 'ViewSetsVariableAndReplacesModifiers.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);

    tr.run();
    assert(!tr.stdOutContained('[//]: # (pull-request-description-updater -'));
    assert(
      tr.stdOutContained(
        '##vso[task.setvariable variable=PullRequest.DescriptionContent;isOutput=true;]'
      )
    );
    assert(tr.succeeded);
  });
});
