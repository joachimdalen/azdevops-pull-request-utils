import { WebApiCreateTagRequestData } from 'azure-devops-node-api/interfaces/CoreInterfaces';
import * as tl from 'azure-pipelines-task-lib/task';

import { getPullRequestId } from '../utils/PullRequestUtils';
import VariableResolver from '../utils/VariableResolver';
import { getWebApi } from '../utils/WebApi';

export class PullRequestManager {
  public async assign(): Promise<void> {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const rawTag = tl.getInput('tag', true);

    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      return;
    }

    if (rawTag === '' || rawTag === 'undefined') {
      tl.warning('Skipping, comment is not set');
      return;
    }

    const replacedTag = VariableResolver.resolveVariables(rawTag);

    const obj: WebApiCreateTagRequestData = {
      name: replacedTag
    };

    const assignedTag = await gitApi.createPullRequestLabel(obj, repositoryId, pullRequestId);

    tl.setResult(tl.TaskResult.Succeeded, `Assigned tag ${assignedTag.name} on PR ${pullRequestId}`);
  }
  public async check(): Promise<void> {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const rawTag = tl.getInput('tag', true);
    const outputVariable = tl.getInput('outputVariable', true);
    const isOutput = tl.getBoolInput('isOutput');

    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      return;
    }

    if (rawTag === '' || rawTag === 'undefined') {
      tl.warning('Skipping, comment is not set');
      return;
    }

    const replacedTag = VariableResolver.resolveVariables(rawTag);

    const result = await gitApi.getPullRequestLabel(repositoryId, pullRequestId, replacedTag);

    const outputResult = result === null ? 'false' : 'true';

    tl.command('task.setvariable', { variable: outputVariable, isOutput: isOutput }, outputResult);
    tl.setResult(tl.TaskResult.Succeeded, 'Fetched tag result');
  }

  public async delete(): Promise<void> {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const rawTag = tl.getInput('tag', true);

    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      tl.setResult(tl.TaskResult.Skipped, 'Pull request id is not set');
      return;
    }

    if (rawTag === '' || rawTag === 'undefined') {
      tl.warning('Skipping, tag is not set');
      tl.setResult(tl.TaskResult.Skipped, 'Tag is not set');
      return;
    }

    const replacedTag = VariableResolver.resolveVariables(rawTag);

    await gitApi.deletePullRequestLabels(repositoryId, pullRequestId, replacedTag);

    tl.setResult(tl.TaskResult.Succeeded, `Deleted tag ${replacedTag} from PR ${pullRequestId}`);
  }
}
