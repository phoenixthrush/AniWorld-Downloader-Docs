# Python API

AniWorld Downloader can also be used as a Python package. The public model classes expose site metadata and supported actions. Video models offer download, watch, and Syncplay actions; manga models provide downloads, with attributes and method signatures that differ by backend.

```bash
python -m pip install -U aniworld
```

## Series, seasons, and episodes

```python
from aniworld import AniworldSeries

series = AniworldSeries("https://aniworld.to/anime/stream/highschool-dxd")

print(series.title)
print(series.description)
print(series.seasons)

# series.download()
# series.watch()
# series.syncplay()
```

Use the matching model when you already have a season or episode URL:

```python
from aniworld import AniworldEpisode, AniworldSeason

season = AniworldSeason("https://aniworld.to/anime/stream/highschool-dxd/staffel-1")
print(season.episode_count)

episode = AniworldEpisode(
    "https://aniworld.to/anime/stream/highschool-dxd/staffel-1/episode-1"
)
print(episode.title_de, episode.title_en)
print(episode.selected_language, episode.selected_provider)

episode.download()
```

An episode also exposes `provider_data`, `stream_url`, `is_downloaded`, and its related `series` and `season` objects. Network-backed properties can raise an exception when a source or host is unavailable, so handle failures in long-running integrations.

For AniWorld episodes, `is_downloaded` is a probe-result dictionary with fields such as `exists`, `audio_langs`, and `video_langs`, rather than a boolean. Use the fields relevant to your integration. Series/season batch methods can log individual episode failures and continue without raising or returning an aggregate result. When you need reliable per-episode outcomes, iterate the episodes and handle each action's exception yourself.

For custom player launches, `aniworld.aniskip.build_mpv_flags(skip_data)` returns a list of arguments, or an empty list when no skip times were found. Extend your player's argument list directly; do not split or shell-quote those arguments. Watch and Syncplay use this list so temporary chapter paths containing spaces remain intact.

## Other sources

All public site model classes are available from either `aniworld` or `aniworld.models`:

```python
from aniworld import (
    AniworldSeries,
    HanimeTVEpisode,
    SerienstreamSeries,
)
```

Other exports include `MegaKinoEpisode`, `FilmoEpisode`, `FilmPalastEpisode`, `MoflixEpisode`, `MangaFireToSeries`, `KinoxSeries`, `BurningSeriesSeries`, `HentaiTVEpisode`, `AnimeIDHentaiEpisode`, `HentaiHavenSeries`, and `HentaiHavenEpisode`. Movie-oriented backends may use an `Episode` class for a whole movie.

```python
from aniworld import MegaKinoEpisode

movie = MegaKinoEpisode("https://megakino.example/films/example.html")
print(movie.title, movie.release_year)
# movie.download()
```

Use a current URL from the source site in real code. Domains and page formats can change independently of the package.

To use the CLI's URL detection and normalization from Python, call `model_for_url`:

```python
from aniworld.entry import model_for_url

series = model_for_url("https://serienstream.to/serie/stream/example")
# Replace example with a current series slug before loading metadata or downloading.
```

The dispatcher normalizes aliases before matching a model and passes that normalized URL to its constructor. Direct model constructors retain their backend-specific URL requirements.

