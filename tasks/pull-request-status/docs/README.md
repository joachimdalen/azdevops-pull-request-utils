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

### Conditionally update status

A status can be conditionally updated by using the `whenState` argument. This will first check that the current status is in one of the given states before it updates.

For the example below, it will only update the status if it is in one of the following states:

- Error
- Failed
- Pending

{{ #include-partial[file=status-conditional-update;wrap=yml] }}

# 🐞 Known issues

{{ #include-partial[file=status-access-warning] }}
