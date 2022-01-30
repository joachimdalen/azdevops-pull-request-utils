# PullRequestComments@[x]

---

**PullRequestComments allows you post comments on a give pull request.**

---

# ⚙️ Options

- `skipIfCommentExists`: If the comment exists on the pull request, do not post it again. Only valid for `action: create`

- `action`: The action to perform

  - `create` - Will only create the comment. If it already exists, posting is only skipped if `skipIfCommentExists:true`.
  - `createOrUpdate` - Will create the comment if it does not exist, and update it if it does.
  - `update`: - Will only update the comment if it exists, if it does not, it is skipped.

- `commentId`: Set this to a static value that identifies the task. You only need to set this if you use multiple `PullRequestComments` tasks in the same pipeline. Failing to set this in these cases can lead to the task updating the wrong comment.

- `status`: Status for the comment

  - `Active` : The thread status is active
  - `Fixed`: The thread status is resolved as fixed.
  - `WontFix`: The thread status is resolved as won't fix.
  - `Closed`: The thread status is closed.
  - `Pending`: The thread status is pending.

- `content`: The content of the comment. For Markdown syntax, see [Syntax guidance for basic Markdown usage](http://go.microsoft.com/fwlink/?LinkId=823918). **Supports usage of variables.**

- `type`: The type of comment. `Text` represents a regular user comment while `System` indicates a system message. Accepts:

  - `Text`
  - `System`

- `useDefined`: Use the pre-defined id for the pull request. If set, overrides the value from `System.PullRequest.PullRequestId`. Default: `false`

- `pullRequestId`: If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`

# ❓ Examples

## Posting a comment

Given the following pipeline configuration

```yaml
steps:
  - task: PullRequestComments@0
    displayName: 'Post a pull request comment'
    inputs:
      content: 'This is a comment posted from pipeline $(Build.Repository.Name)'
      status: 'Pending'
      action: 'create'
```

after a run against a pull request it will post the comment:

![simple-comment](../../docs/images/simple-pr-comment.png)

## Posting a comment with markdown

Given the following pipeline configuration

```yaml
steps:
  - task: PullRequestComments@0
    inputs:
      status: 'Closed'
      action: 'create'
      content: |
        #Title

        This is a pull request from `$(Build.DefinitionName)`

        | Id  | Name    |
        | --- | ------- |
        | 1   | Content |
```

after a run against a pull request it will post the comment:

![simple-comment](../../docs/images/markdown-pr-comment.png)

## Posting multiple comments

When posting multiple comments, ensure `commentId` is set to a unique value for each task.

```yaml
steps:
  - task: PullRequestComments@0
    displayName: 'Post regular comment'
    inputs:
      action: 'createOrUpdate'
      status: 'Closed'
      commentId: 'regular_comment'
      content: |
        #Title

        This is a pull request from `$(Build.DefinitionName)`

        | Id  | Name    |
        | --- | ------- |
        | 1   | Content |
  - task: PullRequestComments@0
    displayName: 'Post markdown comment'
    inputs:
      action: 'createOrUpdate'
      status: 'Pending'
      commentId: 'markdown_comment'
      content: 'This is a comment posted from pipeline $(Build.Repository.Name)'
```
