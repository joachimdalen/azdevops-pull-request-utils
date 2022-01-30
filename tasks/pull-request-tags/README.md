# PullRequestTags@[x]

---

**Manage labels for a pull request. Gives the ability to manage pull request tags, or check if a tag is assigned.**

---

# ⚙️ Options

- `action`: The action to create. One of:

  - `assign` (default)
  - `delete`
  - `check`

- `tag`: The tag name

- `outputVariable`: The name of the output variable containing the check result. Default `PullRequest.TagCheckResult`. Applied to actions `check`

- `isOutput`: If set, `outputVariable` is set as output and accessible from other jobs

- `useDefined`: Use the pre-defined id for the pull request. If set, overrides the value from `System.PullRequest.PullRequestId`. Default: `false`

- `pullRequestId`: If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`

# ❓ Examples

## Assign tag to pull request

Given the following pipeline configuration

```yaml
steps:
  - task: PullRequestTags@0
    inputs:
      tag: 'my-tag'
```

it will assign the tag `my-tag` to the pull request

---

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
