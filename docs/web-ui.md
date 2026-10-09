# Web UI

Start it with:

```bash
aniworld -w
```

The default address is `http://localhost:8080`.

## Everyday workflow

1. Pick a site at the top of the Home page.
2. Search or choose a title from the browse sections.
3. Pick a download folder and episodes, plus a language/provider when the site offers a choice.
4. Add the selection to the queue.
5. Open **Queue** to watch progress, reorder items, retry failures, or cancel work.

The remaining pages are intentionally simple:

| Page | What it does |
| --- | --- |
| Library | Shows downloaded folders and lets admins remove files |
| Auto-Sync | Checks AniWorld’s new-episode feed for titles already in your library |
| Settings | Controls paths, defaults, users, interface options, and the Discord bot |

Queue items are processed one at a time. A batch is marked **completed** if at least one episode succeeds, even when others fail; inspect its errors before treating it as fully downloaded. Retry is available for failed/cancelled batches, so failed episodes inside a completed batch must be submitted again. Clearing finished entries also removes failed and cancelled records.

Normal cancellation waits for the current episode. Force cancellation can interrupt the active FFmpeg process; direct HTTP, parallel HLS, and manga downloads may continue until their current operation finishes.

The Library view scans title folders for video files and episode markers. Loose videos at the download root are not listed, and manga images/CBZ/EPUB files do not have a reader or chapter listing. Naming patterns without recognized episode markers can make a series appear as a movie. Two-digit episode markers such as `S01E01` are recognized, but individual episode deletion currently expects three digits (`S01E001`).

For manga output formats and page selection, see [manga usage](./usage#mangafire-downloads).

## Custom download paths

Admins can add named folders in **Settings > Custom Paths**. A path can also be the default for selected sites. The process must be able to write there or create the folder beneath a writable parent. Saving a custom path does not check filesystem permissions.

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

If no admin exists, the first visit asks you to create one. Admins can add users and assign roles from Settings. Setup and local account forms require passwords of at least eight characters. Failed local logins are limited to five per username or ten per client IP within fifteen minutes; a blocked attempt returns `429` with `Retry-After`. These counters reset when the server restarts.

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

Use `--web-force-sso` for SSO-only login. SSO alone does not enable login protection; keep `--web-auth` when offering both methods. The required environment variables and admin-bootstrap behavior are listed under [Web authentication](./configuration#web-authentication).

## Captchas

When a running queue item needs a captcha, click its CAPTCHA action to open the browser screenshot. Click the image to interact with the challenge, including widgets inside iframes. Click positions are scaled to the browser screenshot's size. The viewer closes when the attempt finishes, including on timeout or failure. Checkbox challenges are tried automatically by default, while image challenges need your input.

Set `ANIWORLD_CAPTCHA_MANUAL=1` to handle widgets yourself. The browser stays off-screen in the normal Web UI flow, and screenshots remain available even with `ANIWORLD_CAPTCHA_VISIBLE=0`. See [CAPTCHA configuration](./configuration#captcha-solving) for visibility, timeout and debug logging options.

Kinox may require opening the title page and solving its challenge manually before retrying.

## Settings and persistence

Most general settings changed in the Web UI last until the process restarts. Put values in `~/.aniworld/.env` when they must survive restarts. Custom paths, users, API keys, queue data, and Auto-Sync exclusions are stored in the Web UI database. Themes and Discord bot settings also persist. See [Configuration](./configuration#what-survives-a-restart) for the distinction and the settings export option.

## Automation and integrations

- [Auto-Sync and Discord](./automation) explains scheduling, library matching, exclusions, and request approvals.
- [HTTP API](./http-api) covers scoped keys and queue automation.
- [Themes and Appearance](./theming) covers CSS, imports, background shaders, and recovery.

The current app has no separate Planned page. Browse rows for new titles are discovery lists, not persistent release subscriptions.

## Sites and languages

Enable or disable site tabs in Settings. Disabled-by-default sources and current status notes are listed under [Supported Sites](./supported-sites). The download dialog normally restricts languages using the first episode's provider data. Enable **Always offer every language** (`ANIWORLD_SHOW_ALL_LANGUAGES=1`) when later episodes offer another language. This keeps all presets for the selected site available, subject to the English Sub restriction; it does not add a missing stream or switch languages automatically. HentaiTV/HentaiHaven retain their fixed preset.

Genre browsing is available for AniWorld, SerienStream, BurningSeries, MegaKino, Kinox, FilmPalast, Filmo, Hanime, MangaFire, and Moflix. Genre names come from each site's current listing. Additional filters such as production years and sorting remain available through [Python search functions](./genre-search).

Hanime (`hanime.tv`) has a Web UI tab with keyword search and genre browsing. It is disabled by default; enable it in Settings or with `ANIWORLD_ENABLE_HTV=1`. HentaiTV (`hentai.tv`) and HentaiHaven (`hentaihaven.xxx`) also have optional keyword-search and download tabs: set `ANIWORLD_ENABLE_HENTAITV=1` or `ANIWORLD_ENABLE_HENTAIHAVEN=1`. Their UI uses a fixed `English Sub` preset and the matching site provider; they have no genre listing or homepage browse rows. Subtitle availability still depends on the stream. AnimeIDHentai remains CLI/Python only.
