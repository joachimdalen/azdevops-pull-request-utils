mkdir -p docs/generated/tasks
cp docs/tasks/_category_.json docs/generated/tasks/_category_.json
azext readme generate --input ./docs/index.md --output ./docs/generated/index.md --profile doc-site
azext readme generate --input ./docs/tasks/pull-request-comments.md --output ./docs/generated/tasks/pull-request-comments.md --profile doc-site
azext readme generate --input ./docs/tasks/pull-request-tags.md --output ./docs/generated/tasks/pull-request-tags.md --profile doc-site
azext readme generate --input ./docs/tasks/pull-request-description.md --output ./docs/generated/tasks/pull-request-description.md --profile doc-site
azext readme generate --input ./docs/tasks/pull-request-status.md --output ./docs/generated/tasks/pull-request-status.md --profile doc-site
