# PullRequestDescription@[x]

---

**Update pull request descriptions during pipeline runs.**

---

# ⚙️ Options

- `action`: The action to perform. One of:

  - `append` (default)
  - `replace`
  - `view` (Write description to variable)

- `content`: The content to append or replace original description with. Required when action is `append` or `replace`. For Markdown syntax, see [Syntax guidance for basic Markdown usage](http://go.microsoft.com/fwlink/?LinkId=823918) **Supports usage of variables.**

- `useDefined`: Use the pre-defined id for the pull request. If set, overrides the value from `System.PullRequest.PullRequestId`. Default: `false`

- `pullRequestId`: If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`

- `outputVariable`: The name of the output variable to write the description to. Default `PullRequest.DescriptionContent`. Applies to actions `view`

- `isOutput`: If set, `outputVariable` is set as output and accessible from other jobs. Applies to actions `view`

- `stripIdentifiers`: Strip internal modifiers before setting variable. Applies to actions `view`

# ❓ Examples

## Append content

Append will append content to the end of the PR on the first run. On sequential runs the content will be replaced. A markdown comment will be added to the pull request so the task knows where to replace content from.

```yaml
steps:
  - task: PullRequestDescription@0
    inputs:
      action: 'append'
      content: 'This content will be appended to the bottom of the PR description'
```

---

## Replace content

The following configuration will replace the entire pull request description on each run.

```yaml
steps:
  - task: PullRequestDescription@0
    inputs:
      action: 'replace'
      content: 'This content will be the only part of the PR description'
```

---

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

## Other

Setting the environment variable `PRU_DESC_LOG=true` will write the old description to the log. This is mostly used during development and testing, but might be nice to know.
