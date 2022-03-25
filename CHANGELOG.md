# Changelog

## 1.1.0 (2022-03-25)

### 🐛 Fixes (1)

#### `PullRequestStatus@0.5.0`

- Fixed an issue where action `Delete` did not load the correct status
  - Fixed in [PR#8 - Add option to conditionally update status](https://github.com/joachimdalen/azdevops-pull-request-utils/pull/8)

### 🚀 Features (1)

#### `PullRequestStatus@0.5.0`

- Added new argument `whenState` to control when a status update should be applied
  - Suggested in [GH#7 - Update PullRequestStatus only if the status is fulfilled](https://github.com/joachimdalen/azdevops-pull-request-utils/issues/7)
  - Added in [PR#8 - Add option to conditionally update status](https://github.com/joachimdalen/azdevops-pull-request-utils/pull/8)

## 🌟 Contributors

Thank you to the following for contributing to the latest release

- [@knoxi](https://github.com/knoxi)

---

## 1.0.0 (2022-03-12)

### 🛠️ Maintenance (1)

- Align all task versions to `0.4.0`
  - Changed in
    - [PR#2 - Open source extension](https://github.com/joachimdalen/azdevops-pull-request-utils/pull/2)
    - [PR#3 - Add repository to manifest](https://github.com/joachimdalen/azdevops-pull-request-utils/pull/3)

### 📦 Module changes

### 🛠️ Maintenance (5)

#### `pull-request-core@0.0.1`

- Added module with shared code

#### `PullRequestDescription@0.4.0`

- Update dependencies

#### `PullRequestComments@0.4.0`

- Update dependencies

#### `PullRequestStatus@0.4.0`

- Update dependencies

#### `PullRequestTags@0.4.0`

- Update dependencies

### 📝 Documentation (5)

#### `pull-request-core@0.0.1`

- Update docs

#### `PullRequestDescription@0.4.0`

- Update docs

#### `PullRequestComments@0.4.0`

- Update docs

#### `PullRequestStatus@0.4.0`

- Update docs

#### `PullRequestTags@0.4.0`

- Update docs

---

## 0.5.5 (2022-02-12)

### 🛠️ Maintenance (4)

#### `PullRequestDescription@0.2.5`

- Update dependencies

#### `PullRequestComments@0.2.5`

- Update dependencies

#### `PullRequestStatus@0.0.8`

- Update dependencies

#### `PullRequestTags@0.1.13`

- Update dependencies

### 🐛 Fixes (4)

#### `PullRequestDescription@0.2.5`

- Removed input groups for UI for task configuration. These was causing issues in DevOps Server

#### `PullRequestComments@0.2.5`

- Removed input groups for UI for task configuration. These was causing issues in DevOps Server

#### `PullRequestStatus@0.0.8`

- Removed input groups for UI for task configuration. These was causing issues in DevOps Server

#### `PullRequestTags@0.1.13`

- Removed input groups for UI for task configuration. These was causing issues in DevOps Server

---

## 0.5.4 (2021-12-18)

### 🛠️ Maintenance (4)

#### `PullRequestDescription@0.2.4`

- Update dependencies

#### `PullRequestComments@0.2.4`

- Update dependencies

#### `PullRequestStatus@0.0.7`

- Update dependencies

#### `PullRequestTags@0.1.12`

- Update dependencies

---

## 0.5.3 (2021-10-06)

### 🛠️ Maintenance (1)

- Enabled Azure DevOps Server

### 📦 Module changes

### 🛠️ Maintenance (8)

#### `PullRequestDescription@0.2.3`

- Update dependencies

- Update task metadata

#### `PullRequestComments@0.2.3`

- Update dependencies

- Update task metadata

#### `PullRequestStatus@0.0.6`

- Update dependencies

- Update task metadata

#### `PullRequestTags@0.1.11`

- Update dependencies

- Update task metadata

---

## 0.5.2 (2021-07-15)

### 🛠️ Maintenance (4)

#### `PullRequestDescription@0.2.2`

- Update task metadata

#### `PullRequestComments@0.2.2`

- Update task metadata

#### `PullRequestStatus@0.0.5`

- Update task metadata

#### `PullRequestTags@0.1.10`

- Update task metadata

---

## 0.5.1 (2021-07-03)

### 🛠️ Maintenance (4)

#### `PullRequestDescription@0.2.1`

- Update dependencies

#### `PullRequestComments@0.2.1`

- Update dependencies

#### `PullRequestStatus@0.0.4`

- Update dependencies

#### `PullRequestTags@0.1.9`

- Update dependencies

### 📝 Documentation (1)

#### `PullRequestDescription@0.2.1`

- Fixed wrong statuses being listed in the documentation

---

## 0.5.0 (2021-02-20)

### 🚀 Features (1)

#### `PullRequestDescription@0.2.0`

- Added option `view`

---

## 0.4.3 (2021-02-17)

### 🚀 Features (4)

#### `PullRequestDescription@0.1.2`

- Added option `useDefined`

- Added option `pullRequestId`

#### `PullRequestTags@0.1.8`

- Added option `useDefined`

- Added option `pullRequestId`

---

## 0.4.2 (2021-01-27)

### 🐛 Fixes (2)

#### `PullRequestComments@0.2.0`

- Fixed `skipIfCommentExists` not working properly. It was dumb previously and only checked the content of the comment. It is now updated to add a hidden identifier to the comment to properly identify if it exists. If you use multiple tasks, ensure `commentId` is set as a unique value for each task.

- Fixed some configuration options not showing in the editor

### 🚀 Features (3)

#### `PullRequestDescription@0.1.1`

- Added PullRequestDescription, see documentation for more info.

#### `PullRequestComments@0.2.0`

- Added option `commentId`

- Added option `action`, you can now create or update comments.

---

## 0.2.2 (2021-01-11)

### 🛠️ Maintenance (3)

#### `PullRequestTags@0.1.7`

- Update dependencies

#### `PullRequestComments@0.1.12`

- Update dependencies

#### `PullRequestStatus@0.0.3`

- Update dependencies

---

## 0.2.1 (2020-11-22)

### 📝 Documentation (2)

#### `PullRequestComments@0.1.11`

- Clarified some minor details

#### `PullRequestStatus@0.0.2`

- Clarified some minor details

---

## 0.2.0 (2020-11-22)

### 🛠️ Maintenance (2)

#### `PullRequestComments@0.1.11`

- Updated dependencies

#### `PullRequestTags@0.1.6`

- Updated dependencies

### 📝 Documentation (2)

#### `PullRequestComments@0.1.11`

- Updated docs

#### `PullRequestTags@0.1.6`

- Updated docs

### 🚀 Features (1)

#### `PullRequestStatus@0.0.2`

- Added PullRequestStatus. Create custom statuses that can be used in policies. See `README` for more information.

---

## 0.1.15 (2020-09-24)

#### 💬 Summary

- Fixed readme images

---

---

## 0.1.14 (2020-09-24)

#### 💬 Summary

- Published extension to preview

---

---
