### Assign tag to pull request

Given the following pipeline configuration

```yaml
steps:
  - task: PullRequestTags@0
    inputs:
      tag: 'my-tag'
```

it will assign the tag `my-tag` to the pull request

---
