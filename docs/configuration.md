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

**Settings → Administration → Export settings** downloads the current configuration as an `.env` file. Secrets such as the Discord token, OIDC secret, and administrator password are omitted; keep those values when merging the export into your existing configuration.

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
| `MANGAFIRE_FORMAT` | `jpg` | Chapter images (`jpg`) or comic archive (`cbz`) |
| `ANIWORLD_NO_AUTO_INSTALL` | `0` | Disable automatic dependency downloads and installation |
| `ANIWORLD_HLS_CONCURRENCY` | `8` | Parallel HLS segments, from `1` to `32` |
| `ANIWORLD_DEBUG_MODE` | `0` | Enable detailed logging |

Boolean values use `1` for on and `0` for off.

## File names

The default naming template is:

```dotenv
ANIWORLD_NAMING_TEMPLATE="{title} ({year}) [imdbid-{imdbid}]/Season {season}/{title} S{season}E{episode}.mkv"
```

Available placeholders are `{title}`, `{year}`, `{imdbid}`, `{season}`, `{episode}`, and `{language}`. Older `%title%` style placeholders are supported too. The file extension controls the output container. The Web UI's MKV/MP4 setting changes that extension in the running naming template; persist the template to keep it across restarts.

`copy` avoids re-encoding. Software codec choices include `h264`, `h265`, and `av1`; hardware options include `h264_nvenc`, `hevc_nvenc`, `h264_amf`, `hevc_amf`, `av1_amf`, `h264_qsv`, `hevc_qsv`, and `av1_qsv`. These require a compatible FFmpeg build and, for hardware encoding, the corresponding device and drivers.

Model-specific naming can differ, particularly for manga and movies. Use **Settings → path preview** or the Python model's path attributes to inspect the result before a large batch.

## Sources and playback

| Setting | Default | Purpose |
| --- | --- | --- |
| `ANIWORLD_RANDOM_ANIME` | `0` | Choose a random anime |
| `ANIWORLD_USE_STO_SEARCH` | `0` | Prefer SerienStream for interactive search |
| `ANIWORLD_ANISKIP` | `0` | Skip intros and outros when timing data exists |
| `ANIWORLD_KEEP_WATCHING` | `0` | Continue playback after an episode |
| `ANIWORLD_ENABLE_HTV` | `0` | Enable Hanime support |
| `ANIWORLD_ENABLE_KINOX` | `0` | Enable Kinox support |
| `ANIWORLD_ENABLE_BURNINGSERIES` | `0` | Enable BurningSeries support |
| `ANIWORLD_USE_IINA` | `1` | Use IINA for Syncplay on macOS; use `0` for mpv |

Site toggles control Web UI visibility. See [Supported Sites](./supported-sites) for every toggle and disabled default. They are not a guarantee that a backend works, and do not remove it from the Python package.

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

## Captcha controls

The built-in browser solver works without extra configuration on most systems. These options are mainly for debugging difficult Cloudflare pages.

::: details Advanced captcha settings
| Setting | Purpose |
| --- | --- |
| `ANIWORLD_CAPTCHA_MANUAL` | Require your own click instead of automatic solving |
| `ANIWORLD_CAPTCHA_VISIBLE` | Keep the solving window visible |
| `ANIWORLD_CAPTCHA_TIMEOUT` | Override the solve timeout in seconds |
| `ANIWORLD_NO_ADBLOCK` | Disable the solver's network blocker |
| `ANIWORLD_CAPTCHA_DEBUG_LOG` | Add browser errors to the app log |
| `ANIWORLD_CAPTCHA_NO_ADTAB_GUARD` | Keep popup ad tabs open |
| `ANIWORLD_CAPTCHA_NO_OVERLAY_REMOVAL` | Keep full-page ad overlays |
| `ANIWORLD_CAPTCHA_NO_UA_SYNC` | Do not copy the browser user agent to HTTP requests |
| `ANIWORLD_SPOOF_WEBGL` | Mask software rendering on GPU-less systems |
| `ANIWORLD_PERSISTENT_PROFILE` | Reuse a browser profile outside Docker |
| `ANIWORLD_NO_PERSISTENT_PROFILE` | Use a fresh profile inside Docker |
| `ANIWORLD_BROWSER_PROFILE` | Custom persistent profile directory |
| `ANIWORLD_DOCKER` | Force Docker-specific browser behavior |
:::

The complete reference is also available in the project's [`.env.example`](https://github.com/phoenixthrush/AniWorld-Downloader/blob/models/src/aniworld/.env.example).
