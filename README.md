# venushacks-site

## Overview

This monorepo uses [turborepo](https://turbo.build/repo) with [pnpm](https://pnpm.io/) as a package manager. It contains the following:

### `apps/site`

A [Next.js](https://nextjs.org/) 13 project that uses the new app router.

This app contains the VenusHacks site.

The development server runs at `http://localhost:3000`. If this port is taken, the next available port will be used.

### `apps/api`

A [FastAPI](https://fastapi.tiangolo.com/) project.

This app contains the api for the VenusHacks site.

The development server runs at `http://localhost:8000`. If this port is taken, the next available port will be used.

### `apps/sanity`

A [Sanity Studio](https://www.sanity.io/studio) project.

This app contains the dashboard used to view and edit content stored in [Sanity](https://www.sanity.io/).

The development server runs at `http://localhost:3333`. If this port is taken, the project will error.

## First-Time Setup

### Pnpm

This repo used `pnpm`, a space-efficient replacement to `npm`.
You can learn more about its advantages at <https://pnpm.io/>.

Install pnpm with the following command, or use an [alternative installation method](https://pnpm.io/installation).

```shell
npm install -g pnpm
```

When running commands, use `pnpm` rather than `npm`.

### Next.js

1. Ensure you are in the project root.

2. Install dependencies
   ```shell
   pnpm i
   ```

### Python API

1. Ensure you are in `apps/api` with

   ```shell
   cd apps/api
   ```

2. Create a virtual environment. This isolates the libraries you install in this environment from the libraries on your actual machine.

   ```shell
   python3 -m venv .venv
   ```

3. Activate virtual environment

   VS Code may prompt to automatically select the newly created virtual environment.
   Otherwise, for Mac/Linux, run

   ```shell
   source .venv/bin/activate
   ```

   and for Windows, run

   ```shell
   .\.venv\scripts\activate
   ```

4. Install dependencies
   ```shell
   pip install -r requirements.txt -r requirements-dev.txt
   ```

### Docker

This project uses Docker for testing API methods locally.

1. Install [Docker](https://docs.docker.com/get-docker/). The process varies greatly depending on the operating system, so please refer to this article.

2. Open Docker Desktop.

A local MongoDB application will start running at `http://localhost:8081` after running `pnpm dev`.

_Note_: Because the Python files have been copied over to the Docker container, hot reload is no longer possible. Stopping the container and rerunning `pnpm dev` is the best option.

### Build

To build all apps and packages, run the following command in the project root.

_Note_: You would run this BEFORE opening a PR as a sanity check for errors.

```bash
pnpm build
```

To build an individual app or package, first, navigate to the corresponding directory and run the build command.

### Develop

To develop all apps and packages, run the following command in the project root.

```bash
pnpm dev
```

## Helpful VSCode Extensions

- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Python linting, intellisense, etc.
- [Mypy](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker) for Python type checking
- [Black](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter) for Python code formatting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for code formatting on file save or set to a keybind
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for linting Javascript

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `site`: a [Next.js](https://nextjs.org/) app
- `api`: a [FastAPI](https://fastapi.tiangolo.com/) app
- `sanity`: a [Sanity Studio](https://www.sanity.io/studio) app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
