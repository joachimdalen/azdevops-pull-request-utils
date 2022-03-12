# Pull Request Description

---

**Update pull request descriptions during pipeline runs**

---

## YAML Snippet

```yaml
- task: PullRequestDescription@0
  inputs:
    action: append #The action to perform
    content: #The content to append or replace original description with. Required when action is `append` or `replace`. For Markdown syntax, see [Syntax guidance for basic Markdown usage](http://go.microsoft.com/fwlink/?LinkId=823918) **Supports usage of variables.**
    useDefined: false #Use the pre-defined id for the pull request. If set, overrides the value from `System.PullRequest.PullRequestId`. Default: `false`
    pullRequestId: $(System.PullRequest.PullRequestId) #If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId`
    outputVariable: PullRequest.DescriptionContent #The name of the output variable to write the description to. Default `PullRequest.DescriptionContent`. Applies to actions `view`
    isOutput: #If set, `outputVariable` is set as output and accessible from other jobs. Applies to actions `view`
    stripIdentifiers: false #Strip internal modifiers before setting variable. Applies to actions `view`

```

## Arguments

| Argument                                   | Description                                                                                                                                                                                                                                                                          |
| :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action` <br />Action                      | **(Required)** The action to perform <br /> Options: `append`, `replace`, `view` <br /> Default value: `append`                                                                                                                                                                      |
| `content` <br />Content                    | **(Required)** The content to append or replace original description with. Required when action is `append` or `replace`. For Markdown syntax, see [Syntax guidance for basic Markdown usage](http://go.microsoft.com/fwlink/?LinkId=823918) **Supports usage of variables.** <br /> |
| `useDefined` <br />Use defined id          | **(Optional)** Use the pre-defined id for the pull request. If set, overrides the value from `System.PullRequest.PullRequestId`. Default: `false` <br />                                                                                                                             |
| `pullRequestId` <br />Pull Request Id      | **(Optional)** If no id is given, the value from `System.PullRequest.PullRequestId` is taken. If a value is given, this overrides the value from `System.PullRequest.PullRequestId` <br /> Default value: `$(System.PullRequest.PullRequestId)`                                      |
| `outputVariable` <br />Output Variable     | **(Optional)** The name of the output variable to write the description to. Default `PullRequest.DescriptionContent`. Applies to actions `view` <br /> Default value: `PullRequest.DescriptionContent`                                                                               |
| `isOutput` <br />Is output                 | **(Optional)** If set, `outputVariable` is set as output and accessible from other jobs. Applies to actions `view` <br />                                                                                                                                                            |
| `stripIdentifiers` <br />Strip Identifiers | **(Optional)** Strip internal modifiers before setting variable. Applies to actions `view` <br />                                                                                                                                                                                    |


## Examples

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


### Set as variable

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
