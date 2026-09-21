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

Additional source-specific classes are available from `aniworld.models`, including `MegaKinoEpisode`, `FilmoEpisode`, `FilmPalastEpisode`, `MoflixEpisode`, `CinebySeries`, `MangaFireToSeries`, `KinoxSeries`, and `BurningSeriesSeries`. Movie-oriented backends may use an `Episode` class for a whole movie.

```python
from aniworld.models import MegaKinoEpisode

movie = MegaKinoEpisode("https://megakino.example/films/example.html")
print(movie.title, movie.release_year)
# movie.download()
```

Use a current URL from the source site in real code. Domains and page formats can change independently of the package.

## More examples

The [`examples` directory](https://github.com/phoenixthrush/AniWorld-Downloader/tree/models/examples) contains site-specific model examples, metadata attributes, muxing, and genre queries. Use the example for your backend: attributes and available actions differ across models.

For optional genre filters, sorting, runtime tag discovery, and result limits, see [Genre Search](./genre-search). For remote integrations, use the [HTTP API](./http-api) with a scoped API key. Its routes are not versioned, so consult the in-app reference for your installed version.
