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

{{ #include-image[imagePath=simple-pr-comment.png] }}
