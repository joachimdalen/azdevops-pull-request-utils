import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock({ title: 'My first pr' }, { title: 'My first pr' });

tr.setInput('action', 'append');
tr.setInput('content', 'This is the pr');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
