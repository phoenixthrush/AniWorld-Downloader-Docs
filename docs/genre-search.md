# Genre Search in Python

Genre filters are optional backend arguments, and support differs by source. The Web UI and [HTTP API](./http-api#search) also expose genre browsing for the nine sites below. Additional filters and sorting described here are Python options. The repository's [genre examples](https://github.com/phoenixthrush/AniWorld-Downloader/tree/models/examples) show each site's result fields and sample options.

## Result limits

All genre result functions accept `limit`:

- A non-negative integer caps the number returned.
- `0` returns no results without fetching.
- `None` removes the extra cap, within the backend's normal page or listing scope.
- Negative numbers, booleans, and other types raise `ValueError`.

Most functions default to `None`; Hanime defaults to `24` and MangaFire to `20`. A limit does not guarantee that many results exist, and it does not turn a first-page scraper into a complete catalogue crawler.

## Runtime genre values

There is no fixed genre allowlist shared by the sites. Depending on the backend, the app reads tags from a live page/API or sends your slug or ID to the site. Example comments marked **09/2026 as of right now** are snapshots, not validation rules.

Discovery helpers are available for all nine sites in the table: `fetch_genres`, `fetch_s_to_genres`, `fetch_burningseries_genres`, `fetch_kinox_genres`, `fetch_filmpalast_genres`, `fetch_megakino_genres`, and `fetch_filmo_genres` in `aniworld.search`, plus `fetch_hanime_genres` and `fetch_mangafire_genres` in their backend modules. BurningSeries reads its runtime index, which is cached for the process lifetime. Other browse data may also be cached, so runtime discovery does not mean every call downloads a fresh list.

An unavailable genre may raise an HTTP error or `ValueError`, depending on the backend. A site that returns a successful empty page can produce an empty result instead. Handle those outcomes in your application.

## Functions and scope

| Site | Function | Genre and other filters | Scope with `limit=None` |
| --- | --- | --- | --- |
| AniWorld | `fetch_genre_animes` | `slug`, `page` | One page, with `has_more` |
| SerienStream | `query_s_to` | `genre`, `fsk`, `prod_start`, `prod_end`, `sort` | Follows genre result pages |
| BurningSeries | `query_burningseries` | `genre`, optional keyword | Matching entries in the cached index |
| Kinox | `query_kinox` | `genre` | Genre Top 100 |
| FilmPalast | `query_filmpalast` | `genre` | First genre page |
| MegaKino | `query_megakino` | `genre` | First genre page |
| Filmo | `query_filmo` | `genre_id`, `year`, `runtime_min`, `runtime_max`, `country`, `sort` | Follows browse result pages |
| Hanime | `search_hanime` | `genre`, `sort`, optional keyword | First genre page |
| MangaFire | `search_series` | `genre`, `sort`, optional keyword | Follows result pages |

The first seven functions are in `aniworld.search`. Hanime uses `aniworld.extractors.provider.hanime_tv`; MangaFire uses `aniworld.models.mangafire_to.series`. Moflix does not currently have a matching genre-filter function.

## AniWorld

```python
from aniworld.search import fetch_genres, fetch_genre_animes

print(fetch_genres())
page = fetch_genre_animes("action", page=1, limit=10)
print(page["results"])
print(page["has_more"])
```

The limit only caps that page's returned results. `has_more` describes the site's next page, not whether the limit hid more entries on the current one.

## SerienStream

```python
from aniworld.search import query_s_to

results = query_s_to(
    genre="horror",
    fsk=18,
    prod_start=2000,
    sort="ratings_desc",
    limit=10,
)
for item in results:
    print(item["title"], item["link"])
```

Omit optional filters or pass `None` / `""`. `prod_start` and `prod_end` bound the production years. Sort values documented in the 09/2026 example are `name_asc`, `name_desc`, `latest`, `release`, and `ratings_desc`. Keyword search cannot be combined with genre filters.

## FilmPalast and MegaKino

Discover labels and slugs rather than assuming their spelling:

```python
from aniworld.search import fetch_filmpalast_genres, query_filmpalast

genres = fetch_filmpalast_genres()
if genres:
    results = query_filmpalast(genre=genres[0]["slug"], limit=10)
    for item in results:
        print(item["title"], item["url"])
```

MegaKino follows the same pattern with `fetch_megakino_genres` and `query_megakino`. Both return genre entries with `name` and `slug`. These queries read the first genre results page and do not combine a keyword with a genre.

## BurningSeries and Kinox

```python
from aniworld.search import query_burningseries, query_kinox

matches = query_burningseries("star", genre="Science-Fiction", limit=10)
top = query_kinox(genre="Action", limit=10)
```

Use `fetch_burningseries_genres()` for genre names from BurningSeries's current `/andere-serien` index. Matching is case-insensitive; a keyword can narrow that group. `fetch_kinox_genres()` returns Kinox's current genre names and slugs. Kinox takes a slug and returns its Top 100 in site order. It does not combine genre and keyword search. Captcha requirements can still prevent subsequent playback or downloads.

## Filmo

```python
from aniworld.search import query_filmo

results = query_filmo(
    genre_id=11,
    year=2020,
    runtime_min=90,
    runtime_max=120,
    country="DE",
    sort="rating_desc",
    limit=10,
)
```

`fetch_filmo_genres()` returns genre entries with `name` and `slug`; the slug is the numeric ID accepted by `genre_id`. `11` is Horror in the 09/2026 example. Runtime bounds are minutes and country values use the site's two-letter codes. Filters may be omitted or set to `None` / `""`. Keyword search cannot be combined with browse filters.

The example documents `title_asc`, `title_desc`, `release_desc`, `release_asc`, `rating_desc`, and `rating_asc`. Check the current site when its choices change; the backend does not maintain a fixed option allowlist.

## Hanime

```python
from aniworld.extractors.provider.hanime_tv import fetch_hanime_genres, search_hanime

print(fetch_hanime_genres())
results = search_hanime(genre="fantasy", sort="views_desc", limit=10)
for item in results:
    print(item["name"], item["slug"])
```

Sorting requires a genre. The 09/2026 example lists `created_at_asc`, `released_at_desc`, `released_at_asc`, `views_desc`, `views_asc`, `likes_desc`, `name_asc`, and `name_desc`. Omit `sort` for recent uploads. A keyword filters the cards on the fetched genre page; it does not search every page of that genre.

## MangaFire

```python
from aniworld.models.mangafire_to.series import fetch_mangafire_genres, search_series

genres = fetch_mangafire_genres()
results = search_series("dragon", genre="Fantasy", sort="score:desc", limit=10)
for item in results:
    print(item["title"], item["url"])
```

Use a current genre name or an ID from `fetch_mangafire_genres()`. The backend resolves it against live filter options. Sorting uses `field:direction`, such as `title:asc`, `score:desc`, or `chapter_updated_at:desc`. Returned URLs can be relative; join them to `https://mangafire.to` if needed.
