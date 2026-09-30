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

`all` includes SSO and Discord dependencies; `test` adds pytest. Python 3.11 or newer is required.

## Automated checks

```bash
pytest
ruff check .
ruff format --check .
```

These match the current CI checks. The automated suite uses temporary configuration, database, and download locations and blocks network connections, including DNS lookups, native curl requests, and browser launches, during collection and test execution. CI installs dependencies from package registries, but the tests must not fetch source sites or stream hosters. They test behavior with fixtures and mocked services; passing them does not confirm that third-party sites currently work.

## Live provider checks

Run these manually when investigating a source or hoster:

```bash
python tests/test_providers_filmpalast.py
python tests/test_providers_hosters.py vidmoly
```

The `tests/test_providers_*.py` scripts contact real sites and can launch captcha handling. They are not collected as pytest tests. Use a separate `ANIWORLD_INSTALL_FOLDER` if you want to isolate app configuration from your normal installation.

A stale test URL, regional block, captcha, or unavailable hoster can fail a sample without proving the entire backend is broken. Likewise, extracting a stream URL does not verify a complete download. Some extractor requests have no explicit timeout, so a stalled live check may need to be interrupted.

## Useful bug reports

Include your app version, OS, installation method, Python version where applicable, reproduction steps, affected page URL, selected hoster/language, and relevant logs. Remove secrets such as cookies, API keys, and bot tokens. A small reproducible example is more helpful than an entire configuration file.

For pull requests, explain the behavior before and after the change and how you checked it. Keep unrelated cleanup separate.
