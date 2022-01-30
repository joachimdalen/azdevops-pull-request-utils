import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');
import { EOL } from 'os';

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

const thread: GitInterfaces.GitPullRequestCommentThread[] = [
  {
    id: 1222,
    comments: [{ content: 'This is a pull request' + EOL + '[//]: # (pruc:current_main)' }]
  }
];

const mock = getMock(thread);

tr.setInput('content', 'This is a pull request');
tr.setInput('status', '1');
tr.setInput('skipIfCommentExists', 'false');
tr.setInput('action', 'createOrUpdate');
tr.setInput('commentId', 'current_master');
tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
