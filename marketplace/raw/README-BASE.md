# Pull Request Utils

Pull Request Utils is a collection of tasks to interact with pull requests from your pipelines. The tasks currently provide:

- Creating and updating comments
- Assigning tags
- Removing tags
- Checking if tag is assigned
- Creating/Updating custom statuses
- Updating pull request description

> ❗ This extension requires the user account `<project name> Build Service (<org name>)` to be granted the permission `Contribute to pull requests`

Please report any feedback/issue [here](https://github.com/joachimdalen/azdevops-pull-request-utils)

# 📦 Tasks

- PullRequestComments
- PullRequestTags
- PullRequestStatus
- PullRequestDescription

{{ #include-partial[file=pull-request-comments] }}

{{ #include-partial[file=pull-request-tags] }}

{{ #include-partial[file=pull-request-status] }}

{{ #include-partial[file=pull-request-description] }}
