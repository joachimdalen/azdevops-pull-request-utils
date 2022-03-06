import * as VsoBaseInterfaces from 'azure-devops-node-api/interfaces/common/VsoBaseInterfaces';
import * as TfsCoreInterfaces from 'azure-devops-node-api/interfaces/CoreInterfaces';
export function getMock(
  getLabels?: Partial<TfsCoreInterfaces.WebApiTagDefinition>,
  deleteLabels?: void,
  createLabel?: Partial<TfsCoreInterfaces.WebApiTagDefinition>
): any {
  const getLabelFunc = getLabels || {};
  const createLabelFunc = createLabel || {};

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
            async createPullRequestLabel(
              label: TfsCoreInterfaces.WebApiCreateTagRequestData,
              repositoryId: string,
              pullRequestId: number,
              project?: string,
              projectId?: string
            ) {
              return Promise.resolve(createLabelFunc);
            },
            async deletePullRequestLabels(
              repositoryId: string,
              pullRequestId: number,
              labelIdOrName: string,
              project?: string,
              projectId?: string
            ) {
              return Promise.resolve();
            },
            async getPullRequestLabel(
              repositoryId: string,
              pullRequestId: number,
              labelIdOrName: string,
              project?: string,
              projectId?: string
            ) {
              return Promise.resolve(getLabelFunc);
            }
          });
        }
      };
    }
  };
}
