import { GitPullRequest } from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tl from 'azure-pipelines-task-lib/task';
import { EOL } from 'os';

import { getPullRequestId } from '../utils/PullRequestUtils';
import VariableResolver from '../utils/VariableResolver';
import { getWebApi } from '../utils/WebApi';

export class PullRequestManager {
  public async process(): Promise<void> {
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const action = tl.getInput('action', true)?.toLowerCase();

    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      return;
    }

    if (action === 'replace' || action === 'append') {
      const rawContent = tl.getInput('content', true);
      if (rawContent === '' || rawContent === 'undefined') {
        tl.warning('Skipping, content is not set');
        return;
      }

      await this.manageDescription(pullRequestId, rawContent);
      return;
    } else if (action === 'view') {
      await this.viewPullRequest(pullRequestId);
      return;
    }
    tl.setResult(
      tl.TaskResult.Failed,
      `${action} is not a know action. Must be replace, append or view`
    );
  }

  private async viewPullRequest(pullRequestId: number) {
    const pullRequest = await this.getPrDescription(pullRequestId);
    const outputVariable = tl.getInput('outputVariable', true);
    const isOutput = tl.getBoolInput('isOutput');
    const stripIdentifiers = tl.getBoolInput('stripIdentifiers');
    const matchRegex = /^\[\/\/\]: # \(pull-request-description-updater - Anything below this line will be deleted on next pipeline run\. Do not change this line\. Keep an empty line above and below\)$/m;

    let content = pullRequest?.description;

    if (stripIdentifiers) {
      content = content.replace(matchRegex, '');
    }

    tl.command('task.setvariable', { variable: outputVariable, isOutput: isOutput }, content);
    tl.setResult(tl.TaskResult.Succeeded, 'Wrote pull request description to variable');
  }

  private async manageDescription(pullRequestId: number, rawContent: string) {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const replacedContent = VariableResolver.resolveVariables(rawContent);
    const newDescription = await this.getNewDescription(pullRequestId, replacedContent);

    if (process.env['PRU_DESC_LOG'] === 'true') {
      console.log(newDescription);
    }

    const obj: GitPullRequest = {
      description: newDescription
    };

    const result = await gitApi.updatePullRequest(obj, repositoryId, pullRequestId);

    tl.setResult(
      tl.TaskResult.Succeeded,
      `Description for pull request ${result?.title} (${pullRequestId}) was updated`
    );
  }

  private async getPrDescription(pullRequestId: number): Promise<GitPullRequest> {
    const gitApi = await getWebApi().getGitApi();
    const projectId = tl.getVariable('System.TeamProjectId');
    const currentPr = await gitApi.getPullRequestById(pullRequestId, projectId);
    return currentPr;
  }

  private async getNewDescription(pullRequestId: number, content: string): Promise<string> {
    const action = tl.getInput('action', true)?.toLowerCase();
    if (action === 'replace') return content;
    if (action !== 'append')
      throw new Error(`${action} is not a know action. Must be replace or append`);

    const currentPr = await this.getPrDescription(pullRequestId);
    const oldDescription = currentPr.description;

    const matchRegex = /^\[\/\/\]: # \(pull-request-description-updater - Anything below this line will be deleted on next pipeline run\. Do not change this line\. Keep an empty line above and below\)$/m;
    const commentSplit =
      '[//]: # (pull-request-description-updater - Anything below this line will be deleted on next pipeline run. Do not change this line. Keep an empty line above and below)';

    if (oldDescription === undefined) return EOL + commentSplit + EOL + EOL + content;

    const matchResult = matchRegex.exec(oldDescription);

    if (matchResult === null) {
      return oldDescription + EOL + EOL + commentSplit + EOL + EOL + content;
    }

    const originalDescription = oldDescription.substr(0, matchResult.index);
    return originalDescription + EOL + EOL + commentSplit + EOL + EOL + content;
  }
}
