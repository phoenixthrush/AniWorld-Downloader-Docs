# HTTP API

The Web UI exposes JSON endpoints for search, title metadata, downloads, the queue, library, and settings. Use API keys for scripts and integrations. The routes are not versioned; check **Settings → API Keys → Endpoints and examples** against the app version you run.

For direct use inside Python, see the [Python API](./python-api).

## Create and use a key

Open **Settings → API Keys**, create a key with the permissions your integration needs, and copy it when shown. The app stores a hash, so the original key cannot be retrieved later.

```bash
curl -H "X-API-Key: YOUR_API_KEY" http://localhost:8080/api/queue
```

`Authorization: Bearer YOUR_API_KEY` also works. Keys authenticate `/api/` requests; they do not provide a browser login. Enabling keys does not itself enable login protection for the whole instance: configure [authentication](./web-ui#local-accounts) too if other people can reach it.

| Scope | API value | Access |
| --- | --- | --- |
| Read | `read` | Non-admin read endpoints and search |
| Read and download | `write` | Also queue downloads, cancel, retry, and reorder |
| Full access | `admin` | Also settings, Auto-Sync administration, custom paths, and library deletion |

Even a full-access key cannot list, create, or revoke API keys. Manage keys through Settings. Send JSON request bodies with `Content-Type: application/json`.

## Search

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"example","site":"aniworld"}' \
  http://localhost:8080/api/search
```

The response has a `results` list with title, URL, and poster information. Site keys include `aniworld`, `sto`, `megakino`, `moflix`, `filmo`, `filmpalast`, `mangafire`, `htv`, `hentaitv`, `hentaihaven`, `kinox`, and `burningseries`. An implemented backend does not guarantee a currently working source; check the [supported sites](./supported-sites).

Genre browsing uses `GET /api/genres?site=SITE` to list `{name, slug}` entries and `GET /api/genre?site=SITE&slug=SLUG&page=1` to return `results` and `has_more`. Both default to `site=aniworld`. Supported site keys are `aniworld`, `sto`, `burningseries`, `megakino`, `kinox`, `filmpalast`, `filmo`, `htv`, `mangafire`, and `moflix`. Filmo and MangaFire use numeric genre IDs as their slugs.

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "http://localhost:8080/api/genres?site=filmpalast"

curl -H "X-API-Key: YOUR_API_KEY" --get \
  --data-urlencode "site=filmpalast" \
  --data-urlencode "slug=action" \
  --data-urlencode "page=1" \
  http://localhost:8080/api/genre
```

Use a slug returned by the genre list. Each page contains up to 30 results. AniWorld follows the site's pages; other backends are sliced into pages within their available listing scope. Moflix uses a single recommendation response whose size is controlled by the source API. See [Genre Search](./genre-search) for those limits and additional Python filters.

HentaiTV and HentaiHaven support keyword search through `hentaitv` and `hentaihaven`, but are not in the genre registry. AnimeIDHentai is available through CLI/Python only. Unknown keyword-search site keys and caught upstream failures currently return an empty `results` list rather than a distinct error.

## Queue a download

Use actual URLs returned by the site's episode lookup. This example contains placeholders:

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Example","series_url":"SERIES_URL","episodes":["EPISODE_URL"],"language":"German Dub","provider":"VOE"}' \
  http://localhost:8080/api/download
```

The response contains `queue_id`; completion is asynchronous. An optional `custom_path_id` selects a configured download location. For MangaFire, use provider `MangaFire` and `mangafire_format` set to `jpg`, `cbz`, or `epub`; to limit pages within a chapter or volume, send an episode object such as `{"url":"CHAPTER_OR_VOLUME_URL","selected_pages":[1,2]}` in the `episodes` list. HentaiTV and HentaiHaven use language `English Sub` and providers `HentaiTV` and `HentaiHaven`, respectively. Submission validates only part of the payload; acceptance does not establish that each URL, language, provider, or path will work.

For manga, `/api/seasons?url=TITLE_URL&mangafire_format=cbz` (or `epub`) lists available English volumes with chapter fallback; entries include `is_volume`. `/api/episodes?url=UNIT_URL&series_url=TITLE_URL` lists their pages. Queue the returned chapter or volume URL with optional 1-based `selected_pages`; explicit chapter URLs stay chapter downloads. EPUB requires the [optional extra](./quick-start#optional-features).

## Read and filter the queue

Without parameters, `GET /api/queue` returns the full `items` list, including episode lists, plus `ffmpeg_progress`.

Supplying any of the following parameters switches to a paginated response:

| Parameter | Default | Meaning |
| --- | --- | --- |
| `limit` | `25` | Positive number of queue items per page; rows are capped at 200 |
| `offset` | `0` | Number of matching items to skip |
| `status` | All | `queued`, `running`, `completed`, `failed`, `cancelled`, `active`, or `finished` |
| `q` | Empty | Search queue titles |
| `sort` | `smart` | `smart`, `newest`, `oldest`, or `title` |

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "http://localhost:8080/api/queue?status=failed&limit=25&offset=0&sort=newest"
```

Paged responses include `items`, `total`, `limit`, `offset`, `counts`, and `ffmpeg_progress`. They omit each item's `episodes` list. Fetch the unpaged queue when you need those lists. `/api/queue/counts` returns counts without loading all items.

## Common endpoints

All paths below start with `/api`.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/search` | Search a site's catalogue |
| `GET` | `/series`, `/seasons`, `/episodes`, `/providers` | Read title and provider metadata |
| `POST` | `/download` | Add a download to the queue |
| `GET` | `/queue`, `/queue/counts` | Read queue state |
| `POST` | `/queue/{id}/cancel` | Request cancellation |
| `POST` | `/queue/{id}/force-cancel` | Request a force stop; supported download paths can interrupt FFmpeg |
| `POST` | `/queue/{id}/retry` | Retry a failed or cancelled item |
| `POST` | `/queue/{id}/move` | Reorder an item with a `direction` value |
| `DELETE` | `/queue/{id}` | Remove an eligible queue item |
| `DELETE` | `/queue/completed` | Clear all finished entries: completed, failed, and cancelled |
| `GET` | `/library/locations`, `/library/titles`, `/library/title` | Browse downloaded video folders |
| `POST` | `/library/delete` | Delete a library title, season, or episode; full access required |
| `GET`, `PUT` | `/settings` | Read or change settings; full access required |
| `GET` | `/settings/env` | Export settings; full access required |
| `GET` | `/autosync/status` | Read Auto-Sync state; full access required |
| `POST` | `/autosync/run` | Start a sync cycle; full access required |

Use the in-app endpoint examples for required fields and additional routes. Library and Auto-Sync routes may return `404` when those features are disabled.

## Handle errors

Check the HTTP status before reading a success payload. Common responses are `400` for invalid inputs, `401` for invalid or expired keys, and `403` for insufficient permissions. Some operations return `409` when work is already running. Error responses commonly contain an `error` string.

Nonempty JSON mutation bodies sent with the wrong content type return `415`. Some malformed download requests are accepted and fail later in the queue; search can return an empty list on an upstream failure.

Polling the queue is appropriate for download progress. A `completed` batch may still contain episode failures; inspect its errors. See [Web UI queue behavior](./web-ui#everyday-workflow) for cancellation and retry limits. Avoid blindly retrying download submissions: a request can have queued work even if your client lost the response.
