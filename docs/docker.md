# Docker

The image runs the Web UI with FFmpeg, Patchright Chromium, Xvfb for browser challenges, and the optional SSO and Discord dependencies already included.

## Start with Compose

Save [`docker-compose.yaml`](https://github.com/phoenixthrush/AniWorld-Downloader/blob/models/docker-compose.yaml) in a folder on your machine. Run these commands from that folder:

```bash
mkdir -p Downloads
docker compose up -d
```

Open `http://localhost:8080`. For a remote server, use its address instead of `localhost`.

Create `Downloads` first: on Linux, a directory created automatically by Docker may belong to root and be unwritable by the app's unprivileged user.

## Everyday commands

```bash
# Follow logs
docker compose logs -f

# Pull the latest image and recreate the container
docker compose pull
docker compose up -d

# Stop and remove the container, keeping its data
docker compose down
```

Do not add `-v` to `down` unless you intend to remove named volumes, including the app's configuration and database.

## Persistent data

| Container path | Supplied Compose storage | Contents |
| --- | --- | --- |
| `/app/Downloads` | `./Downloads` on the host | Downloaded media |
| `/home/aniworld/.aniworld` | `aniworld-data` named volume | `.env`, database, authentication data, and custom CSS/shader |
| `/ms-playwright` | Built into the image | Chromium browser installation |

The browser binary ships in the image; you do not need to download it again into a volume.

To change where downloads live on the host, change the left side of the download volume mapping. Keep `/app/Downloads` on the container side unless you also change `ANIWORLD_DOWNLOAD_PATH`. Additional custom paths need their own mounts and must use container paths in the Web UI.

Stop the service before making a consistent backup of its database and app data. Back up the download folder separately. Restoring the named volume preserves users, API keys, custom paths, queue records, Auto-Sync exclusions, and themes.

## Configure the service

The supplied Compose file includes commented examples for language, hoster fallback, paths, site toggles, authentication, Auto-Sync, Discord, and captcha controls. Add values under the existing service's `environment:` block:

```yaml
environment:
  ANIWORLD_LANGUAGE: "German Dub"
  ANIWORLD_PROVIDER: "VOE"
  ANIWORLD_WEB_AUTH: "1"
```

Alternatively, save environment variables in a host file and add this under `services.aniworld`:

```yaml
env_file:
  - ./.env
```

`env_file` injects environment variables; it does not mount the file. Explicit `environment:` values take precedence over `env_file`, and process environment values take precedence over the app's own `.env`.

After changing the Compose configuration or its environment file, run `docker compose up -d` to apply it. If the values do not refresh, recreate the service with `docker compose up -d --force-recreate`.

Most settings changed through the Web UI last only until the app process restarts. Keep those settings in your deployment configuration. Discord settings saved through the UI are written to the app's `.env`; avoid also setting them in Compose if you want the saved values to control startup.

### CAPTCHA interaction

Use the CAPTCHA action on the running queue item to open the browser screenshot and click the challenge. The container's virtual display handles Chromium; setting `ANIWORLD_CAPTCHA_VISIBLE=1` does not expose that display to your desktop.

For manual widget solving with a longer timeout and browser error logging, add these values to the service's `environment:` block:

```yaml
  ANIWORLD_CAPTCHA_MANUAL: "1"
  ANIWORLD_CAPTCHA_TIMEOUT: "600"
  ANIWORLD_CAPTCHA_DEBUG_LOG: "1"
```

Leave `ANIWORLD_CAPTCHA_VISIBLE` at `auto` for the normal Docker flow. See [CAPTCHA configuration](./configuration#captcha-solving) for all four controls and their defaults.

## Build locally

Clone the application repository and enter it:

```bash
git clone --branch models https://github.com/phoenixthrush/AniWorld-Downloader.git
cd AniWorld-Downloader
mkdir -p Downloads
```

Replace the Compose service's `image:` line with `build: .`, then run:

```bash
docker compose up -d --build
```

The build downloads dependencies and browser files. It can take longer than starting the published image.

## Remote access

The service listens on container port `8080`, which Compose publishes on the host. To restrict it to the host machine, use `127.0.0.1:8080:8080` as the port mapping.

For access from other users or networks, enable [authentication](./web-ui#local-accounts). For a public domain, use an HTTPS reverse proxy and set `ANIWORLD_WEB_BASE_URL` to the external address. See [Configuration](./configuration) for OIDC settings and [Troubleshooting](./troubleshooting) for filesystem or captcha problems.
