# Pull Request Status

---

**PullRequestStatus allows you to create custom statuses for your pull request. See the [status policy](https://docs.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops#status-policy) docs for more infomation.**

---

## YAML Snippet

```yaml
- task: PullRequestStatus@0
  inputs:
    action: Create
    name: my-custom-gate #Name of the status. Full status will be `pull-request-utils/<name>`
    description: #Status description. Normally describes the current state of the status.
    state: notSet
    useDefined: false #If set, overrides the value from `System.PullRequest.PullRequestId`
    pullRequestId: $(System.PullRequest.PullRequestId) #If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`
    whenState: #Only update the state of the status when the existing state is one of these

```

## Arguments

| Argument                                          | Description                                                                                                                                                                                                                                     |
| :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action` <br />Action                             | **(Required)** <br /> Options: `Create`, `Update`, `Delete` <br /> Default value: `Create`                                                                                                                                                      |
| `name` <br />Name                                 | **(Required)** Name of the status. Full status will be `pull-request-utils/<name>` <br /> Default value: `my-custom-gate`                                                                                                                       |
| `description` <br />Description                   | **(Optional)** Status description. Normally describes the current state of the status. <br />                                                                                                                                                   |
| `state` <br />State                               | **(Required)** <br /> Options: `notSet`, `error`, `failed`, `notApplicable`, `pending`, `succeeded` <br /> Default value: `notSet`                                                                                                              |
| `useDefined` <br />Use defined id                 | **(Optional)** If set, overrides the value from `System.PullRequest.PullRequestId` <br />                                                                                                                                                       |
| `pullRequestId` <br />Pull Request Id             | **(Optional)** If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId` <br /> Default value: `$(System.PullRequest.PullRequestId)` |
| `whenState` <br />When current status is in state | **(Optional)** Only update the state of the status when the existing state is one of these <br /> Options: `notSet`, `error`, `failed`, `notApplicable`, `pending`, `succeeded` <br />                                                          |


## Examples

### Create and update status

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

### Conditionally update status

A status can be conditionally updated by using the `whenState` argument. This will first check that the current status is in one of the given states before it updates.

For the example below, it will only update the status if it is in one of the following states:

- Error
- Failed
- Pending

```yml
- task: PullRequestStatus@0
  displayName: 'Initialize status'
  inputs:
    name: 'my-custom-check'
    action: 'Create'
    state: 'pending'
    description: 'Awaiting my custom check'
- script: 'echo Do something. It might even update the status'
- task: PullRequestStatus@0
  displayName: 'Update status'
  inputs:
    name: 'my-custom-check'
    action: 'Update'
    state: 'succeeded'
    description: 'Check passed'
    whenState: 'error, failed, pending'
```

# 🐞 Known issues

If using classic pipelines and you get the error:

> TF400813: The user '' is not authorized to access this resource.

Ensure `Allow scripts to access the OAuth token` is checked under options. See the [docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops#allow-scripts-to-access-the-oauth-token) for more info.

