# Pull Request Status

---

**PullRequestStatus allows you to create custom statuses for your pull request. See the [status policy](https://docs.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops#status-policy) docs for more infomation.**

---

## Options

### Example

```yaml
- task: PullRequestStatus@0
  inputs:
    action: Create
    name: my-custom-gate #Name of the status. Full status will be pull-request-utils/<name>
    description: #Status description. Normally describes the current state of the status.
    state: notSet
    useDefined: false #If set, overrides the value from `System.PullRequest.PullRequestId`
    pullRequestId: $(System.PullRequest.PullRequestId) #If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`

```

### All Options

| Option          | Default Value                         | Required | Help                                                                                                                                                                 | Options                                                              |
| :-------------- | :------------------------------------ | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `action`        | `Create`                              |    ✅    | --                                                                                                                                                                   | `Create`, `Update`, `Delete`                                         |
| `name`          | `my-custom-gate`                      |    ✅    | Name of the status. Full status will be pull-request-utils/<name>                                                                                                    | --                                                                   |
| `description`   | --                                    |    ❌    | Status description. Normally describes the current state of the status.                                                                                              | --                                                                   |
| `state`         | `notSet`                              |    ✅    | --                                                                                                                                                                   | `notSet`, `error`, `failed`, `notApplicable`, `pending`, `succeeded` |
| `useDefined`    | `false`                               |    ❌    | If set, overrides the value from `System.PullRequest.PullRequestId`                                                                                                  | --                                                                   |
| `pullRequestId` | `$(System.PullRequest.PullRequestId)` |    ❌    | If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId` | --                                                                   |


## Examples

```yml
steps:
  - task: PullRequestStatus@0
    displayName: 'Initialize status'
    inputs:
      name: 'my-custom-check'
      action: 'Create'
      state: 'pending'
      description: 'Awaiting my custom check'
  - script: 'echo Do something'
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
