# Supported Sites

AniWorld and SerienStream are the main focus of the project.

All registered source backends are listed below. Availability notes use sampled stream/image checks from **09/2026**, not complete downloads or playback tests. Availability can vary by title, region, and stream hoster.

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
| HentaiTV | Adult animation | Implemented; live availability unverified | Optional Web UI tab; disabled by default |
| AnimeIDHentai | Adult animation | Implemented; live availability unverified | CLI/Python only |
| HentaiHaven | Adult animation | Implemented; live availability unverified | Optional Web UI tab; disabled by default |
| Kinox | Movies and series | Unverified: manual captcha required | Disabled by default |
| BurningSeries | Series | Broken: embed resolution failed | Disabled by default |

"Disabled by default" refers to Web UI visibility; direct CLI URLs remain accepted.

## Adult-site backends

All four adult backends support extraction, keyword search, and downloads. Their interfaces differ:

| Site | Accepted URLs | Interfaces |
| --- | --- | --- |
| Hanime (`hanime.tv`) | Video URL | CLI, Python, and optional Web UI tab |
| HentaiTV (`hentai.tv`) | Episode | CLI, Python, and optional Web UI tab |
| AnimeIDHentai (`animeidhentai.com`) | Episode, including legacy numeric-ID URLs | CLI and Python |
| HentaiHaven (`hentaihaven.xxx`) | Title or episode | CLI, Python, and optional Web UI tab |

Enable Hanime with `ANIWORLD_ENABLE_HTV=1`, HentaiTV with `ANIWORLD_ENABLE_HENTAITV=1`, and HentaiHaven with `ANIWORLD_ENABLE_HENTAIHAVEN=1`. All three tabs support keyword search and downloads. HentaiTV and HentaiHaven have no homepage browse rows or genre listing; their language and provider are fixed. AnimeIDHentai has no Web UI tab or HTTP search registration. See [direct CLI examples](./usage#adult-site-backends) and [Python search](./python-api#adult-site-backends).

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
| `ANIWORLD_ENABLE_HENTAITV` | `0` |
| `ANIWORLD_ENABLE_HENTAIHAVEN` | `0` |
| `ANIWORLD_ENABLE_KINOX` | `0` |
| `ANIWORLD_ENABLE_BURNINGSERIES` | `0` |

Hanime, HentaiTV, HentaiHaven, and AnimeIDHentai contain adult content. Enabling a tab does not fix a source or hoster that is unavailable.

## Interface differences

The interactive terminal menu is primarily for AniWorld and SerienStream. Other registered site URLs can be processed directly. Python models expose site-specific metadata and actions; not every backend capability has a corresponding Web UI control.

See [Genre Search](./genre-search) for backend filters and [Contributing](./contributing#live-provider-checks) for live-check scripts. Status tables are dated snapshots and should be updated with the scope of each check, not inferred from offline tests.
