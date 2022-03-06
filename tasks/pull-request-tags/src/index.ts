import tl = require('azure-pipelines-task-lib/task');

import { PullRequestManager } from './operations/PullRequestManager';

async function run() {
  try {
    const prm = new PullRequestManager();
    const action = tl.getInput('action', true);
    switch (action) {
      case 'assign':
        await prm.assign();
        break;
      case 'check':
        await prm.check();
        break;
      case 'delete':
        await prm.delete();
        break;
    }
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
