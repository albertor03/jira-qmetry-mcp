# 🚀 Deployment Guide

Simple guide to deploy the Jira QMetry MCP Server using Docker on any platform.

## 📋 Quick Deploy

### Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the `Dockerfile`
3. Add environment variable:
   - `QMETRY_API_KEY` = your-api-key-here
4. Deploy! Railway will automatically set the `PORT` variable

### Dokploy

1. Create a new service and connect your repository
2. Dokploy will detect the `Dockerfile`
3. Set environment variables:
   - `QMETRY_API_KEY` = your-api-key-here
   - `PORT` = 3000 (or let the platform set it)
4. Deploy!

### Render

1. Create a new Web Service
2. Connect your repository
3. Render will detect the `Dockerfile`
4. Add environment variable:
   - `QMETRY_API_KEY` = your-api-key-here
5. Deploy! (PORT is set automatically by Render)

### Docker (Self-hosted)

```bash
# Build
docker build -t jira-qmetry-mcp .

# Run
docker run -d \
  --name jira-qmetry-mcp \
  -p 3000:3000 \
  -e PORT=3000 \
  -e QMETRY_API_KEY="your-api-key-here" \
  --restart unless-stopped \
  jira-qmetry-mcp
```

### Docker Compose (Local Development)

```bash
# Create .env file
cp .env.example .env
# Edit .env and add your QMETRY_API_KEY

# Start
docker-compose up -d

# Logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🔧 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Server port (usually set by platform) |
| `QMETRY_API_KEY` | **Yes** | - | Your QMetry API key from Jira |
| `NODE_ENV` | No | `production` | Node environment |

### Getting Your API Key

1. Go to Jira
2. Navigate to: **QMetry** → **Configuration** → **Open API** → **Generate**
3. Copy the generated API key

## 📊 Verify Deployment

After deployment, check the health endpoint:

```bash
curl https://your-app-url.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "mcpServer": "connected",
  "protocol": "MCP Streamable HTTP",
  "tools": { "count": 50, ... }
}
```

## 🌐 Endpoints

- **MCP HTTP (POST)**: `/mcp` - Main MCP endpoint
- **MCP SSE (GET)**: `/mcp` - Server-Sent Events endpoint
- **Health Check**: `/health` - Health and status information

## 🐛 Troubleshooting

### Build Fails

- Ensure `pnpm-lock.yaml` is committed to the repository
- Check that Node.js version is compatible (20.x)

### Container Starts but Crashes

- Check logs for errors
- Verify `QMETRY_API_KEY` is set correctly
- Ensure the API key is valid

### Port Issues

- Most platforms set `PORT` automatically
- If deploying manually, ensure the port is not already in use
- The application reads from `process.env.PORT`

## 📝 Notes

- The Dockerfile is optimized for production use
- Development dependencies are removed after build
- The image uses Alpine Linux for minimal size
- Port is fully configurable via environment variable

## 📄 License

Apache License 2.0 - See LICENSE file for details

