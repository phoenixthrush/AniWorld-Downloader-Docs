# Docker

Docker runs the Web UI with Chromium and FFmpeg already included. It is the simplest option for a home server or NAS.

## Docker Compose

Download [`docker-compose.yaml`](https://github.com/phoenixthrush/AniWorld-Downloader/blob/main/docker-compose.yaml), then create the download folder before starting the container:

```bash
mkdir -p Downloads
docker compose up -d
```

Open `http://localhost:8080`.

::: warning Create the folder first
If Docker creates `Downloads` itself on Linux, it may belong to root and prevent the app from writing files.
:::

## Common commands

```bash
# Follow logs
docker compose logs -f

# Update and restart
docker compose pull
docker compose up -d

# Stop the app
docker compose down
```

`docker compose down` keeps both downloads and configuration. Do not add `-v` unless you intend to remove the configuration volume.

## Persistent data

| Container path | Compose storage | Contains |
| --- | --- | --- |
| `/app/Downloads` | `./Downloads` | Downloaded media |
| `/home/aniworld/.aniworld` | `aniworld-data` volume | Settings, users, jobs, and browser data |

## Configuration

Add variables under `environment` in the Compose service:

```yaml
services:
  aniworld:
    image: ghcr.io/phoenixthrush/aniworld-downloader:latest
    environment:
      ANIWORLD_LANGUAGE: "German Dub"
      ANIWORLD_PROVIDER: "VOE"
      ANIWORLD_WEB_AUTH: "1"
      ANIWORLD_WEB_ADMIN_USER: "admin"
      ANIWORLD_WEB_ADMIN_PASS: "change-this-password"
```

See [Configuration](./configuration) for all settings.

## Build locally

Clone the main repository, replace the service's `image:` line with `build: .`, and run:

```bash
docker compose build
docker compose up -d
```

## Remote access

The container listens on port `8080`. Enable authentication before making it available outside your local network. For a public domain, place it behind an HTTPS reverse proxy and set `ANIWORLD_WEB_BASE_URL` to the external address.
