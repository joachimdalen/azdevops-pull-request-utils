#!/bin/bash

azext readme generate --profile github --input tasks/pull-request-comments/docs/README.md --output tasks/pull-request-comments/README.md
azext readme generate --profile github --input tasks/pull-request-description/docs/README.md --output tasks/pull-request-description/README.md
azext readme generate --profile github --input tasks/pull-request-status/docs/README.md --output tasks/pull-request-status/README.md
azext readme generate --profile github --input tasks/pull-request-tags/docs/README.md --output tasks/pull-request-tags/README.md
