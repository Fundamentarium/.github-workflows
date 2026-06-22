# .github-workflows

Public repository containing reusable GitHub Actions workflows, Dockerfiles, and linter configurations for the **Fundamentarium** organization.

This repo is public so that workflows can be referenced by org-level rulesets.

## Workflows

| Workflow | Type | Description |
|---|---|---|
| `check_pr_title` | PR check | Validate PR title follows semantic commit format |
| `cloudformation_deploy` | Reusable | Deploy CloudFormation stacks to AWS via OIDC (prd/dev) |
| `cloudformation_linter` | PR check | Lint CloudFormation templates (`stack.yaml`) |
| `go_linter` | PR check | Go code linting with golangci-lint |
| `go_test_coverage` | PR check | Go tests with minimum coverage + database migration |
| `go_push_lambda` | Reusable | Release Please → cross-compile → Docker → ECR push |
| `go_push_ecs` | Reusable | Release Please → build → Docker → ECR push |
| `go_push_lib` | Reusable | Release Please only (versioning, no build) |
| `go_push_tool` | Reusable | Release Please → GoReleaser (multi-platform binaries) |
| `spa_test_build` | PR check | Validate SPA build (`npm ci` + `npm run build`) |
| `sql_migration_test` | PR check | Test SQL migrations with Flyway + PostgreSQL |

## Configs and Dockerfiles

- `.golangci.yml` — Official golangci-lint configuration
- `Dockerfile-ecs-golang` — Distroless image for Go ECS services
- `Dockerfile-lambda-golang` — AWS Lambda runtime for Go

## Usage

Reusable workflows (`workflow_call`) are called from consuming repos:

```yaml
# .github/workflows/push.yaml
name: Push
on:
  push:
    branches: [main]
jobs:
  push:
    uses: Fundamentarium/.github-workflows/.github/workflows/go_push_lambda.yaml@main
    secrets: inherit
    permissions:
      id-token: write
      contents: read
```

PR check workflows (`pull_request`, `branches: [disabled]`) are executed via GitHub Rulesets configured at the org level.
