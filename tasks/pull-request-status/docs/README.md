# {{ #task-field[task=status;field=friendlyName] }}

---

**{{ #task-field[task=status;field=helpMarkDown] }}**

---

## Options

### Example

{{ #task-input[task=status;type=example] }}

### All Options

{{ #task-input[task=status;type=table] }}

## Examples

{{ #include-partial[file=status-create;wrap=yml] }}

# 🐞 Known issues

If using classic pipelines and you get the error:

> TF400813: The user '' is not authorized to access this resource.

Ensure `Allow scripts to access the OAuth token` is checked under options. See the [docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops#allow-scripts-to-access-the-oauth-token) for more info.
