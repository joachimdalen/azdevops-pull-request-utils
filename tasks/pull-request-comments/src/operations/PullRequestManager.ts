import {
  Comment,
  CommentThreadStatus,
  CommentType,
  GitPullRequestCommentThread
} from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as tl from 'azure-pipelines-task-lib/task';
import { EOL } from 'os';
import { getPullRequestId, getWebApi, VariableResolver } from 'pull-request-core';

export interface ExistingComment {
  thread: GitPullRequestCommentThread;
  comment: Comment;
}

export class PullRequestManager {
  public async postComment(): Promise<void> {
    const gitApi = await getWebApi().getGitApi();
    const repositoryId = tl.getVariable('Build.Repository.ID');
    const useDefinedPrId = tl.getBoolInput('useDefined');
    const pullRequestId = getPullRequestId(useDefinedPrId, 'pullRequestId', useDefinedPrId);
    const rawComment = tl.getInput('content', true);
    const skipIfCommentExists = tl.getBoolInput('skipIfCommentExists');
    let action = tl.getInput('action')?.toLowerCase();

    if (pullRequestId === 0) {
      tl.warning('Pull request id is not set');
      tl.setResult(tl.TaskResult.Skipped, 'Pull request id is not set');
      return;
    }

    if (rawComment === '' || rawComment === undefined || rawComment === 'undefined') {
      throw new Error('Comment content is not set');
    }

    if (action === undefined) action = 'create';

    if (['create', 'createorupdate', 'update'].includes(action) === false) {
      throw new Error(`${action} is not a valid action`);
    }

    const replacedComment = VariableResolver.resolveVariables(rawComment);
    const currentThreads = await gitApi.getThreads(repositoryId, pullRequestId);
    const exists = this.commentExists(currentThreads);
    const commentWithIdentifier = this.appendIdentifier(replacedComment);
    if (action === 'create') {
      if (exists !== undefined && skipIfCommentExists) {
        tl.debug('Comment exists, skipping');
        return;
      }

      await this.createCommentThread(commentWithIdentifier, repositoryId, pullRequestId);
    } else if (action === 'createorupdate') {
      if (exists !== undefined) {
        await this.updateCommentThread(exists, commentWithIdentifier, repositoryId, pullRequestId);
        return;
      }
      await this.createCommentThread(commentWithIdentifier, repositoryId, pullRequestId);
    } else if (action === 'update') {
      if (exists === undefined) {
        tl.debug('Comment does not exist, skipping');
        return;
      }
      await this.updateCommentThread(exists, commentWithIdentifier, repositoryId, pullRequestId);
    } else {
      throw new Error(`${action} is not a valid action`);
    }
  }

  private appendIdentifier(replacedComment: string) {
    const commentId = this.getCommentId();
    return replacedComment + EOL + EOL + `[//]: # (${commentId})`;
  }

  private async updateCommentThread(
    existing: ExistingComment,
    commentWithIdentifier: string,
    repositoryId: string,
    pullRequestId: number
  ) {
    const gitApi = await getWebApi().getGitApi();
    const comment = this.createCommentPayload(commentWithIdentifier);
    const updatedComment = await gitApi.updateComment(
      comment,
      repositoryId,
      pullRequestId,
      existing.thread.id,
      existing.comment.id
    );

    const status = this.getThreadStatus();
    const existingStatus = this.parseStatus(existing?.thread.status?.toString());
    tl.debug(status.toString());
    tl.debug(existingStatus.toString());
    if (status !== existingStatus) {
      await gitApi.updateThread(
        {
          status: status
        },
        repositoryId,
        pullRequestId,
        existing.thread.id
      );
      tl.debug(`Updated thread ${existing?.thread?.id} from status ${existingStatus} to ${status}`);
    }
    tl.setResult(
      tl.TaskResult.Succeeded,
      `Updated pull request comment with id: ${updatedComment?.id} on thread with id: ${existing?.thread?.id} on PR with id: ${pullRequestId}`
    );
  }

  private async createCommentThread(
    commentWithIdentifier: string,
    repositoryId: string,
    pullRequestId: number
  ) {
    const gitApi = await getWebApi().getGitApi();
    const thread = this.createPayload(commentWithIdentifier);
    const createdThread = await gitApi.createThread(thread, repositoryId, pullRequestId);

    tl.setResult(
      tl.TaskResult.Succeeded,
      `Posted pull request thread with id: ${createdThread?.id} on PR with id: ${pullRequestId}`
    );
  }

  private createCommentPayload(comment: string): Comment {
    const commentType = this.getCommentType();
    const commentObject: Comment = {
      content: comment,
      commentType: commentType
    };
    return commentObject;
  }
  private createPayload(comment: string): GitPullRequestCommentThread {
    const status = this.getThreadStatus();
    const commentObject: Comment = this.createCommentPayload(comment);
    const thread: GitPullRequestCommentThread = {
      comments: [commentObject],
      status: status
    };

    return thread;
  }

  private getCommentType(): CommentType {
    const commentType = tl.getInput('type');
    let parsedType = CommentType[commentType];
    if (parsedType === undefined) {
      parsedType = CommentType.Text;
    }
    return parsedType;
  }

  private getThreadStatus(): CommentThreadStatus {
    const status = tl.getInput('status');
    return this.parseStatus(status);
  }

  private parseStatus(status: string): CommentThreadStatus {
    let parsedStatus = CommentThreadStatus[status];
    if (parsedStatus === undefined) {
      parsedStatus = CommentThreadStatus.Active;
    }
    return parsedStatus;
  }

  private getCommentId(): string {
    let commentId = tl.getInput('commentId');
    if (commentId === undefined || commentId === '') {
      commentId = 'pruc';
    } else {
      commentId = `pruc:${commentId}`;
    }
    return commentId;
  }

  private containsIdentifier(comment: string): boolean {
    const commentId = this.getCommentId();
    const matchRegex = new RegExp(`^\\[\\/\\/\\]: # \\(${commentId}\\)$`, 'm');

    return matchRegex.test(comment);
  }

  private commentExists(currentThreads: GitPullRequestCommentThread[]): ExistingComment {
    for (const currentThread of currentThreads) {
      if (currentThread.comments !== null && currentThread.comments !== undefined) {
        for (const threadComment of currentThread.comments) {
          if (this.containsIdentifier(threadComment.content)) {
            return {
              thread: currentThread,
              comment: threadComment
            };
          }
        }
      }
    }
    return undefined;
  }
}
