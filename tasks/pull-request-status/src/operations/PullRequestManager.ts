import { IGitApi } from 'azure-devops-node-api/GitApi';
import {
  GitPullRequestStatus,
  GitStatusState
} from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tl from 'azure-pipelines-task-lib/task';

import { getPullRequestId } from '../utils/PullRequestUtils';
import { getWebApi } from '../utils/WebApi';

export class PullRequestManager {
  public async manageStatus(): Promise<void> {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const action = tl.getInput('action', true);

    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      tl.setResult(tl.TaskResult.Skipped, 'Pull request id is not set');
      return;
    }

    switch (action) {
      case 'Create':
      case 'Update':
        await this.createStatus(gitApi, repositoryId, pullRequestId);
        break;
      case 'Delete':
        await this.deleteStatus(gitApi, repositoryId, pullRequestId);
        break;
    }
  }

  private createPayload(): GitPullRequestStatus {
    let status: GitStatusState = GitStatusState.NotSet;
    const state = tl.getInput('state', true);
    const name = tl.getInput('name', true);
    const description = tl.getInput('description');

    switch (state) {
      case 'notSet':
        status = GitStatusState.NotSet;
        break;
      case 'error':
        status = GitStatusState.Error;
        break;
      case 'failed':
        status = GitStatusState.Failed;
        break;
      case 'notApplicable':
        status = GitStatusState.NotApplicable;
        break;
      case 'pending':
        status = GitStatusState.Pending;
        break;
      case 'succeeded':
        status = GitStatusState.Succeeded;
        break;
    }

    const payload: GitPullRequestStatus = {
      state: status,
      context: {
        name: name,
        genre: 'pull-request-utils'
      },
      description: description
    };

    return payload;
  }

  private async createStatus(gitApi: IGitApi, repositoryId: string, pullRequestId: number) {
    try {
      const action = tl.getInput('action');
      const createdStatus = await gitApi.createPullRequestStatus(
        this.createPayload(),
        repositoryId,
        pullRequestId
      );

      tl.debug(
        `${action}d status with id ${createdStatus.id} on pull request with id ${pullRequestId}`
      );
    } catch (error) {
      tl.error(error);
      throw new Error(`Failed to create pull request status`);
    }
  }
  private async deleteStatus(gitApi: IGitApi, repositoryId: string, pullRequestId: number) {
    const existingStatuses = await gitApi.getPullRequestStatuses(repositoryId, pullRequestId);

    const thisStatus = existingStatuses?.filter(
      x => x.context.genre === '' && x.context.name === ''
    );

    if (thisStatus?.length === 0) {
      throw new Error('Failed to find pull request status');
    }

    await gitApi.deletePullRequestStatus(repositoryId, pullRequestId, thisStatus[0].id);
  }
}
