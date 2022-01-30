import * as VsoBaseInterfaces from 'azure-devops-node-api/interfaces/common/VsoBaseInterfaces';
import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
export function getMock(
  getThreads?: Partial<GitInterfaces.GitPullRequestCommentThread[]>,
  createThread?: Partial<GitInterfaces.GitPullRequestCommentThread>,
  updateComment?: Partial<GitInterfaces.Comment>
): any {
  const getThreadsFunc = getThreads || [];
  const updateCommentFunc = updateComment || {
    id: 1
  };
  const createThreadFunc = createThread || {
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
            async getThreads(
              repositoryId: string,
              pullRequestId: number,
              project?: string,
              iteration?: number,
              baseIteration?: number
            ) {
              return Promise.resolve(getThreadsFunc);
            },
            async createThread(
              commentThread: GitInterfaces.GitPullRequestCommentThread,
              repositoryId: string,
              pullRequestId: number,
              project?: string
            ) {
              return Promise.resolve({ ...createThreadFunc, id: pullRequestId });
            },
            async updateComment(
              comment: GitInterfaces.Comment,
              repositoryId: string,
              pullRequestId: number,
              threadId: number,
              commentId: number,
              project?: string
            ) {
              return Promise.resolve({ ...comment, id: commentId });
            },
            async updateThread(
              commentThread: GitInterfaces.GitPullRequestCommentThread,
              repositoryId: string,
              pullRequestId: number,
              threadId: number,
              project?: string
            ) {
              return Promise.resolve();
            }
          });
        }
      };
    }
  };
}
