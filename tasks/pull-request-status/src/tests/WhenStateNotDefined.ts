import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

import { getMock } from './utils/apiMock';
import mockery = require('mockery');
import { GitStatusState } from 'azure-devops-node-api/interfaces/GitInterfaces';

const taskPath = path.join(__dirname, '..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const mock = getMock({ id: 12345 }, [
  {
    id: 12345,
    state: GitStatusState.Pending,
    context: {
      genre: 'pull-request-utils',
      name: 'my-custom-status'
    }
  }
]);

tr.setInput('action', 'Update');
tr.setInput('name', 'my-custom-status');
tr.setInput('state', 'success');

tr.registerMock('azure-devops-node-api', mock);

tr.run();

mockery.deregisterMock('azure-devops-node-api');
