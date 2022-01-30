import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');
import { EOL } from 'os';

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock(
  {
    title: 'My first pr',
    description:
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)' +
      EOL +
      'This is the pr'
  },
  { title: 'My first pr' }
);

tr.setInput('action', 'view');
tr.setInput('content', 'd');
tr.setInput('outputVariable', 'PullRequest.DescriptionContent');
tr.setInput('stripIdentifiers', 'true');
tr.setInput('isOutput', 'true');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
