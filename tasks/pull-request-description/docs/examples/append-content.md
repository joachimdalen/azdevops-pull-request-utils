### Append content

Append will append content to the end of the PR on the first run. On sequential runs the content will be replaced. A markdown comment will be added to the pull request so the task knows where to replace content from.

```yaml
steps:
  - task: PullRequestDescription@0
    inputs:
      action: 'append'
      content: 'This content will be appended to the bottom of the PR description'
```

---
