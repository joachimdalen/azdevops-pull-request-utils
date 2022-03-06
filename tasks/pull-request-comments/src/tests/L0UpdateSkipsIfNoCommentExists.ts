import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

const thread: GitInterfaces.GitPullRequestCommentThread[] = [];

const mock = getMock(thread);

tr.setInput('content', 'This is the new content');
tr.setInput('status', '1');
tr.setInput('action', 'update');
tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
