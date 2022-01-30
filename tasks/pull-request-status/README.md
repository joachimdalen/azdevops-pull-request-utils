# PullRequestStatus@[x]

---

**PullRequestStatus allows you to create custom statuses for your pull request. See the [status policy](https://docs.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops#status-policy) docs for more infomation.**

---

# ⚙️ Options

- `action`: The action to perform. One of:

  - `Create` (default)
  - `Update`
  - `Delete`

- `name`: The name of the status. This will be appended to the genre and build the policy as `pull-request-utils/name`

- `description`: Status description. Normally describes the current state of the status.

- `state`: The state of the status. Applies to actions `Create` and `Update`. One of:

  - `notSet` (default)
  - `error`
  - `failed`
  - `notApplicable`
  - `pending`
  - `succeeded`

- `useDefined`: Use the pre-defined id for the pull request. If set, overrides the value from `System.PullRequest.PullRequestId`. Default: `false`

- `pullRequestId`: If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`

# ❓ Examples

```yaml
steps:
  - task: PullRequestStatus@0
    displayName: 'Initialize status'
    inputs:
      name: 'my-custom-check'
      action: 'Create'
      state: 'pending'
      description: 'Awaiting my custom check'

  ... some other tasks

  - task: PullRequestStatus@0
    displayName: 'Update status'
    inputs:
      name: 'my-custom-check'
      action: 'Update'
      state: 'succeeded'
      description: 'Check passed'
```

# 🐞 Known issues

If using classic pipelines and you get the error:

> TF400813: The user '' is not authorized to access this resource.

Ensure `Allow scripts to access the OAuth token` is checked under options. See the [docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops#allow-scripts-to-access-the-oauth-token) for more info.
