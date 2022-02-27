<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Git Guard</h3>

  <p align="center">
Pull Request Utils is a collection of tasks to interact with pull requests from your pipelines.
    <br />
    <a href="https://github.com/joachimdalen/azdevops-pull-request-utils"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://marketplace.visualstudio.com/items?itemName=joachimdalen.pull-request-utils">View Extension</a>
    ·
    <a href="https://marketplace.visualstudio.com/items?itemName=joachimdalen.pull-request-utils/changelog">Changelog</a>
    ·
    <a href="https://github.com/joachimdalen/azdevops-pull-request-utils/issues">Report Bug</a>
    ·
    <a href="https://github.com/joachimdalen/azdevops-pull-request-utils/issues">Request Feature</a>
  </p>
</div>

The tasks currently provide:

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
