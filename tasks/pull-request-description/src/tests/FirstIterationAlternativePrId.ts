import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock(
  { title: 'My first pr', description: 'This is my pr description' },
  { title: 'My first pr' }
);

tr.setInput('action', 'replace');
tr.setInput('content', 'Replace with this content');
tr.setInput('useDefined', 'true');
tr.setInput('pullRequestId', '123');
tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
