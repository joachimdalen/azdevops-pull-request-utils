# {{ #task-field[task=description;field=friendlyName] }}

---

**{{ #task-field[task=description;field=description] }}**

---

## Options

### Example

{{ #task-input[task=description;type=example] }}

### All Options

{{ #task-input[task=description;type=table] }}

## Examples

{{ #include-partial[file=description-append] }}

{{ #include-partial[file=description-replace] }}

{{ #include-partial[file=description-set-variable] }}

## Other

Setting the environment variable `PRU_DESC_LOG=true` will write the old description to the log. This is mostly used during development and testing, but might be nice to know.
