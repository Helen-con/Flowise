# Flowise Copilot Guide

## Repo Snapshot
- Flowise is a pnpm + turbo monorepo; require Node >=18.15 and pnpm >=9.
- Workspaces: packages/server (oclif REST API + queue worker), packages/ui (React + Vite), packages/components (LangChain nodes/credentials), packages/api-documentation.
- Root scripts proxy into server CLI via run-script-os; `pnpm build` and `pnpm dev` are turbo pipelines.
- Avoid touching generated dist/build outputs; edit src and rerun package build scripts.

## Architecture Highlights
- Backend entry is packages/server/bin/run -> src/index.ts wiring Express, TypeORM DataSource, NodesPool, SSE streaming, and BullMQ via QueueManager when MODE=QUEUE.
- NodesPool loads node/credential metadata from flowise-components; packages/components/src houses node logic and credentials consumed through workspace dependency.
- Persistence uses TypeORM entities under packages/server/src/database with migrations configured in src/utils/typeormDataSource.ts (auto-run on boot).
- UI builder relies on ReactFlow canvases and Redux Toolkit slices under packages/ui/src/store; API clients in packages/ui/src/api call server /api/v1 routes.
- Telemetry + metrics toggle via ENABLE_METRICS and METRICS_PROVIDER, wiring Prometheus/OpenTelemetry adapters; SSEStreamer pushes chat updates to UI.

## Daily Workflows
- Install/build: pnpm install, pnpm build (set NODE_OPTIONS=--max-old-space-size=4096 if memory-bound).
- Dev loop: pnpm dev to run server + ui; package-specific dev via pnpm --filter ./packages/server dev or pnpm --filter ./packages/ui dev.
- Production-style start uses pnpm start; background processing uses pnpm start-worker with MODE=QUEUE and Redis configured.
- Database workflows: pnpm --filter ./packages/server typeorm:migration-generate and ... migration-run leverage src/utils/typeormDataSource.ts.
- Tests: pnpm test runs turbo pipeline; server e2e via pnpm --filter ./packages/server e2e (starts dev + Cypress); jest unit suites live per package.

## Conventions & Gotchas
- Server routes live in packages/server/src/routes; new endpoints must pass through JWT/API key middleware and reuse helpers in packages/server/src/utils.
- Queue events publish via packages/server/src/queue with RedisEventSubscriber bridging to SSE; remember to gate dashboards behind ENABLE_BULLMQ_DASHBOARD.
- components package builds with tsc + gulp; after adding nodes/credentials rerun pnpm --filter ./packages/components build so server NodesPool sees the new dist artifacts.
- UI uses MUI theme tokens in packages/ui/src/themes and Formik + Yup for forms; keep ReactFlow node definitions in sync with backend node keys.
- Environment examples are per package (.env.example); key flags include FLOWISE_FILE_SIZE_LIMIT, TRUST_PROXY, DENYLIST_URLS, ENABLE_METRICS, and authentication provider secrets.
- Swagger docs come from packages/api-documentation; run pnpm --filter ./packages/api-documentation build when updating API contracts.

## Debugging Tips
- Enable DEBUG=true for verbose Winston logging (configured in packages/server/src/utils/logger.ts); LOG_LEVEL and LOG_JSON_SPACES further tune output.
- Rate-limit headaches usually trace to TRUST_PROXY or DENYLIST_URLS; hit /api/v1/ip after tweaking proxies.
- Queue dashboard served at /admin/queues when ENABLE_BULLMQ_DASHBOARD=true and platform is not cloud; ensure Redis reachable.
- For SSE hiccups, confirm sanitizeMiddleware and Content-Security-Policy allow your environment, and that clients send x-request-from headers when required.

Let me know where you'd like more depth or concrete file pointers and I can iterate.
