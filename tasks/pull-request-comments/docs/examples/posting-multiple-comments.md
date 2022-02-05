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
