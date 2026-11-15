# Supported Sites

AniWorld and SerienStream are the main focus of the project.

## Current backend coverage

The `models` branch registers all 13 sources listed below. AniWorld, SerienStream, and BurningSeries accept series, season, and episode URLs. MegaKino, FilmPalast, and Filmo use title pages; Kinox also carries episode selection in URL query parameters. Moflix accepts title URLs with optional slugs, `/season/N` or `/season/N/episodes/N` suffixes, and `?season=N&episode=N` selectors. Its model normalizes accepted links to `https://moflix-stream.xyz/titles/ID` plus the episode selector.

CLI and Web dispatch, queued downloads, Auto-Sync, and Discord requests pass normalized URLs to their models. SerienStream's `/serie/stream/SLUG` alias becomes `/serie/SLUG`; supported query parameters and episode fragments remain intact. Python integrations can use the [same dispatcher](./python-api#other-sources). Moflix season episode lists follow the source API's pagination; its separate genre recommendation endpoint keeps the [12-title limit](./genre-search#moflix).

MangaFire accepts `/title/ID-slug`, chapter URLs, and `/volume/ID` URLs. It downloads chapter images or CBZ/EPUB archives; title archive downloads prefer available English volumes. EPUB needs the optional `epub` extra. Adult-site URL support is listed [below](#adult-site-backends).

Backend registration means the code supports those inputs; it does not establish that a third-party source is reachable or that its streams currently work.

## Source capabilities

The table describes implemented source integrations. Availability depends on the source, title, language, stream hoster and network connection.

| Site | Content | Web UI | Search and selection |
| --- | --- | --- | --- |
| AniWorld | Anime and anime movies | Enabled by default | Keyword and genre search; seasons, episodes and movies |
| SerienStream | Series | Enabled by default | Keyword and genre search; seasons and episodes |
| MegaKino | Movies and series | Enabled by default | Keyword and genre search; title pages with episode selection where available |
| Filmo | Movies | Enabled by default | Keyword and genre search; movie pages |
| Moflix | Movies and series | Enabled by default | Keyword and genre search; titles, seasons and episodes |
| MangaFire | Manga | Enabled by default | Keyword and genre search; volumes, chapters and page selection |
| FilmPalast | Movies | Enabled by default | Keyword and genre search; title pages |
| Hanime | Adult animation | Disabled by default | Keyword and genre search; videos |
| HentaiTV | Adult animation | Disabled by default | Keyword search; episodes with a fixed language/provider preset |
| AnimeIDHentai | Adult animation | CLI/Python only | Keyword search through Python; episodes |
| HentaiHaven | Adult animation | Disabled by default | Keyword search; titles and episodes with a fixed language/provider preset |
| Kinox | Movies and series | Disabled by default | Keyword and genre search; titles with episode selectors |
| BurningSeries | Series | Disabled by default | Keyword and genre search; seasons and episodes |

"Disabled by default" refers to Web UI visibility; direct CLI URLs remain accepted.

AniWorld and SerienStream use explicit episode numbers from English titles when available, with seasonal numbering as fallback. Source URLs retain the seasonal index. See [episode numbering and existing downloads](./configuration#file-names).

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

Sites list the titles; stream hosters provide the video links. Shared stream extraction supports the nine hosters below. Hanime's source backend handles its own streams. Preview extraction is implemented for VOE, Vidmoly and Vidoza.

| Hoster | Stream extraction | Preview extraction |
| --- | --- | --- |
| VOE | Implemented | Implemented |
| Filemoon | Implemented | Not implemented |
| Doodstream | Implemented | Not implemented |
| MegaKino | Implemented | Not implemented |
| Gupload | Implemented | Not implemented |
| MoflixClick | Implemented | Not implemented |
| Vidara | Implemented | Not implemented |
| Vidmoly | Implemented | Implemented |
| Vidoza | Implemented | Implemented |

If a hoster fails, the downloader can try others in your configured fallback order, provided the title offers them in the selected language. It does not automatically switch languages. A failed or missing sample does not establish that a hoster has shut down.

## Check a source on your connection

Use the [live provider scripts](./contributing#live-provider-checks) to check current titles and stream links. They resolve URLs without downloading complete media. A complete download and playback or decoding check are needed to verify the resulting file. Record the source URL, language, hoster and connection when reporting a failure; one failed sample does not establish that every title on a source is unavailable.

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

See [Genre Search](./genre-search) for backend filters and [Contributing](./contributing#live-provider-checks) for live-check scripts.
