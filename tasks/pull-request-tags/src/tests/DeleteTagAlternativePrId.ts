import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock({ id: '1', name: 'Custom Tag32' }, null, { id: '1', name: 'My tag' });

tr.setInput('action', 'delete');
tr.setInput('tag', 'Custom Tag32');
tr.setInput('useDefined', 'true');
tr.setInput('pullRequestId', '123');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
