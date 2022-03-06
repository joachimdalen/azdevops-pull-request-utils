import tl = require('azure-pipelines-task-lib/task');

import { PullRequestManager } from './operations/PullRequestManager';

async function run() {
  try {
    const prm = new PullRequestManager();
    await prm.manageStatus();
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
