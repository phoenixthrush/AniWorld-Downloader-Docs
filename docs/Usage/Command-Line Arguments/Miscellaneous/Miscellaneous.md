# Miscellaneous

Here are additional arguments that can be used with the AniWorld Downloader.

## Help

Display a help message with a list of all available arguments and their descriptions.

**Argument:** `--help` (short: `-h`)

**Default:** N/A

**Example:** `--help`

## Debug

Enable debug mode to display detailed logs for troubleshooting purposes.

**Argument:** `--debug` (short: `-d`)

**Default:** Disabled

**Example:** `--debug`

## Version

Display the current installed version of the AniWorld Downloader.

**Argument:** `--version` (short: `-v`)

**Example:** `--version`
## Uninstall

Remove the AniWorld Downloader from your system. This command ensures that all related files created by the tool are cleanly removed, and the tool then uninstalls itself using `pip`.

**Argument:** `--uninstall` (short: `-u`)

**Example:** `--uninstall`

## Aniskip

Skip anime intros and outros automatically with Aniskip.

**Argument:** `--aniskip` (short: `-k`)

**Default:** Disabled

**Example:** `--aniskip`

## Keep Watching

Continue watching the remaining episodes of the anime automatically after the specified episode finishes, even if they were not explicitly selected.

**Argument:** `--keep-watching` (short: `-K`)

**Default:** Disabled

**Example:** `--keep-watching`

## Random Anime

Selects a random anime to download or stream.

**Argument:** `--random-anime` (short: `-r`)

**Default:** Disabled

**Example:** `--random-anime`

## Only Direct Link

Output only the direct streaming link for the selected anime. This link can be used with tools like `mpv`, `yt-dlp`, or any other compatible application.

**Argument:** `--only-direct-link` (short: `-D`)

**Default:** Disabled

**Example:** `--only-direct-link`

## Only Command

Output only the execution command for the selected anime instead of running it.

**Argument:** `--only-command` (short: `-C`)

**Default:** Disabled

**Example:** `--only-command`
