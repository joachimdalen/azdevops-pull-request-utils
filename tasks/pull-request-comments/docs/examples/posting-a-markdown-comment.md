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
