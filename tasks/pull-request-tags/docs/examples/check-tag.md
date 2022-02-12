## Check if tag is assigned to pull request

Given the following pipeline configuration

```yaml
steps:
  - task: PullRequestTags@0
    name: 'check_tag'
    inputs:
      action: 'check'
      tag: 'my-tag'
      outputVariable: 'PullRequest.TagCheckResult'
      isOutput: true
```

it will check if the tag `my-tag` is assiged to the active pull request and output the result (`true` / `false`) to the variable `PullRequest.TagCheckResult`
