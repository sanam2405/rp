# src Dockerfile: https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/api/Dockerfile
FROM node:18-slim AS slime

# Setup pnpm on the slime base
FROM slime as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodeslime to understand why libc6-compat might be needed.
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# Set environment variables to avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies to allow Python installation
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    python3 \
    python3-pip \
    python3-venv \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Verify Python installation
RUN python3 --version && pip3 --version

# Set Python 3 as the default 'python' command (optional)
RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN turbo run build --filter=api

# Use slime as the thinest image
FROM slime AS runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the custom PS1 prompt
RUN echo 'export PS1="\[\033[1;31m\]rimjhim@sanam\[\033[0m\] $ "' >> /root/.bashrc

WORKDIR /app

# COPY --from=installer /app/apps/api/next.config.js .
COPY --from=installer /app/apps/api/package.json .
COPY --from=installer /app .

EXPOSE 5005

CMD ["pnpm", "dev", "-F", "api"]