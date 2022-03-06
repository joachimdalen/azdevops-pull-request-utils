import * as VsoBaseInterfaces from 'azure-devops-node-api/interfaces/common/VsoBaseInterfaces';
import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
export function getMock(
  createStatus?: Partial<GitInterfaces.GitPullRequestStatus>,
  getStatuses?: Partial<GitInterfaces.GitPullRequestStatus[]>,
  deleteStatus?: void
): any {
  const createStatusFunc = createStatus || [];
  const deleteStatusFunc = deleteStatus === undefined ? [] : deleteStatus;
  const getFunc = getStatuses || {
    id: 1
  };

  return {
    getBearerHandler: function () {
      return {};
    },
    WebApi: function (url, handler) {
      return {
        getGitApi: async function (
          serverUrl?: string,
          handlers?: VsoBaseInterfaces.IRequestHandler[]
        ) {
          return Promise.resolve({
            async createPullRequestStatus(
              status: GitInterfaces.GitPullRequestStatus,
              repositoryId: string,
              pullRequestId: number,
              project?: string
            ) {
              return Promise.resolve(createStatusFunc);
            },
            async deletePullRequestStatus(
              repositoryId: string,
              pullRequestId: number,
              statusId: number,
              project?: string
            ) {
              return Promise.resolve(deleteStatusFunc);
            },
            async getPullRequestStatuses(
              repositoryId: string,
              pullRequestId: number,
              project?: string
            ) {
              return Promise.resolve(getFunc);
            }
          });
        }
      };
    }
  };
}
