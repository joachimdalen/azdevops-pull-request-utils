import * as VsoBaseInterfaces from 'azure-devops-node-api/interfaces/common/VsoBaseInterfaces';
import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
export function getMock(
  getPr?: Partial<GitInterfaces.GitPullRequest>,
  updatePr?: Partial<GitInterfaces.GitPullRequest>
): any {
  const getPrFunc = getPr || {};
  const updatePrFunc = updatePr || {};

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
            async updatePullRequest(
              gitPullRequestToUpdate: GitInterfaces.GitPullRequest,
              repositoryId: string,
              pullRequestId: number,
              project?: string
            ) {
              return Promise.resolve(updatePrFunc);
            },
            async getPullRequestById(pullRequestId: number, project?: string) {
              return Promise.resolve(getPrFunc);
            }
          });
        }
      };
    }
  };
}
