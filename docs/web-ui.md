# Web UI

Start it with:

```bash
aniworld -w
```

The default address is `http://localhost:8080`.

## Everyday workflow

1. Pick a site at the top of the Home page.
2. Search or choose a title from the browse sections.
3. Pick a language, provider, download folder, and episodes.
4. Add the selection to the queue.
5. Open **Queue** to watch progress, reorder items, retry failures, or cancel work.

The remaining pages are intentionally simple:

| Page | What it does |
| --- | --- |
| Library | Shows downloaded folders and lets admins remove files |
| Auto-Sync | Checks followed series for new episodes on a schedule |
| Planned | Watches for unreleased titles and queues them once found |
| Settings | Controls paths, defaults, users, interface options, and the Discord bot |

## Custom download paths

Admins can add named folders in **Settings > Custom Paths**. A path can also be the default for selected sites. The folder must already be writable by the AniWorld Downloader process.

## Open it on your network

```bash
aniworld -w --web-expose
```

This binds to `0.0.0.0`. Other devices can connect through the computer's local IP and port `8080`.

::: warning Add authentication
Do not expose an unauthenticated Web UI to the internet. Use local auth or OIDC behind HTTPS.
:::

### Local accounts

```bash
aniworld -w --web-expose --web-auth
```

The first visit asks you to create an admin. Admins can add users and assign roles from Settings.

For unattended setup, define both values before the first start:

```dotenv
ANIWORLD_WEB_ADMIN_USER=admin
ANIWORLD_WEB_ADMIN_PASS=replace-this-password
```

### OIDC SSO

Install the optional dependency, set the OIDC values, then enable SSO:

```bash
python -m pip install "aniworld[sso]"
aniworld -w --web-auth --web-sso
```

Use `--web-force-sso` for SSO-only login. The required environment variables are listed under [Web authentication](./configuration#web-authentication).

## Captchas

When a queued item needs a captcha, the queue shows an action for it. Some challenges can be handled inside the Web UI. Kinox may require opening the title page and solving its challenge manually before retrying.

## Settings and persistence

Most general settings changed in the Web UI last until the process restarts. Put values in `~/.aniworld/.env` when they must survive restarts. Custom paths, users, queue data, and scheduled jobs are stored in the Web UI database.
