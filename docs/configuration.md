# Configuration

AniWorld Downloader stores its configuration in one `.env` file:

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

::: tip Web UI settings
Users, custom paths, queued downloads, and Auto-Sync jobs are saved permanently. Most other changes made on the Settings page last only until the app restarts. Put those values in `.env` to keep them.
:::

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
| `ANIWORLD_VIDEO_CODEC` | `copy` | `copy`, `h264`, `h265`, or `av1` |
| `ANIWORLD_HLS_CONCURRENCY` | `8` | Parallel HLS segments, from `1` to `32` |
| `ANIWORLD_DEBUG_MODE` | `0` | Enable detailed logging |

Boolean values use `1` for on and `0` for off.

## File names

The default naming template is:

```dotenv
ANIWORLD_NAMING_TEMPLATE="{title} ({year}) [imdbid-{imdbid}]/Season {season}/{title} S{season}E{episode}.mkv"
```

Available placeholders are `{title}`, `{year}`, `{imdbid}`, `{season}`, `{episode}`, and `{language}`. Older `%title%` style placeholders are supported too. The file extension controls the output container.

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

Kinox and BurningSeries are off by default because their availability and captcha requirements vary by region.

## Auto-Sync defaults

```dotenv
ANIWORLD_SYNC_SCHEDULE=0
ANIWORLD_SYNC_LANGUAGE="German Dub"
ANIWORLD_SYNC_PROVIDER=VOE
```

Schedules can be `0`, `1min`, `30min`, `1h`, `2h`, `4h`, `8h`, `12h`, `16h`, or `24h`. These values become the defaults for new jobs.

## Web authentication

Local authentication can be enabled with `aniworld -w -wA`. To create the first administrator without opening the setup page:

```dotenv
ANIWORLD_WEB_ADMIN_USER=admin
ANIWORLD_WEB_ADMIN_PASS=change-this-password
```

When running through Docker, authentication modes can also be set through `ANIWORLD_WEB_AUTH`, `ANIWORLD_WEB_SSO`, and `ANIWORLD_WEB_FORCE_SSO`.

### OIDC single sign-on

Use `aniworld -w -wS` to offer SSO beside local accounts, or `aniworld -w -wFS` for SSO only.

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
| `ANIWORLD_DISCORD_MODE` | `standard` or `advanced` command set |
| `ANIWORLD_DISCORD_REQUEST_ROLE_ID` | Role allowed to create requests |
| `ANIWORLD_DISCORD_GUILD_ID` | Guild used for command registration |
| `ANIWORLD_DISCORD_LANGUAGE` | Bot response language |
| `ANIWORLD_DISCORD_ANNOUNCE_CHANNEL_ID` | Channel for announcements |

The Settings page is the easiest place to configure these values.

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
