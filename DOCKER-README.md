# 🐳 Docker Configuration

This project includes a simple, portable Dockerfile for easy deployment on any platform.

## ✅ What's Included

- **Dockerfile** - Simple, single-stage build optimized for production
- **docker-compose.yml** - For local development and testing
- **.dockerignore** - Excludes unnecessary files from the build
- **.env.example** - Template for environment variables

## 🚀 Quick Start

### Local Testing with Docker

```bash
# 1. Build the image
docker build -t jira-qmetry-mcp .

# 2. Run with custom port
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -e QMETRY_API_KEY="your-key" \
  jira-qmetry-mcp
```

### Local Development with Docker Compose

```bash
# 1. Create .env file
cp .env.example .env

# 2. Edit .env and add your QMETRY_API_KEY

# 3. Start
docker-compose up -d
```

## 🌐 Platform Deployment

### Railway / Dokploy / Render

These platforms automatically detect the Dockerfile. Just:

1. Connect your repository
2. Set environment variable: `QMETRY_API_KEY`
3. Deploy!

The `PORT` will be set automatically by the platform.

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 3000, usually auto-set by platform)
- `QMETRY_API_KEY` - **Required** - Your QMetry API key
- `NODE_ENV` - Environment mode (default: production)

### Port Configuration

The port is fully configurable and read from the `PORT` environment variable:

```typescript
const PORT = process.env.PORT || 3000;
```

This makes it compatible with any platform (Railway, Dokploy, Render, Heroku, etc.)

## 📦 Dockerfile Features

- ✅ Single-stage build (simple and fast)
- ✅ Uses Node.js 20 Alpine (small image size)
- ✅ Includes pnpm for fast installs
- ✅ Removes dev dependencies after build
- ✅ Configurable port via environment variable
- ✅ Production-ready defaults

## 📊 Verify Deployment

```bash
curl http://localhost:3000/health
```

## 📝 Notes

- The Dockerfile is intentionally simple for maximum portability
- Works with Railway, Dokploy, Render, Fly.io, and any Docker platform
- Port is fully configurable - no hardcoded values
- See `DEPLOYMENT.md` for platform-specific instructions

## 🔗 More Info

- Full deployment guide: `DEPLOYMENT.md`
- Main documentation: `README.md`
