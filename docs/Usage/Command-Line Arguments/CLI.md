# Arguments

```
usage: aniworld [-h] [-d] [-U {mpv,yt-dlp,syncplay,all}] [-u] [-v] [-s SLUG]
                [-e EPISODE [EPISODE ...]] [-f EPISODE_FILE]
                [-lf LOCAL_EPISODES [LOCAL_EPISODES ...]]
                [-pl PROVIDER_LINK [PROVIDER_LINK ...]] [-a ACTION]
                [-o OUTPUT_DIR] [-L LANGUAGE] [-p PROVIDER] [-A ANIME4K]
                [-sH HOSTNAME] [-sU USERNAME] [-sR ROOM]
                [-sP PASSWORD [PASSWORD ...]] [-k] [-K]
                [-r [RANDOM_ANIME ...]] [-D] [-C]

Parse command-line arguments for anime streaming, downloading, and playback
management.

options:
  -h, --help            show this help message and exit

General Options:
  -d, --debug           Enable debug mode for detailed logs.
  -U {mpv,yt-dlp,syncplay,all}, --update {mpv,yt-dlp,syncplay,all}
                        Update specified tools (mpv, yt-dlp, syncplay, or
                        all).
  -u, --uninstall       Perform self-uninstallation.
  -v, --version         Display version information.

Search Options:
  -s SLUG, --slug SLUG  Specify a search slug (e.g., demon-slayer-kimetsu-no-
                        yaiba).

Episode Options:
  -e EPISODE [EPISODE ...], --episode EPISODE [EPISODE ...]
                        Specify one or more episode URLs.
  -f EPISODE_FILE, --episode-file EPISODE_FILE
                        Provide a file containing episode URLs.
  -lf LOCAL_EPISODES [LOCAL_EPISODES ...], --local-episodes LOCAL_EPISODES [LOCAL_EPISODES ...]
                        Use local MP4 files for episodes instead of URLs.
  -pl PROVIDER_LINK [PROVIDER_LINK ...], --provider-link PROVIDER_LINK [PROVIDER_LINK ...]
                        Specify one or more provider episode urls.

Action Options:
  -a ACTION, --action ACTION
                        Specify the action to perform.
  -o OUTPUT_DIR, --output-dir OUTPUT_DIR
                        Set the download directory (e.g., /path/to/downloads).
  -L LANGUAGE, --language LANGUAGE
                        Specify the language for playback or download.
  -p PROVIDER, --provider PROVIDER
                        Specify the preferred provider.

Anime4K Options:
  -A ANIME4K, --anime4k ANIME4K
                        Set Anime4K mode (High, Low, or Remove for performance
                        tuning).

Syncplay Options:
  -sH HOSTNAME, --hostname HOSTNAME
                        Set the Syncplay server hostname.
  -sU USERNAME, --username USERNAME
                        Set the Syncplay username.
  -sR ROOM, --room ROOM
                        Specify the Syncplay room name.
  -sP PASSWORD [PASSWORD ...], --password PASSWORD [PASSWORD ...]
                        Set the Syncplay room password.

Miscellaneous Options:
  -k, --aniskip         Skip anime intros and outros using Aniskip.
  -K, --keep-watching   Automatically continue to the next episodes after the
                        selected one.
  -r [RANDOM_ANIME ...], --random-anime [RANDOM_ANIME ...]
                        Play a random anime (default genre is "all", e.g.,
                        Drama). All genres can be found here:
                        "https://aniworld.to/random"
  -D, --only-direct-link
                        Output only the direct streaming link.
  -C, --only-command    Output only the execution command.
```