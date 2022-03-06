# {{ #task-field[task=status;field=friendlyName] }}

---

**{{ #task-field[task=status;field=helpMarkDown] }}**

---

## YAML Snippet

{{ #task-input[task=status;type=example] }}

## Arguments

{{ #task-input[task=status;type=table] }}

## Examples

### Create and update status

{{ #include-partial[file=status-create;wrap=yml] }}

# 🐞 Known issues

{{ #include-partial[file=status-access-warning] }}