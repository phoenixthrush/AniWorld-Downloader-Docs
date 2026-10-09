# Configuration

AniWorld Downloader loads startup settings from `.env` and the process environment:

| System | Location |
| --- | --- |
| Linux and macOS | `~/.aniworld/.env` |
| Windows | `%USERPROFILE%\.aniworld\.env` |

The file is created on first start. Use one `NAME=value` setting per line and restart the app after editing it.

```dotenv
ANIWORLD_LANGUAGE="German Dub"
ANIWORLD_PROVIDER=VOE
ANIWORLD_DOWNLOAD_PATH=Downloads
```

## What survives a restart

| Data | Storage | Persists? |
| --- | --- | --- |
| Most general settings changed in the Web UI | Running process | No; save their environment values |
| Startup settings | `.env` or deployment environment | Yes |
| Users, API keys, custom paths, queue records, Auto-Sync exclusions | `aniworld.db` | Yes |
| Discord settings saved in the Web UI | `.env` | Yes |
| Custom CSS and shader | `custom.css`, `custom.frag` | Yes |

**Settings → Administration → Export settings** downloads the configurable Web UI settings as an `.env` file; it is not a complete export of every startup variable. Secrets such as the Discord token, OIDC secret, and administrator password are omitted; keep those values when merging the export into your existing configuration.

AniWorld settings use the `ANIWORLD_` prefix. The MangaFire format setting is `ANIWORLD_MANGAFIRE_FORMAT`; an older app `.env` is migrated automatically. OS and dependency variables such as `PATH`, `DISPLAY`, `XDG_CACHE_HOME`, `APPDATA`, `LOCALAPPDATA`, `PLAYWRIGHT_BROWSERS_PATH`, `PLAYWRIGHT_NODEJS_PATH`, `SSL_CERT_FILE`, `REQUESTS_CA_BUNDLE`, `CURL_CA_BUNDLE`, and `WERKZEUG_RUN_MAIN` keep the names required by those systems. They are not AniWorld settings.

Certificate bundle paths can be set in the process environment or the app `.env`. The process environment wins for the same variable, and the three CA variables survive `.env` template updates. At startup, the first nonempty value in `REQUESTS_CA_BUNDLE`, `CURL_CA_BUNDLE`, then `SSL_CERT_FILE` order supplies the shared HTTP session's bundle and defaults for unset CA variables; otherwise certifi supplies the bundle. Explicit values are preserved, so different paths can intentionally give clients different trust settings. Setting only `SSL_CERT_FILE` also supplies the Requests/cURL defaults. These settings do not configure Chromium's trust store or guarantee that external tools such as FFmpeg, mpv, or Syncplay use that bundle.

Existing process environment variables override values loaded from `.env`. CLI options override the corresponding settings for that invocation. A relative `--output` path is resolved from the current working directory; all backend models expand `~` and resolve relative `ANIWORLD_DOWNLOAD_PATH` or Python `selected_path` values beneath your home directory. Surrounding whitespace is trimmed from `ANIWORLD_DOWNLOAD_PATH`; spaces in an explicit Python path are preserved. An unset or blank download setting defaults to `~/Downloads`. MangaFire's explicit Python `download(folder=...)` argument remains a direct destination, with relative folders based on the working directory. Restart after editing startup configuration.

Set `ANIWORLD_INSTALL_FOLDER` before launch to use another app data directory. Relative values are resolved against your home directory. On first relocation, the app can copy the old `.env`; it does not migrate the database or theme files. Move those separately with the app stopped if you want to retain them.

