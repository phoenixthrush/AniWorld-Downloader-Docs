# Auto-Sync and Discord

These features run alongside the Web UI server. Keep the server running for scheduled checks or Discord requests to be processed.

## Auto-Sync

Auto-Sync checks **AniWorld's new-episode feed** for titles already present in your download library. It is not a general subscription service for every supported site, and you do not create a separate job for each series.

1. Download a series into a configured library location.
2. Enable Auto-Sync in Settings.
3. Choose an interval or fixed schedule.
4. Open Auto-Sync to inspect its status, exclusions, and run a manual check.

The library acts as the list of followed titles. When a feed entry matches a title on disk, the default behavior queues its missing episodes. Enable **only new episodes** if you want to keep deliberate gaps: that mode limits the work to episodes announced in the feed.

Exclude a series when you want to keep it in your library without having Auto-Sync update it. Exclusions are saved in the database.

### Interval schedule

```dotenv
ANIWORLD_ENABLE_AUTOSYNC=1
ANIWORLD_AUTOSYNC_MODE=interval
ANIWORLD_AUTOSYNC_INTERVAL=24h
ANIWORLD_AUTOSYNC_NEW_ONLY=0
```

Intervals accept values such as `6h`, `90m`, or `1h30m`. A bare number means hours.

### Fixed schedule

```dotenv
ANIWORLD_ENABLE_AUTOSYNC=1
ANIWORLD_AUTOSYNC_MODE=cron
ANIWORLD_AUTOSYNC_CRON="0 3 * * *"
```

This example runs at 03:00 in the server's local timezone. The settings editor also accepts supported phrases such as `every monday, friday at 10pm` and previews the resulting schedule. For Docker, check the container's timezone rather than assuming it matches the host.

Settings changed in the browser apply to the running process. Save the environment values to keep the feature and its schedule enabled after a restart. There are no current `ANIWORLD_SYNC_SCHEDULE`, `ANIWORLD_SYNC_LANGUAGE`, or `ANIWORLD_SYNC_PROVIDER` settings.

## Discord request bot

Install the optional dependency for a Python installation:

```bash
python -m pip install "aniworld[discord]"
```

The Docker image includes it. Configure the bot under Settings with its token and your Discord user ID, enable it, and check the reported connection status.

Users can search for movies or series and select a result. In **standard** mode, requests go to the owner for approval. In **advanced** mode, selections are queued directly.

| Setting | Purpose |
| --- | --- |
| `ANIWORLD_DISCORD_BOT_ENABLED` | `1` enables the bot; default `0` |
| `ANIWORLD_DISCORD_TOKEN` | Bot token |
| `ANIWORLD_DISCORD_OWNER_ID` | Discord user ID for request approvals |
| `ANIWORLD_DISCORD_MODE` | `standard` or `advanced` |
| `ANIWORLD_DISCORD_REQUEST_ROLE_ID` | Restrict requests to a role; empty allows everyone |
| `ANIWORLD_DISCORD_GUILD_ID` | Register commands in one server for quicker availability; empty registers globally |
| `ANIWORLD_DISCORD_LANGUAGE` | Bot language: `en` or `de` |
| `ANIWORLD_DISCORD_ANNOUNCE_CHANNEL_ID` | Optional channel for completed-download announcements |

Unlike most Web UI settings, bot settings saved in the browser are written to `.env`. Preserve the app data directory in Docker. Explicit container environment values still take precedence at startup.

The bot needs to be added to your Discord server with application-command support and permissions for the interactions and channels you use. If approvals fail, check that the owner can receive its direct messages. Do not post the bot token in issues or logs.
