# .github-workflows

Public repository containing reusable GitHub Actions workflows, Dockerfiles, and linter configurations for the **GustavoNetoOrg** organization.

This repo is public so that workflows can be referenced by org-level rulesets.

## Workflows

| Workflow | Type | Description |
|---|---|---|
| `cloudformation_linter` | PR check | Lint CloudFormation templates (`stack.yaml`) |
| `cloudformation_deploy` | Reusable | Deploy CloudFormation stacks to AWS (prd/stg/sbx) |
| `golang_linter` | PR check | Go code linting with golangci-lint |
| `golang_test_coverage` | PR check | Go tests with minimum coverage + database migration |
| `golang_push` | Reusable | Release Please + build + push Docker image to ECR |
| `web_test_build` | PR check | Validate web app build (`npm ci && npm run build`) |
| `web_push` | Reusable | Release Please + build + upload zip to S3 |
| `db_sql_migration_test` | PR check | Test SQL migrations with Flyway + PostgreSQL |
| `release_please_check_pr_title` | PR check | Validate PR title follows semantic commit format |
| `release_please_push` | Reusable | Run Release Please to create releases |

## Configs and Dockerfiles

- `.golangci.yml` — Official golangci-lint configuration
- `Dockerfile-ecs-golang` — Distroless image for Go ECS services
- `Dockerfile-lambda-golang` — AWS Lambda runtime for Go

## Usage

Workflows with `workflow_call` trigger are called from org repos:

```yaml
# .github/workflows/push.yaml in the consuming repo
name: Push
on:
  push:
    branches: [main]
jobs:
  push:
    uses: GustavoNetoOrg/.github-workflows/.github/workflows/golang_push.yaml@main
    secrets: inherit
```

Workflows with `pull_request` trigger (branches: [disabled]) are executed via GitHub Rulesets configured at the org level.
