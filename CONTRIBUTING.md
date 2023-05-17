## Contributing Guidelines

Thank you for considering contributing to our custom ShareX server! We appreciate your interest in making our project better. To ensure a smooth collaboration, please take a moment to review and follow these guidelines.

## Table of Contents

- [Contributing Guidelines](#contributing-guidelines)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
  - [API](#api)
  - [CLI](#cli)
- [Contribution Process](#contribution-process)
  - [Reporting Issues](#reporting-issues)
  - [Submitting Pull Requests](#submitting-pull-requests)

## Getting Started

To contribute to our custom ShareX server, follow these steps to set up the development environment.

### Prerequisites

- Node.js (version 18.X.X)
- WSL (Windows Subsystem for Linux) (for Windows users)
- Yarn (version 2.X.X)

### Installation

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Install the required dependencies by running the following command in the project root directory:

   ```
   yarn
   yarn configure-husky
   ```

4. Edit `.env` inside `packages/api`. Start the API server by running the following command:

   ```
   cd packages/api
   yarn dev
   ```

5. Start the CLI by running the following command:

   ```
   cd packages/cli
   yarn r

   shx
   ```

6. Edit `.env` inside `packages/frontend`. Start the Dashboard by running the following command:

   ```
   cd packages/frontend
   yarn dev
   ```

## Project Structure

Our custom ShareX server is organized as a monorepo with the following packages:

### API

The API package contains the server-side code responsible for handling file, image, and text uploads, as well as URL shortening. It provides the core functionality of the ShareX server.

### CLI

The CLI package includes the command-line interface (CLI) for interacting with the ShareX server from the terminal. It allows users to perform various actions, such as uploading files, images, or text, and generating short URLs.

## Contribution Process

We welcome contributions from the community. If you encounter issues, have ideas for improvements, or want to contribute code, please follow the guidelines below.

### Reporting Issues

If you encounter any problems while using the ShareX server, please open an issue on the GitHub repository. Make sure to include detailed information about the issue, including steps to reproduce, expected behavior, and any relevant error messages.

### Submitting Pull Requests

If you want to contribute code to the project, follow these steps:

1. Create a fork of the repository on GitHub.

2. Clone the forked repository to your local machine:
    ```bash
   git clone https://github.com/<your-username>/shx.git
   cd shx
    ```

3. Create a new branch for your changes:
   ```bash
   git checkout -b feat/new-feature
   ```
4. Make your changes to the codebase.

5. Test your changes to ensure they work as intended.

6. Commit your changes with a clear and descriptive commit message:
   ```bash
   git commit -m "Add new feature"
   ```

7. Push to  your branch:
   ```bash
   git push origin feat/new-feature
   ```

8. Open a pull request on the GitHub repository. Make sure to include a detailed description of your changes.

9. Wait for a maintainer to review your pull request. If there are any issues, you may be asked to make changes to your code. Otherwise, your pull request will be merged into the main branch.

10. Celebrate! 🎉