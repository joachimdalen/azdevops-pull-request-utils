import { IGitApi } from 'azure-devops-node-api/GitApi';
import {
  GitPullRequestStatus,
  GitStatusState
} from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tl from 'azure-pipelines-task-lib/task';
import { getPullRequestId, getWebApi } from 'pull-request-core';
export class PullRequestManager {
  public async manageStatus(): Promise<void> {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const action = tl.getInput('action', true);

    console.log('Started');
    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      tl.setResult(tl.TaskResult.Skipped, 'Pull request id is not set');
      return;
    }

    switch (action) {
      case 'Create':
      case 'Update':
        console.log('Triggering');
        await this.createStatus(gitApi, repositoryId, pullRequestId, action === 'Update');
        break;
      case 'Delete':
        await this.deleteStatus(gitApi, repositoryId, pullRequestId);
        break;
    }
  }

  private mapState(state: string): GitStatusState {
    let status: GitStatusState = GitStatusState.NotSet;

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

    return status;
  }

  private createPayload(): GitPullRequestStatus {
    const state = tl.getInput('state', true);
    const name = tl.getInput('name', true);
    const description = tl.getInput('description');
    const status = this.mapState(state);
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

  private async createStatus(
    gitApi: IGitApi,
    repositoryId: string,
    pullRequestId: number,
    isUpdate: boolean
  ) {
    try {
      const action = tl.getInput('action');
      if (isUpdate) {
        const whenState = tl.getDelimitedInput('whenState', ',')?.map(x => x.trim());
        if (whenState !== undefined && whenState.length > 0) {
          const existingStatuses = await gitApi.getPullRequestStatuses(repositoryId, pullRequestId);
          const name = tl.getInput('name', true);
          const currentStatus = existingStatuses?.find(
            x => x.context?.genre === 'pull-request-utils' && x.context?.name === name
          );
          if (currentStatus !== undefined) {
            const mappedStaus = whenState.map(this.mapState);
            if (!mappedStaus.includes(currentStatus.state)) {
              tl.setResult(
                tl.TaskResult.Succeeded,
                `Skipping updating state. ${
                  GitStatusState[currentStatus.state]
                } is not in any of the updatable states ${mappedStaus
                  .map(x => GitStatusState[x])
                  .join(',')}`
              );
              return;
            }
          }
        }
      }

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
    const name = tl.getInput('name', true);
    const existingStatuses = await gitApi.getPullRequestStatuses(repositoryId, pullRequestId);

    const thisStatus = existingStatuses?.filter(
      x => x.context.genre === 'pull-request-utils' && x.context.name === name
    );

    if (thisStatus?.length === 0) {
      throw new Error('Failed to find pull request status');
    }

    await gitApi.deletePullRequestStatus(repositoryId, pullRequestId, thisStatus[0].id);
  }
}
