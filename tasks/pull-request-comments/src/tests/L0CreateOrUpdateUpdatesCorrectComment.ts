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
    id: 1234,
    comments: [{ id: 432, content: 'This is a pull request' + EOL + '[//]: # (pruc:main)' }]
  },
  {
    id: 4321,
    comments: [{ id: 123, content: 'This is another pull request' + EOL + '[//]: # (pruc:master)' }]
  }
];

const mock = getMock(thread);

tr.setInput('content', 'This is the new content');
tr.setInput('status', '1');
tr.setInput('skipIfCommentExists', 'false');
tr.setInput('action', 'createOrUpdate');
tr.setInput('commentId', 'master');
tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
