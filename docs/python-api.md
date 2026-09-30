# Python API

AniWorld Downloader can also be used as a Python package. The public model classes expose site metadata and the same download, watch, and Syncplay actions used by the command line.

```bash
python -m pip install -U aniworld
```

## Series, seasons, and episodes

```python
from aniworld import AniworldSeries

series = AniworldSeries(
    "https://aniworld.to/anime/stream/highschool-dxd"
)

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

season = AniworldSeason(
    "https://aniworld.to/anime/stream/highschool-dxd/staffel-1"
)
print(season.episode_count)

episode = AniworldEpisode(
    "https://aniworld.to/anime/stream/highschool-dxd/staffel-1/episode-1"
)
print(episode.title_de, episode.title_en)
print(episode.selected_language, episode.selected_provider)

episode.download()
```

An episode also exposes `provider_data`, `stream_url`, `is_downloaded`, and its related `series` and `season` objects. Network-backed properties can raise an exception when a source or host is unavailable, so handle failures in long-running integrations.

## Other sources

The root package exports these stable entry points:

```python
from aniworld import (
    AniworldSeries,
    HanimeTVEpisode,
    SerienstreamSeries,
)
```

Additional source-specific classes are available from `aniworld.models`, including `MegaKinoEpisode`, `FilmoEpisode`, `FilmPalastEpisode`, `MoflixEpisode`, `MangaFireToSeries`, `KinoxSeries`, `BurningSeriesSeries`, `HentaiTVEpisode`, `AnimeIDHentaiEpisode`, `HentaiHavenSeries`, and `HentaiHavenEpisode`. Movie-oriented backends may use an `Episode` class for a whole movie.

```python
from aniworld.models import MegaKinoEpisode

movie = MegaKinoEpisode("https://megakino.example/films/example.html")
print(movie.title, movie.release_year)
# movie.download()
```

Use a current URL from the source site in real code. Domains and page formats can change independently of the package.

## Adult-site backends

Keyword search functions return dictionaries with `title`, `url`, `link`, and `poster`. HentaiTV and AnimeIDHentai return episode URLs; HentaiHaven returns title URLs.

```python
from aniworld.models import AnimeIDHentaiEpisode, HentaiHavenSeries, HentaiTVEpisode
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

series = HentaiHavenSeries(
    "https://hentaihaven.xxx/watch/ane-wa-yanmama-junyuu-chuu/"
)
# series.download()
```

These searches default to `limit=30`. `limit=0` or an empty keyword returns no results without fetching. `limit=None` uses the backend's available search scope rather than promising a full catalogue. The episode models default to `English Sub`; separate subtitle-file extraction is not implemented. See the [CLI examples](./usage#adult-site-backends) for direct downloads and the repository's examples for metadata attributes.

## More examples

The [`examples` directory](https://github.com/phoenixthrush/AniWorld-Downloader/tree/models/examples) contains site-specific model examples, metadata attributes, muxing, and genre queries. Use the example for your backend: attributes and available actions differ across models.

For optional genre filters, sorting, runtime tag discovery, and result limits, see [Genre Search](./genre-search). For remote integrations, use the [HTTP API](./http-api) with a scoped API key. Its routes are not versioned, so consult the in-app reference for your installed version.
