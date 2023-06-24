# Installation (API)

## 📦 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📥 Installation

1. Navigate to the `packages/api` directory:

```bash
cd packages/api
```

2. Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

3. Snip up the server:

```bash
docker compose up -d

```

4. The server should now be running on port `4000` by default. You can verify this by running:

```bash
docker compose ps
```

## 📝 Configuration

**Note**: For R2 keys you must have an cloudflare account and a domain name.