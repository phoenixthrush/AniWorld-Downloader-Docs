# Episode

Here you can specify the desired input method for selecting episodes, whether it's a direct link, a file, a local video, or an external provider.

## Episode

Select a specific episode from an anime series to download. This allows you to target a particular episode instead of downloading an entire season or series.

**Argument:** `--episode` (short: `-e`)

**Default:** No episode is set by default.

**Example:** `--episode https://aniworld.to/anime/stream/kaguya-sama-love-is-war/staffel-1/episode-1 https://aniworld.to/anime/stream/kaguya-sama-love-is-war/staffel-1/episode-1`

:::tip[Episode Selection]
You can choose to download an entire anime series, a specific season, or just a single episode, whatever suits your preference.

- The whole anime:
```
aniworld --episode https://aniworld.to/anime/stream/alya-sometimes-hides-her-feelings-in-russian
```

- The whole Season 2:
```
aniworld --episode https://aniworld.to/anime/stream/demon-slayer-kimetsu-no-yaiba/staffel-2
```

- Only Season 3 Episode 13:
```
aniworld --episode https://aniworld.to/anime/stream/kaguya-sama-love-is-war/staffel-3/episode-13
```
:::

## Episode File

For bulk downloads, provide an episode file containing multiple episode links.

**Argument:** `--episode-file` (short: `-f`)

**Default:** No episode file is set by default.

**Example:** `--episode-file "C:\Users\<YourUsername>\Downloads\episodes.txt"`

```jsx title="C:\Users\<YourUsername>\Downloads\episodes.txt"
# The whole anime
https://aniworld.to/anime/stream/alya-sometimes-hides-her-feelings-in-russian

# The whole Season 2
https://aniworld.to/anime/stream/demon-slayer-kimetsu-no-yaiba/staffel-2

# Only Season 3 Episode 13
https://aniworld.to/anime/stream/kaguya-sama-love-is-war/staffel-3/episode-13
```

:::tip[Episode File]
You can also use dynamic paths like `"animes.txt"` if the file is located in your current working directory.

If the file path contains spaces, enclose it in double quotes, e.g., `"C:\Users\<YourUsername>\My Anime List\episodes.txt"`.

The same rules for links mentioned above apply here as well.
:::

## Local Episodes

Choose a video file stored on your local disk to use.

**Argument:** `--local-episodes` (short: `-lf`)

**Default:** No local file is selected by default.

**Example:** `--local-episodes "C:\Users\<YourUsername>\Videos\episode-1.mp4"`

## Provider Link

You can specify a provider link outside of AniWorld to access content. When using an external provider link, it is crucial to set the provider explicitly using the `--provider` argument. Without this, the tool will not know how to process the link.

**Note:** At present, the tool will only simulate the selected action for external provider links and will not execute the actual thing. This behavior may change in future updates as development progresses.

**Argument:** `--provider-link` (short: `-pl`)

**Example:** 
```
aniworld --provider-link https://speedfiles.net/4f8b2c8d4f3f --provider SpeedFiles
```
