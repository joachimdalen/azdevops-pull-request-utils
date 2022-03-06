import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock();

tr.setInput('content', 'This is the pr');

tr.setInput('status', '1');
tr.setInput('skipIfCommentExists', 'false');
tr.setInput('useDefined', 'true');
tr.setInput('pullRequestId', '123');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
