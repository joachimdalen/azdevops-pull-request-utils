## Remove tag from pull request

Given the following pipeline configuration

```yaml
steps:
  - task: PullRequestTags@0
    inputs:
      action: 'delete'
      tag: 'my-tag'
```

it will remove the tag `my-tag` from the pull request

---
