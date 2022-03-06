import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import { EOL } from 'os';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

const thread: GitInterfaces.GitPullRequestCommentThread[] = [
  {
    id: 9898,
    status: GitInterfaces.CommentThreadStatus.Pending,
    comments: [{ id: 98, content: 'This is a pull request' + EOL + '[//]: # (pruc)' }]
  }
];

const mock = getMock(thread);

tr.setInput('content', 'This is a pull request');
tr.setInput('status', GitInterfaces.CommentThreadStatus.Pending.toString());
tr.setInput('action', 'update');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
