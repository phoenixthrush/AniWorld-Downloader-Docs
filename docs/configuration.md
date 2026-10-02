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

Existing process environment variables override values loaded from `.env`. CLI options override the corresponding settings for that invocation. Restart after editing startup configuration.

Set `ANIWORLD_INSTALL_FOLDER` before launch to use another app data directory. Relative values are resolved against your home directory. On first relocation, the app can copy the old `.env`; it does not migrate the database or theme files. Move those separately with the app stopped if you want to retain them.

## Everyday settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_DOWNLOAD_PATH` | `Downloads` | Download folder, relative to your home folder or absolute |
| `ANIWORLD_LANGUAGE` | `German Dub` | `German Dub`, `English Sub`, `German Sub`, or `English Dub` |
| `ANIWORLD_PROVIDER` | `VOE` | Preferred stream host |
| `ANIWORLD_PROVIDER_FALLBACK_ORDER` | `VOE,Vidmoly,Vidoza,Doodstream` | Hosts to try when the preferred one fails |
| `ANIWORLD_UI_LANGUAGE` | `en` | Web UI language: `en` or `de` |
| `ANIWORLD_LANG_SEPARATION` | `0` | Put downloads into language folders |
| `ANIWORLD_DISABLE_ENGLISH_SUB` | `0` | Hide and block English subtitles |
| `ANIWORLD_MOVIE_FOLDER` | `1` | Put each movie in its own folder |
| `ANIWORLD_VIDEO_CODEC` | `copy` | Copy streams, or encode using a supported software/hardware codec |
| `ANIWORLD_MANGAFIRE_FORMAT` | `jpg` | Chapter images (`jpg`) or comic archive (`cbz`) |
| `ANIWORLD_NO_AUTO_INSTALL` | `0` | Disable automatic dependency downloads and installation |
| `ANIWORLD_HLS_CONCURRENCY` | `8` | Parallel HLS segments, from `1` to `32` |
| `ANIWORLD_DEBUG_MODE` | `0` | Enable detailed logging |
| `ANIWORLD_NO_MENU` | `0` | Skip the CLI menu; supply URLs or an episode file |
| `ANIWORLD_ENABLE_LIBRARY` | `1` | Show the Web UI Library tab |

Boolean values use `1` for on and `0` for off.

## File names

The default naming template is:

```dotenv
ANIWORLD_NAMING_TEMPLATE="{title} ({year}) [imdbid-{imdbid}]/Season {season}/{title} S{season}E{episode}.mkv"
```

Available placeholders are `{title}`, `{year}`, `{imdbid}`, `{season}`, `{episode}`, `{resolution}`, and `{language}`. `{resolution}` comes from the finished file and falls back to `unknown` if there is not exactly one video stream. Older `%title%` style placeholders are supported too. The file extension controls the output container. The Web UI's MKV/MP4 setting changes that extension in the running naming template; persist the template to keep it across restarts.

`copy` avoids re-encoding. Software codec choices include `h264`, `h265`, and `av1`; hardware options include `h264_nvenc`, `hevc_nvenc`, `h264_amf`, `hevc_amf`, `av1_amf`, `h264_qsv`, `hevc_qsv`, and `av1_qsv`. These require a compatible FFmpeg build and, for hardware encoding, the corresponding device and drivers.

Model-specific naming can differ, particularly for manga and movies. Use **Settings → path preview** or the Python model's path attributes to inspect the result before a large batch.

## Sources and playback

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_RANDOM_ANIME` | `0` | Choose a random anime |
| `ANIWORLD_USE_STO_SEARCH` | `0` | Prefer SerienStream for interactive search |
| `ANIWORLD_ANISKIP` | `0` | Skip intros and outros when timing data exists |
| `ANIWORLD_KEEP_WATCHING` | `0` | CLI Watch/Syncplay: continue from an episode URL through the rest of its season |
| `ANIWORLD_ENABLE_HTV` | `0` | Show Hanime's (`hanime.tv`) Web UI tab |
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

Authentication modes can also be set through `ANIWORLD_WEB_AUTH`, `ANIWORLD_WEB_SSO`, and `ANIWORLD_WEB_FORCE_SSO`.

### OIDC single sign-on

Install `aniworld[sso]`, then use `aniworld -w -wS` to offer SSO beside local accounts, or `aniworld -w -wFS` for SSO only. Register `https://aniworld.example.com/oidc/callback` as the redirect URI at your identity provider, replacing the origin with your public app URL.

```dotenv
ANIWORLD_WEB_BASE_URL=https://aniworld.example.com
ANIWORLD_OIDC_ISSUER_URL=https://login.example.com/realms/main
ANIWORLD_OIDC_CLIENT_ID=aniworld
ANIWORLD_OIDC_CLIENT_SECRET=secret
ANIWORLD_OIDC_DISPLAY_NAME=SSO
ANIWORLD_OIDC_ADMIN_SUBJECT=
```

`ANIWORLD_OIDC_ADMIN_SUBJECT` is the preferred way to promote one SSO user to administrator. The older `ANIWORLD_OIDC_ADMIN_USER` setting is also supported.

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
