import * as tl from 'azure-pipelines-task-lib/task';

import VariableResolver from './VariableResolver';

export function getPullRequestId(
  enableAlternative?: boolean,
  optionKey?: string,
  alternativeRequired = false
): number {
  let pullRequestIdString = undefined;

  if (enableAlternative) {
    pullRequestIdString = tl.getInput(optionKey, alternativeRequired);
    pullRequestIdString = VariableResolver.resolveVariables(pullRequestIdString);
  } else {
    pullRequestIdString = tl.getVariable('System.PullRequest.PullRequestId');
  }

  if (isNaN(Number(pullRequestIdString))) {
    return 0;
  }

  return Number(pullRequestIdString);
}
