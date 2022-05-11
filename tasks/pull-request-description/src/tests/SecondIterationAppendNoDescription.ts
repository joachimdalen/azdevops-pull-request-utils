import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');

import { joinString } from '../utils';

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock(
  {
    title: 'My first pr',
    description: joinString([
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)',

      'This is the pr'
    ])
  },
  { title: 'My first pr' }
);

tr.setInput('action', 'append');
tr.setInput('content', 'This is the content from the second run');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
