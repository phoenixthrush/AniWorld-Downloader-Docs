# Command Line

Run `aniworld --help` for the current built-in reference and `aniworld --examples` for longer examples.

## Common commands

```bash
# Interactive terminal menu
aniworld

# Start the Web UI
aniworld -w

# Download one URL without the menu
aniworld --no-menu "URL"

# Download every URL in a text file
aniworld --episode-file episodes.txt --no-menu
```

URLs may point to a supported series, season, episode, movie, or manga title. What is accepted depends on the site.

## Choose the action

```bash
aniworld --action Download "URL"
aniworld --action Watch "URL"
aniworld --action Syncplay "URL"
```

`Download` is the default. `Watch` opens the configured player. `Syncplay` starts a synchronized room.

## Choose language and provider

```bash
aniworld --no-menu \
  --language "German Dub" \
  --provider VOE \
  "URL"
```

Languages are `German Dub`, `English Dub`, `English Sub`, and `German Sub`. Not every title offers every language.

The selected provider is tried first. If it fails, the configured fallback order is used.

## Useful options

| Option | Purpose |
| --- | --- |
| `-nm`, `--no-menu` | Process URLs directly |
| `-a`, `--action` | `Download`, `Watch`, or `Syncplay` |
| `-l`, `--language` | Select the audio and subtitle preset |
| `-p`, `--provider` | Select the preferred stream hoster |
| `-o`, `--output` | Set the download location |
| `-f`, `--episode-file` | Read one URL per line from a file |
| `-sk`, `--aniskip` | Skip detected intros and outros during playback |
| `-kw`, `--keep-watching` | Continue to the next episode |
| `-r`, `--random-anime` | Pick a random AniWorld title |
| `-sto`, `--use-sto-search` | Prefer SerienStream in interactive search |
| `-A`, `--anime4k` | Install `High` or `Low` shaders, or `Remove` them |
| `-d`, `--debug` | Show detailed logs |

## Web UI options

| Option | Purpose |
| --- | --- |
| `-w`, `--web-ui` | Start the Web UI |
| `-wP`, `--web-port` | Change port `8080` |
| `-wN`, `--no-browser` | Do not open a browser automatically |
| `-wE`, `--web-expose` | Listen on every network interface |
| `-wA`, `--web-auth` | Enable local accounts |
| `-wS`, `--web-sso` | Enable the OIDC login option |
| `-wFS`, `--web-force-sso` | Allow only OIDC login |

## Syncplay options

```bash
aniworld --action Syncplay \
  --syncplay-host syncplay.pl:8998 \
  --syncplay-room "Movie Night" \
  --syncplay-username "Alex" \
  "URL"
```

Add `--syncplay-password` when the room uses one. If no room is supplied, AniWorld Downloader creates a room name from the episode.

## Direct provider URL

Use this only when you already have a provider page URL:

```bash
aniworld --provider VOE --provider-url "https://voe.sx/e/example"
```

The media is written to `input.mkv` in the configured download folder.
