# Supported Sites

AniWorld and SerienStream are the main focus of the project.

All registered source backends were checked live in **10/2026** using the manual provider scripts. The tables show the best observed results. Successful checks resolved sample stream or chapter/page URLs; no complete media files were downloaded. Results can vary by title, connection, and stream hoster.

| Site | Content | Status | Notes |
| --- | --- | --- | --- |
| AniWorld | Anime and anime movies | Stream URLs resolved | VOE, Doodstream, and Filemoon samples passed; Vidmoly failed |
| SerienStream | Series | Stream URLs resolved | VOE and Doodstream samples passed |
| MegaKino | Movies and series | Stream URLs resolved | VOE and the MegaKino hoster passed |
| Filmo | Movies | Stream URLs resolved | VOE samples passed |
| Moflix | Movies and series | Stream URL resolved | MoflixClick sample passed |
| MangaFire | Manga | Chapter/page URLs resolved | JPG and CBZ downloads supported |
| FilmPalast | Movies | Stream URL resolved | VOE sample passed |
| Hanime | Adult animation | Stream URL resolved | Disabled by default |
| HentaiTV | Adult animation | Stream and poster URLs resolved | Optional Web UI tab; disabled by default |
| AnimeIDHentai | Adult animation | Stream and poster URLs resolved | CLI/Python only |
| HentaiHaven | Adult animation | Stream and poster URLs resolved | Optional Web UI tab; disabled by default |
| Kinox | Movies and series | Blocked by verification CAPTCHA | Disabled by default |
| BurningSeries | Series | Stream mirrors returned VPN warning pages | Disabled by default |

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

Sites list the titles; stream hosters provide the video links. These results use the same **10/2026** checks, including fresh embed URLs discovered from current titles.

| Hoster | Stream extraction | Preview extraction |
| --- | --- | --- |
| VOE | Samples passed | Samples failed |
| Filemoon | Samples passed | Not implemented |
| Doodstream | Samples passed | Not implemented |
| MegaKino | Sample passed | Not implemented |
| Gupload | No current embed found in sampled titles | Not implemented |
| MoflixClick | Sample passed | Not implemented |
| Vidara | Kinox CAPTCHA prevented resolving the sample embed | Not implemented |
| Vidmoly | Samples failed: no embed HTML returned | Samples failed |
| Vidoza | Sample URL returned HTTP 404 | Sample URL returned HTTP 404 |

If a hoster fails, the downloader can try others in your configured fallback order, provided the title offers them in the selected language. It does not automatically switch languages. A failed or missing sample does not establish that a hoster has shut down.

The checks discover current titles through browse/search, select an episode or chapter, and resolve its links through the backend. HentaiTV, AnimeIDHentai, and HentaiHaven used the search keyword `kanojo`; their poster checks verify URL extraction. The standalone hoster script uses saved embed URLs, refreshed for VOE, Doodstream, Filemoon, and MegaKino during this check. Kinox's CAPTCHA blocked access to Vidara, and none of the sampled titles offered a usable Gupload embed. Neither is counted as a passing stream check.


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