## Everyday settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_DOWNLOAD_PATH` | `Downloads` | Download folder, relative to your home folder or absolute |
| `ANIWORLD_LANGUAGE` | `German Dub` | `German Dub`, `English Sub`, `German Sub`, or `English Dub` |
| `ANIWORLD_PROVIDER` | `VOE` | Preferred stream host |
| `ANIWORLD_PROVIDER_FALLBACK_ORDER` | `VOE,Vidmoly,Vidoza,Doodstream` | Hosts to try when the preferred one fails |
| `ANIWORLD_UI_LANGUAGE` | `en` | Web UI language: `en` or `de` |
| `ANIWORLD_LANG_SEPARATION` | `0` | Put Web UI queue downloads into language folders |
| `ANIWORLD_DISABLE_ENGLISH_SUB` | `0` | Hide English Sub choices and reject them in Web UI/API submissions |
| `ANIWORLD_SHOW_ALL_LANGUAGES` | `0` | Offer every preset for the site instead of restricting choices to the first-episode probe |
| `ANIWORLD_MOVIE_FOLDER` | `1` | Put each movie in its own folder |
| `ANIWORLD_VIDEO_CODEC` | `copy` | Copy streams, or encode using a supported software/hardware codec |
| `ANIWORLD_MANGAFIRE_FORMAT` | `jpg` | `jpg`, `cbz`, or `epub` (requires `aniworld[epub]`); see [manga usage](./usage#mangafire-downloads) |
| `ANIWORLD_NO_AUTO_INSTALL` | `0` | Disable automatic dependency downloads and installs, including promptless helper downloads and browser installation |
| `ANIWORLD_HLS_CONCURRENCY` | `8` | Parallel HLS segments, from `1` to `32` |
| `ANIWORLD_DEBUG_MODE` | `0` | Enable detailed logging |
| `ANIWORLD_NO_MENU` | `0` | Skip the CLI menu; supply URLs or an episode file |
| `ANIWORLD_MENU_DOWNLOAD_ONLY` | `0`, Docker image uses `1` | Hide Watch and Syncplay in the terminal menu, independently of the download folder |
| `ANIWORLD_ENABLE_LIBRARY` | `1` | Show the Web UI Library tab |

Boolean values use `1` for on and `0` for off.

`ANIWORLD_NO_AUTO_INSTALL=1` skips portable release lookup and automatic dependency downloads and installs. Existing tools on `PATH` or in the dependency folder remain usable. Cached archives with a known download URL can still be unpacked locally, but 7z archives require an already installed unpacker. This is not a network-offline mode: normal site and media requests still use the network.

Language separation is applied through the Web UI queue path resolver, including Discord requests; direct CLI/Python downloads do not use that resolver. The English Sub restriction is not enforced by direct CLI/Python downloads, Discord requests, or Auto-Sync, and does not apply to the fixed-language HentaiTV/HentaiHaven backends.

## File names

The default naming template is:

```dotenv
ANIWORLD_NAMING_TEMPLATE="{title} ({year}) [imdbid-{imdbid}]/Season {season}/{title} S{season}E{episode}.mkv"
```

Available placeholders are `{title}`, `{year}`, `{imdbid}`, `{season}`, `{episode}`, `{resolution}`, and `{language}`. AniWorld, SerienStream, Hanime, MegaKino, Moflix, HentaiTV, AnimeIDHentai, and HentaiHaven can fill `{resolution}` from the finished file; it falls back to `unknown` when there is not exactly one video stream. Kinox, BurningSeries, FilmPalast, and Filmo use fixed filename patterns and do not apply the resolution placeholder. Use brace placeholders throughout the template; legacy `%title%` placeholders are only translated by some filename formatters, not consistently in folder names. The file extension controls the output container. The Web UI's MKV/MP4 setting changes that extension in the running naming template; persist the template to keep it across restarts.

`copy` avoids re-encoding. Software codec choices include `h264`, `h265`, and `av1`; hardware options include `h264_nvenc`, `hevc_nvenc`, `h264_amf`, `hevc_amf`, `av1_amf`, `h264_qsv`, `hevc_qsv`, and `av1_qsv`. These require a compatible FFmpeg build and, for hardware encoding, the corresponding device and drivers.

Model-specific naming can differ, particularly for manga and movies. MegaKino and Moflix now format all template path components, including legacy percent placeholders, and sanitize metadata. New series paths use padded seasons and three-digit episode numbers; MegaKino treats its flat episode list as season 01. Neither model supplies an IMDb ID, so an empty default IMDb tag is omitted. Movies omit the default season folder and episode marker and respect `ANIWORLD_MOVIE_FOLDER`. If a file already exists at the old model-specific path with the requested extension, that path is reused; an existing file at the new template path takes priority. Old files are not renamed. Keep `SxxEyy` or `SxxEyyy` episode markers and matching title folders for Library and Auto-Sync recognition. Root-level movies saved with `ANIWORLD_MOVIE_FOLDER=0` are not listed by the current Library scanner. Use **Settings → path preview** or the Python model's path attributes to inspect the result before a large batch.

## Sources and playback

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_RANDOM_ANIME` | `0` | Choose a random anime |
| `ANIWORLD_USE_STO_SEARCH` | `0` | Prefer SerienStream for interactive search |
| `ANIWORLD_ANISKIP` | `0` | Skip intros and outros when timing data exists |
| `ANIWORLD_KEEP_WATCHING` | `0` | CLI Watch/Syncplay: continue from an episode URL through the rest of its season |
| `ANIWORLD_ENABLE_HTV` | `0` | Show Hanime's (`hanime.tv`) Web UI tab |
| `ANIWORLD_ENABLE_HENTAITV` | `0` | Show HentaiTV's (`hentai.tv`) Web UI tab |
| `ANIWORLD_ENABLE_HENTAIHAVEN` | `0` | Show HentaiHaven's (`hentaihaven.xxx`) Web UI tab |
| `ANIWORLD_ENABLE_KINOX` | `0` | Enable Kinox support |
| `ANIWORLD_ENABLE_BURNINGSERIES` | `0` | Enable BurningSeries support |
| `ANIWORLD_KINOX_DOMAIN` | Empty, uses `kinox.to` | Override the Kinox hostname, without `https://` |
| `ANIWORLD_USE_IINA` | `1` | Use IINA for ordinary watching on macOS; use `0` for mpv. Syncplay always uses mpv |

Site toggles control Web UI visibility. See [Supported Sites](./supported-sites) for every toggle and disabled default. They are not a guarantee that a backend works, and do not remove it from the Python package.

## Syncplay

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_SYNCPLAY_HOST` | Empty, uses `syncplay.pl:8998` | Server hostname and port |
| `ANIWORLD_SYNCPLAY_ROOM` | Empty | Join this room, or generate one from the episode filename |
| `ANIWORLD_SYNCPLAY_USERNAME` | Empty, uses your system username | Display name |
| `ANIWORLD_SYNCPLAY_PASSWORD` | Empty | Hash the episode filename with this value to derive a private room name; ignored when a room is specified |

The password changes the generated room name; it is not a Syncplay server authentication password. CLI Syncplay flags override these values for that invocation.

## Auto-Sync

```dotenv
ANIWORLD_ENABLE_AUTOSYNC=1
ANIWORLD_AUTOSYNC_MODE=interval
ANIWORLD_AUTOSYNC_INTERVAL=24h
ANIWORLD_AUTOSYNC_NEW_ONLY=0
```

For fixed times, use `ANIWORLD_AUTOSYNC_MODE=cron` and `ANIWORLD_AUTOSYNC_CRON="0 3 * * *"`. See [Auto-Sync](./automation#auto-sync) for how library matching, exclusions, and scheduling work.

## Web authentication

Local authentication can be enabled with `aniworld -w -wA`. To create the first administrator without opening the setup page:

```dotenv
ANIWORLD_WEB_ADMIN_USER=admin
ANIWORLD_WEB_ADMIN_PASS=change-this-password
```

Authentication modes can also be set through `ANIWORLD_WEB_AUTH`, `ANIWORLD_WEB_SSO`, and `ANIWORLD_WEB_FORCE_SSO`. For local accounts plus SSO, set both `ANIWORLD_WEB_AUTH=1` and `ANIWORLD_WEB_SSO=1`. SSO alone does not enable authentication; forced SSO enables both.

### OIDC single sign-on

Install `aniworld[sso]`, then use `aniworld -w -wA -wS` to offer SSO beside local accounts, or `aniworld -w -wFS` for SSO only. Register `https://aniworld.example.com/oidc/callback` as the redirect URI at your identity provider, replacing the origin with your public app URL.

```dotenv
ANIWORLD_WEB_BASE_URL=https://aniworld.example.com
ANIWORLD_OIDC_ISSUER_URL=https://login.example.com/realms/main
ANIWORLD_OIDC_CLIENT_ID=aniworld
ANIWORLD_OIDC_CLIENT_SECRET=secret
ANIWORLD_OIDC_DISPLAY_NAME=SSO
ANIWORLD_OIDC_ADMIN_SUBJECT=
```

`ANIWORLD_OIDC_ADMIN_SUBJECT` matches the identity provider's subject (`sub`) to promote an SSO user to administrator. The older `ANIWORLD_OIDC_ADMIN_USER` matches the display username. Currently either match grants admin access, even when both settings are supplied; leave the username setting empty when using a subject. If no admin exists, the first successful SSO login becomes admin even when a different subject is configured. Restrict access at the identity provider during initial setup.

Set the issuer, client ID, and client secret before enabling SSO-only login. Missing OIDC values can leave an environment-configured SSO-only instance without a working login method; the CLI force flag rejects missing values. A missing SSO dependency aborts startup when SSO is forced.

### HTTPS reverse proxy

Set `ANIWORLD_WEB_BASE_URL` to the external origin, for example `https://aniworld.example.com`, for redirects and secure session cookies. `ANIWORLD_WEB_TRUSTED_PROXY` accepts the address of the proxy directly connected to Waitress; it trusts one proxy hop for `X-Forwarded-For` and `X-Forwarded-Proto`. Without it, forwarded headers are not trusted. This matters for client-IP login throttling as well as HTTPS detection.

Use the actual proxy address and prevent direct public access to the backend. The current setting supports one hop, so account for that when deploying multiple proxies.

## Discord bot

The Web UI can run a Discord bot beside the server.

| Setting | Purpose |
| --- | --- |
| `ANIWORLD_DISCORD_BOT_ENABLED` | Enable the bot |
| `ANIWORLD_DISCORD_TOKEN` | Discord bot token |
| `ANIWORLD_DISCORD_OWNER_ID` | Owner account ID |
| `ANIWORLD_DISCORD_MODE` | `standard` requires owner approval; `advanced` queues directly |
| `ANIWORLD_DISCORD_REQUEST_ROLE_ID` | Role allowed to create requests |
| `ANIWORLD_DISCORD_GUILD_ID` | Guild used for command registration |
| `ANIWORLD_DISCORD_LANGUAGE` | Bot response language |
| `ANIWORLD_DISCORD_ANNOUNCE_CHANNEL_ID` | Channel for announcements |

The Settings page is the easiest place to configure these values and saves them to `.env`. See [Discord requests](./automation#discord-request-bot) for the workflow.

## Captcha solving

The app opens Chromium and tries checkbox challenges, including Turnstile, hCaptcha and reCAPTCHA, plus ALTCHA verification. Image challenges need your input: use the browser window in CLI mode or click the browser screenshot on the Web UI queue page. The defaults require no extra configuration; successful verification still depends on the site and its challenge.

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_CAPTCHA_VISIBLE` | `auto` | `auto` shows CLI solving windows and keeps Web UI and background helper windows off-screen. `1` always shows the window; `0` always keeps it off-screen. Chromium remains headed in every mode. |
| `ANIWORLD_CAPTCHA_TIMEOUT` | Empty | Positive seconds to wait for a solve. Empty, invalid or nonpositive values keep the flow's default: 300 seconds for CAPTCHA/Hanime, 90 for S.to and 30 for Moflix. |
| `ANIWORLD_CAPTCHA_MANUAL` | `0` | `1` leaves checkbox clicks and ALTCHA verification to you. Completed forms still submit automatically. Use `ANIWORLD_CAPTCHA_VISIBLE=1` if you need to interact with a background helper window. |
| `ANIWORLD_CAPTCHA_DEBUG_LOG` | `0` | `1` logs browser console warnings/errors, page errors and failed requests to the app log. |

Set these values in the app's `.env`, or in the Docker service's environment, and restart the app or recreate the container after changing them.

For example, to solve widgets yourself in a visible window and allow ten minutes:

```dotenv
ANIWORLD_CAPTCHA_VISIBLE=1
ANIWORLD_CAPTCHA_MANUAL=1
ANIWORLD_CAPTCHA_TIMEOUT=600
```

For Web UI or Docker use, leave `ANIWORLD_CAPTCHA_VISIBLE=auto` and interact through the queue's CAPTCHA viewer. A visible window opens on the machine running AniWorld; it does not open on a remote Web UI user's desktop.