Moflix season episode lists follow API pagination, remove duplicate episode numbers, and return episodes in numeric order. Invalid episode data, repeated pages, and pagination exceeding 100 pages raise errors. Genre recommendation browsing retains its separate [12-title limit](./genre-search#moflix).

## MangaFire downloads

```python
from aniworld import MangaFireToSeries

series = MangaFireToSeries("https://mangafire.to/title/z9w-velvet-kisss")
series.download(format="epub")  # Requires aniworld[epub]; also accepts jpg or cbz.
```

Archives prefer available English volumes, with chapter fallback. `series.volumes` lists source volumes; `series.download(chapters=series.preferred_chapters, format="cbz")` explicitly requests chapters. `MangaFireToChapter` accepts chapter or volume URLs, `format`, and optional 1-based `selected_pages`. An individual download returns its folder or archive path; a series download returns the title folder. See [manga usage](./usage#mangafire-downloads).

For example, download selected pages from an actual chapter or volume URL:

```python
from aniworld import MangaFireToChapter

chapter = MangaFireToChapter(
    "CHAPTER_OR_VOLUME_URL",
    selected_pages=[1, 2],
    format="cbz",
)
# chapter.download()
```

Replace the URL placeholder before running. Use `selected_path` on a chapter or `download(folder=...)` to choose a destination; `MangaFireToSeries` itself does not accept `selected_path`.

A chapter's `selected_path` also applies to `chapter.pages[n].download()` when no folder is supplied. Standalone chapters and pages use the parent manga title for their top-level folder, including CBZ/EPUB output; EPUB book metadata uses that title too. Explicit `folder` destinations remain direct paths rather than roots to which the manga title is appended. Previously misplaced files are not moved automatically.

Title and chapter URLs accept both ID-only and ID-with-slug forms. Chapter lookup matches the title ID and numeric chapter number, so an optional title slug, trailing slash, or equivalent number such as `1` and `1.0` does not change the identity. Objects returned by `series.chapters` or `series.preferred_chapters` already carry their parent and chapter ID. Volume URLs encode their ID directly. A chapter that cannot be matched raises an error when its pages are requested rather than requesting chapter ID zero.

## Adult-site backends

Hanime provides keyword search through `query_hanime`, which defaults to `limit=24`. Results contain `name`, `slug`, `cover_url`, `poster_url`, and `tags`; build a video URL from the slug. Use `HanimeTVEpisode` to download one video, or `HanimeTVSeries` to process its franchise.

```python
from aniworld import HanimeTVEpisode
from aniworld.search import query_hanime

for item in query_hanime("Reika", limit=10):
    print(item["name"], "https://hanime.tv/videos/hentai/" + item["slug"])

episode = HanimeTVEpisode(
    "https://hanime.tv/videos/hentai/reika-wa-karei-na-boku-no-joou-4"
)
# episode.download()
```

Hanime's episode model defaults to `Japanese` and the `HanimeTV` provider. Genre filters and sorting are covered in [Hanime genre search](./genre-search#hanime).

For HentaiTV, AnimeIDHentai, and HentaiHaven, keyword search functions return dictionaries with `title`, `url`, `link`, and `poster`. HentaiTV and AnimeIDHentai return episode URLs; HentaiHaven returns title URLs.

```python
from aniworld import AnimeIDHentaiEpisode, HentaiHavenSeries, HentaiTVEpisode
from aniworld.search import query_animeidhentai, query_hentaihaven, query_hentai_tv

matches = query_animeidhentai("Inaka ni wa Kore kurai", limit=10)
for item in matches:
    print(item["title"], item["url"])

# query_hentai_tv("Hamehara", limit=10)
# query_hentaihaven("Ane wa Yanmama", limit=10)

episode = AnimeIDHentaiEpisode(
    "https://animeidhentai.com/inaka-ni-wa-kore-kurai-shika-goraku-ga-nai-episode-1"
)
print(episode.title_en, episode.provider_data)
# episode.download()

series = HentaiHavenSeries("https://hentaihaven.xxx/watch/ane-wa-yanmama-junyuu-chuu/")
# series.download()
```

These three searches default to `limit=30`. `limit=0` or an empty keyword returns no results without fetching. `limit=None` uses the backend's available search scope rather than promising a full catalogue. Their episode models default to `English Sub`. HentaiTV and AnimeIDHentai do not fetch separate subtitle files. HentaiHaven adds an English WebVTT track to MKV/MP4 files that lack an English subtitle track when its master playlist offers one; missing tracks and processing failures do not prevent the video download. Repeating the download retries missing subtitles without downloading the video again or duplicating an existing English track. HentaiTV and HentaiHaven also have optional Web UI tabs; AnimeIDHentai remains CLI/Python only. See the [CLI examples](./usage#adult-site-backends) for direct downloads and the repository's examples for metadata attributes.

## More examples

The [`examples` directory](https://github.com/phoenixthrush/AniWorld-Downloader/tree/models/examples) contains site-specific model examples, metadata attributes, muxing, and genre queries. Use the example for your backend: attributes and available actions differ across models.

For optional genre filters, sorting, runtime tag discovery, and result limits, see [Genre Search](./genre-search). For remote integrations, use the [HTTP API](./http-api) with a scoped API key. Its routes are not versioned, so consult the in-app reference for your installed version.
