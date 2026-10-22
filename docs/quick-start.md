# Get Started

The Python package is the recommended installation for desktop use. Docker is a good fit for servers and NAS systems.

## Python package

You need [**Python 3.11 or newer**](https://www.python.org/downloads/). The current CI checks Python 3.11–3.14 on Linux and Python 3.13 on Windows and macOS.

```bash
python -m pip install -U aniworld
aniworld --version
```

Windows may use `py -m pip` instead. Some Linux systems use `python3 -m pip`.

::: tip First launch
Chromium setup is deferred until a browser-backed feature needs it, such as captcha handling or JavaScript player resolution. Starting the CLI or Web UI alone does not install it. The first browser-backed request may take longer while Chromium is installed; later requests reuse it.
:::

## Docker

For a server, NAS, or always-on Web UI, skip to the [Docker guide](./docker).

## Standalone releases

Windows, macOS, and Linux builds are available from [GitHub Releases](https://github.com/phoenixthrush/AniWorld-Downloader/releases). These builds are rarely tested and may or may not work on your system. Use the Python package when possible.

## Start the app

### Web UI

```bash
aniworld -w
```

Open `http://localhost:8080` if the browser does not open automatically.

### Terminal menu

```bash
aniworld
```

Search for an AniWorld title or paste an AniWorld or SerienStream series URL, choose the episodes, then choose Download, Watch, or Syncplay. Episode and season URLs, and URLs from other supported sites, run directly without the episode menu.

### Direct command

```bash
aniworld --no-menu \
  "SUPPORTED_URL"
```

Replace `SUPPORTED_URL` with a URL from a supported site. See [Command Line](./usage) for available flags and examples.

## External tools

Video downloads need FFmpeg. Watching needs the player selected by the action:

| Action | Tool |
| --- | --- |
| Download | FFmpeg |
| Watch | mpv or IINA |
| Syncplay | Syncplay and mpv |

The app can offer portable FFmpeg, mpv, and Syncplay installation on Windows, and player installation through supported package managers on macOS/Linux. Install FFmpeg yourself on macOS/Linux. Supply tools in advance for unattended use, or set `ANIWORLD_NO_AUTO_INSTALL=1` to decline automatic installation; browser handling may also need a virtual display on a headless Linux host.

## Optional features

The normal installation includes the Web UI and terminal dependencies. Add EPUB output, OIDC SSO, or the Discord request bot with:

```bash
python -m pip install "aniworld[epub]"
python -m pip install "aniworld[sso]"
python -m pip install "aniworld[discord]"
```

Use `python -m pip install "aniworld[all]"` for all three extras. Docker includes them; standalone builds include EPUB support. See [Web UI authentication](./web-ui#local-accounts) and [Discord requests](./automation#discord-request-bot) for setup.

## Development version

To install the latest commit from the `models` branch, with Git installed:

```bash
pip install --upgrade git+https://github.com/phoenixthrush/AniWorld-Downloader.git@models
```

This follows development rather than the published PyPI release. For an editable checkout and tests, see [Contributing](./contributing).

## Update or remove

```bash
# Update
python -m pip install -U aniworld

# Remove
python -m pip uninstall aniworld
```

Your settings and Web UI database live in `~/.aniworld` by default, or the folder selected with `ANIWORLD_INSTALL_FOLDER`. Uninstalling the Python package does not remove them.
