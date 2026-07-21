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

Additional source-specific classes are available from `aniworld.models`, including `MegaKinoEpisode`, `FilmPalastEpisode`, `CinebySeries`, `MangaFireToSeries`, `KinoxSeries`, and `BurningSeriesSeries`.

```python
from aniworld.models import MegaKinoEpisode

movie = MegaKinoEpisode("https://megakino.example/films/example.html")
print(movie.title, movie.release_year)
# movie.download()
```

Use a current URL from the source site in real code. Domains and page formats can change independently of the package.

## More examples

The repository contains working examples for AniWorld, SerienStream, MegaKino, and Hanime in the [`examples` directory](https://github.com/phoenixthrush/AniWorld-Downloader/tree/models/examples).

The Web UI's internal `/api/*` routes are not a versioned public API. For integrations, use the Python models or invoke the CLI.
