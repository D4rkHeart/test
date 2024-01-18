# syntax=docker/dockerfile:1.4

# Stage 1: Builder
FROM node:17.0.1-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@13

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

# Stage 2: Dev Environments
FROM builder as dev-envs

RUN apt-get update && \
    apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# Install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0"]
