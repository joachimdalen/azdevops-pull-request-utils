## Set as variable

Write the content of description to a variable.

```yaml
steps:
  - task: PullRequestDescription@0
    name: setDescriptionVariable
    inputs:
      action: 'view'
      outputVariable: 'PullRequest.DescriptionContent'
      isOutput: true
      stripIdentifiers: false
  - script: echo $(setDescriptionVariable.PullRequest.DescriptionContent)
```

`PullRequestDescription` uses some interal modifiers to know where to append content to. If you wish to remove these before setting the variable, set `stripIdentifiers` to true.

---
