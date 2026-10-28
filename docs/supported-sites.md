# Supported Sites

AniWorld and SerienStream are the main focus of the project.

## Current backend coverage

The `models` branch registers all 13 sources listed below. AniWorld, SerienStream, and BurningSeries accept series, season, and episode URLs. MegaKino, FilmPalast, and Filmo use title pages; Kinox also carries episode selection in URL query parameters. Moflix accepts title URLs with optional slugs, `/season/N` or `/season/N/episodes/N` suffixes, and `?season=N&episode=N` selectors. Its model normalizes accepted links to `https://moflix-stream.xyz/titles/ID` plus the episode selector.

CLI and Web dispatch, queued downloads, Auto-Sync, and Discord requests pass normalized URLs to their models. SerienStream's `/serie/stream/SLUG` alias becomes `/serie/SLUG`; supported query parameters and episode fragments remain intact. Python integrations can use the [same dispatcher](./python-api#other-sources). Moflix season episode lists follow the source API's pagination; its separate genre recommendation endpoint keeps the [12-title limit](./genre-search#moflix).

MangaFire accepts `/title/ID-slug`, chapter URLs, and `/volume/ID` URLs. It downloads chapter images or CBZ/EPUB archives; title archive downloads prefer available English volumes. EPUB needs the optional `epub` extra. Adult-site URL support is listed [below](#adult-site-backends).

Backend registration means the code supports those inputs; it does not establish that a third-party source is reachable or that its streams currently work.

## Live checks

The tables summarize observed results from manual provider checks. Successful checks resolved stream, poster, or chapter/page URLs; no complete media files were downloaded. Results can vary by title, stream hoster, and IP address, including VPN locations such as Austria and Germany.

| Site | Content | Status | Notes |
| --- | --- | --- | --- |
| AniWorld | Anime and anime movies | Stream URLs resolved | VOE, Doodstream, and Filemoon samples passed; Vidmoly failed |
| SerienStream | Series | Stream URLs resolved | Both dub presets resolved VOE; CAPTCHA handling can block access |
| MegaKino | Movies and series | Stream URLs resolved | Sampled title's VOE link passed; a separate MegaKino hoster sample also passed |
| Filmo | Movies | Stream URLs resolved | VOE samples passed |
| Moflix | Movies and series | Stream URLs resolved | MoflixClick and Vidara samples passed; verification can block title discovery |
| MangaFire | Manga | Chapter/page URLs resolved | Two sample titles; archive creation and image downloads were not tested |
| FilmPalast | Movies | Stream URL resolved | VOE sample passed; some requests returned no extractable source |
| Hanime | Adult animation | Stream URL resolved | Trending feed can return HTTP 403 or require a CAPTCHA |
| HentaiTV | Adult animation | Stream and poster URLs resolved | Optional Web UI tab; disabled by default |
| AnimeIDHentai | Adult animation | Stream and poster URLs resolved; content unverified | Returned stream filename differed from the selected title; CLI/Python only |
| HentaiHaven | Adult animation | Stream and poster URLs resolved | Optional Web UI tab; disabled by default |
| Kinox | Movies and series | Blocked by verification CAPTCHA | Disabled by default |
| BurningSeries | Series | Stream mirrors returned VPN warning pages | No usable mirror for the sample; stopped at the first blocked hoster |

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

Sites list the titles; stream hosters provide the video links. The current code registers stream extractors for all nine hosters below; preview extractors are implemented for VOE, Vidmoly, and Vidoza.

| Hoster | Stream extraction | Preview extraction |
| --- | --- | --- |
| VOE | Fresh source-site samples passed; saved standalone sample returned HTTP 404 | All tested previews failed |
| Filemoon | Fresh AniWorld samples passed; saved standalone sample was inconsistent | Not implemented |
| Doodstream | Samples passed | Not implemented |
| MegaKino | Sample passed | Not implemented |
| Gupload | Not checked: no saved embed or discovered sample | Not implemented |
| MoflixClick | Moflix sample passed; no saved standalone embed | Not implemented |
| Vidara | Moflix sample passed; Kinox remained CAPTCHA-blocked | Not implemented |
| Vidmoly | Samples failed: no extractable script content | Samples failed |
| Vidoza | Sample URL returned HTTP 404 | Sample URL returned HTTP 404 |

If a hoster fails, the downloader can try others in your configured fallback order, provided the title offers them in the selected language. It does not automatically switch languages. A failed or missing sample does not establish that a hoster has shut down.

The checks discover current titles through browse/search, select an episode or chapter, and resolve its links through the backend. HentaiTV, AnimeIDHentai, and HentaiHaven used the search keyword `kanojo`; their poster checks verify URL extraction. MangaFire checked Darling in the Franxx and Velvet Kiss. The standalone hoster script used its existing saved embed URLs without replacing them. A deleted or changed saved sample can fail while fresh source-site samples pass, as observed for VOE and Filemoon. MoflixClick and Vidara were reached through Moflix; Gupload still had no saved or discovered sample.

VOE preview errors included quoted URLs being used as request URLs. The URL-construction bug is fixed; preview availability has not been rechecked live. A follow-up metadata check found that the selected AnimeIDHentai title's linked player page supplied the input with the mismatched basename; no video was downloaded to establish its content.


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

See [Genre Search](./genre-search) for backend filters and [Contributing](./contributing#live-provider-checks) for live-check scripts. Status tables are snapshots and should be updated with the scope of each check, not inferred from offline tests.
