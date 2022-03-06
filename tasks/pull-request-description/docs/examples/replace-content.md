### Replace content

The following configuration will replace the entire pull request description on each run.

```yaml
steps:
  - task: PullRequestDescription@0
    inputs:
      action: 'replace'
      content: 'This content will be the only part of the PR description'
```

---
