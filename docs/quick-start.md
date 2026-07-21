# Get Started

The Python package is the recommended installation for desktop use. Docker is a good fit for servers and NAS systems.

## Python package

You need [**Python 3.10 or newer**](https://www.python.org/downloads/). On Windows, use **Python 3.13** for now.

```bash
python -m pip install -U aniworld
aniworld --version
```

Windows may use `py -m pip` instead. Some Linux systems use `python3 -m pip`.

::: tip First launch
The first start may install the browser used for captcha handling. Let it finish once. Later starts reuse it.
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

Search for a title or paste a supported URL, choose the episodes, then choose Download, Watch, or Syncplay.

### Direct command

```bash
aniworld --no-menu \
  "https://aniworld.to/anime/stream/example/staffel-1/episode-1"
```

See [Command Line](./usage) for the useful flags and a few real combinations.

## External tools

Downloads need FFmpeg. Watching needs the player selected by the action:

| Action | Tool |
| --- | --- |
| Download | FFmpeg |
| Watch | mpv or IINA |
| Syncplay | Syncplay and mpv or IINA |

Portable dependencies can be installed automatically on Windows. On macOS and Linux, install missing tools with your normal package manager.

## Update or remove

```bash
# Update
python -m pip install -U aniworld

# Remove
python -m pip uninstall aniworld
```

Your settings and Web UI database live in `~/.aniworld` and are not removed with the Python package.
