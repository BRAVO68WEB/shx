# 🚀 **Project SHX**

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/bravo68web/shx/build-image.yaml?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/bravo68web/shx?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bravo68web/shx?style=for-the-badge)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/bravo68web/shx?style=for-the-badge)

![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/BRAVO68WEB/shx?logo=codefactor&style=for-the-badge)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=BRAVO68WEB_shx)](https://sonarcloud.io/summary/new_code?id=BRAVO68WEB_shx)
![GitHub top language](https://img.shields.io/github/languages/top/bravo68web/shx?style=for-the-badge)

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## 📝 Description

Shx is a platform ment to store and share files, images, text and URLs with ease. This server is built using Node.js and Express.js and stores the uploaded content on Cloudflare R2 and PostgreSQL DB. It is compatible with ShareX and other clients that support the same protocol.

## 🛠️ Technologies Used

- Node.js
- Express.js
- TypeScript
- Redis
- Cloudflare R2
- Hasura Graphql (with PostgreSQL)
- Commander.js
- Next.js
- Tailwind CSS
- Storybook

## 🚀 Features

- File upload
- Image upload
- Text upload
- URL shortener
- CLI Support
- Web Dashboard

## 🎁 Project Setup

### @packages/api

The API package contains the server-side code responsible for handling file, image, and text uploads, as well as URL shortening. It provides the core functionality of the ShareX server.

### @packages/cli

The CLI package includes the command-line interface (CLI) for interacting with the ShareX server from the terminal. It allows users to perform various actions, such as uploading files, images, or text, and generating short URLs.

### @packages/dashboard

The dashboard package contains the web dashboard for the ShareX server. It allows users to view their uploaded files, images, and text, as well as manage their account and settings via a web interface.

## 📝 License

This project is licensed under the ISC License.

For more information, please see the `LICENSE` file.

## 📧 Contact

If you have any questions or would like to contribute to the project, please
contact `hi@b68.dev`.
