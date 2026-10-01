# Supported Sites

AniWorld and SerienStream are the main focus of the project.

Last checked: **09/2026**. These statuses reflect sampled stream/image checks, not complete downloads or playback tests. Availability can vary by title, region, and stream hoster.

| Site | Content | Status | Notes |
| --- | --- | --- | --- |
| AniWorld | Anime and anime movies | Working | |
| SerienStream | Series | CAPTCHA verification required | |
| MegaKino | Movies and series | Working | |
| Filmo | Movies | Working | |
| Moflix | Movies and series | Working | |
| MangaFire | Manga | Working | JPG and CBZ downloads |
| FilmPalast | Movies | Working | |
| Hanime | Adult animation | Working | Disabled by default |
| Kinox | Movies and series | Unverified: manual captcha required | Disabled by default |
| BurningSeries | Series | Broken: embed resolution failed | Disabled by default |

The following sources are also registered for direct CLI URLs and Python use. These entries describe implemented backend support, not a new live availability check:

| Site | Accepted URLs | Backend support |
| --- | --- | --- |
| HentaiTV (`hentai.tv`) | Episode | Extraction, keyword search, and downloads |
| AnimeIDHentai (`animeidhentai.com`) | Episode, including legacy numeric-ID URLs | Extraction, keyword search, and downloads |
| HentaiHaven (`hentaihaven.xxx`) | Title or episode | Extraction, keyword search, and downloads |

These three sites contain adult content and have no Web UI tabs or search integration yet. See [direct CLI examples](./usage#adult-site-backends) and [Python search](./python-api#adult-site-backends). Hanime remains a separate backend; AnimeIDHentai does not replace it in the provider registry.

## Stream Hosters

Sites list the titles; stream hosters provide the video links. The checks below use the same **09/2026** snapshot.

| Hoster | Status |
| --- | --- |
| VOE | Working |
| Filemoon | Working |
| Doodstream | Working |
| MegaKino | Working |
| Gupload | Working |
| MoflixClick | Working |
| Vidara | Working |
| Vidmoly | Broken: no embed HTML returned |
| Vidoza | Unverified: Shut down? |

If a hoster fails, the downloader can try others in your configured fallback order, provided the title offers them in the selected language. It does not automatically switch languages. VOE previews are broken; Filemoon, Doodstream, and MegaKino previews are not implemented.


## Enable or hide sites

Site switches control the Web UI tabs and browse rows. Enable them through Settings for the current session, or in `.env` / Docker configuration for future starts.

| Setting | Default |
| --- | --- |
| `ANIWORLD_ENABLE_ANIWORLD` | `1` |
| `ANIWORLD_ENABLE_STO` | `1` |
| `ANIWORLD_ENABLE_MEGAKINO` | `1` |
| `ANIWORLD_ENABLE_MOFLIX` | `1` |
| `ANIWORLD_ENABLE_FILMPALAST` | `1` |
| `ANIWORLD_ENABLE_FILMO` | `1` |
| `ANIWORLD_ENABLE_MANGAFIRE` | `1` |
| `ANIWORLD_ENABLE_HTV` | `0` |
| `ANIWORLD_ENABLE_KINOX` | `0` |
| `ANIWORLD_ENABLE_BURNINGSERIES` | `0` |

The Filmo toggle is supported by the settings code even though it is not currently listed in `.env.example`; use the Web UI or an explicit process environment variable. Hanime contains adult content. Enabling a tab does not fix a source or hoster that is unavailable.

## Interface differences

The interactive terminal menu is primarily for AniWorld and SerienStream. Other registered site URLs can be processed directly. Python models expose site-specific metadata and actions; not every backend capability has a corresponding Web UI control.

See [Genre Search](./genre-search) for backend filters and [Contributing](./contributing#live-provider-checks) for live-check scripts. Status tables are dated snapshots and should be updated with the scope of each check, not inferred from offline tests.
