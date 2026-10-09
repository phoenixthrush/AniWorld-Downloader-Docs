# Contributing and Testing

Bug reports, focused fixes, provider updates, and documentation improvements are welcome. Check existing [issues](https://github.com/phoenixthrush/AniWorld-Downloader/issues) before opening a new one.

## Development checkout

```bash
git clone --branch models https://github.com/phoenixthrush/AniWorld-Downloader.git
cd AniWorld-Downloader
python -m venv .venv
```

Activate the environment with `source .venv/bin/activate` on macOS/Linux or `.venv\Scripts\Activate.ps1` in Windows PowerShell. Then install the editable package:

```bash
python -m pip install -e ".[all,test]"
python -m pip install ruff
```

`all` includes EPUB (Pillow), SSO, and Discord dependencies; `test` adds pytest. Python 3.11 or newer is required.

## Automated checks

```bash
pytest
ruff check .
ruff format --check .
```

These match the current CI checks. The automated suite uses temporary configuration, database, and download locations and blocks network connections, including DNS lookups, native curl requests, and browser launches, during collection and test execution. CI installs dependencies from package registries, but the tests must not fetch source sites or stream hosters. They test behavior with fixtures and mocked services; passing them does not confirm that third-party sites currently work.

## Live provider checks

Run these from the application repository with its Python environment activated. `PYTHONPATH=src` makes the checks use your current source checkout:

```bash
PYTHONPATH=src python tests/test_providers_aniworld.py
PYTHONPATH=src python tests/test_providers_aniworld.py voe dood
PYTHONPATH=src python tests/test_providers_hosters.py
PYTHONPATH=src python tests/test_providers_hosters.py vidmoly
PYTHONPATH=src python tests/test_providers_hentaitv.py kanojo
```

The `tests/test_providers_*.py` scripts contact real sites and can launch CAPTCHA handling, but do not download complete media files. They are excluded from pytest collection. There is one script per source backend plus `test_providers_hosters.py` for standalone extractor samples:

| Source | Script suffix after `test_providers_` |
| --- | --- |
| AniWorld | `aniworld.py` |
| SerienStream | `serienstream.py` |
| MegaKino | `megakino.py` |
| Filmo | `filmo.py` |
| Moflix | `moflix.py` |
| MangaFire | `mangafire.py` |
| FilmPalast | `filmpalast.py` |
| Hanime | `hanimetv.py` |
| HentaiTV | `hentaitv.py` |
| AnimeIDHentai | `animeidhentai.py` |
| HentaiHaven | `hentaihaven.py` |
| Kinox | `kinox.py` |
| BurningSeries | `burningseries.py` |

Most video-site scripts accept hoster-name filters such as `voe dood`; the HentaiTV, AnimeIDHentai, and HentaiHaven scripts accept a search keyword instead, defaulting to `kanojo`. Hanime uses its trending feed; MangaFire checks Darling in the Franxx and Velvet Kiss. To run every script on macOS/Linux:

```bash
for check in tests/test_providers_*.py; do
  PYTHONPATH=src python "$check"
done
```

For Windows PowerShell, set `$env:PYTHONPATH = "src"` before running the individual `python tests/...` commands. To run all of them, use `Get-ChildItem tests/test_providers_*.py | ForEach-Object { python $_.FullName }`.

Use a separate `ANIWORLD_INSTALL_FOLDER` to isolate configuration. For example, on macOS/Linux, prefix a command with `ANIWORLD_INSTALL_FOLDER=/tmp/aniworld-live-check`. Set `ANIWORLD_NO_AUTO_INSTALL=1` to prevent automatic dependency installation, and supply Chromium in advance when the site needs a browser. Set `ANIWORLD_CAPTCHA_TIMEOUT=30` to keep CAPTCHA attempts within the helper's 45-second per-operation wait.

| Result | Meaning |
| --- | --- |
| `PASS` | A nonempty stream, poster, or page URL was extracted |
| `FAIL` | The operation raised an error, timed out, or returned nothing |
| `TODO` | The extractor is missing or raises `NotImplementedError` |
| `SKIP` | No sample embed or matching extractor was available |

The exit code counts failures. A zero exit code can still include `TODO` or `SKIP`; read the summary before treating a provider as verified. Preview failures can also produce a nonzero exit code when stream extraction passed.

The BurningSeries check stops after a stream-mirror VPN warning or an embed timeout instead of repeating the same blocked operation for every hoster. Recognized VPN warning pages are not opened in Chromium. A working alternate stream mirror is still tried before reporting the warning.

A stale test URL, VPN/IP block, CAPTCHA, or unavailable hoster can fail a sample without proving the entire backend is broken. If a standalone sample is deleted, replace its entry in `FALLBACK_EMBEDS` in `tests/provider_check.py` with a current embed URL from that hoster. Site scripts discover titles live rather than using those saved embeds. Repeat with another title or connection when needed, and record the date and scope of any status-table update. Extracting a URL does not verify complete playback or a finished download.

## Useful bug reports

Include your app version, OS, installation method, Python version where applicable, reproduction steps, affected page URL, selected hoster/language, and relevant logs. Remove secrets such as cookies, API keys, and bot tokens. A small reproducible example is more helpful than an entire configuration file.

For pull requests, explain the behavior before and after the change and how you checked it. Keep unrelated cleanup separate.
