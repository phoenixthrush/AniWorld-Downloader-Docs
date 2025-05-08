# Library

You can also use AniWorld Downloader as a library in your Python scripts to programmatically manage anime downloads or streams. Here's an example:

:::danger
This section is under construction. Stay tuned for updates as we work to provide detailed documentation on using AniWorld Downloader as a library in your Python projects. Please note that some functions and APIs may change as the library evolves.
:::

```jsx title="ballsack.py"
from aniworld.models import Anime, Episode

# Define an Anime object with a list of episodes
anime = Anime(
  episode_list=[
    Episode(
      slug="food-wars-shokugeki-no-sma",
      season=1,
      episode=5
    ),
    Episode(
      link="https://aniworld.to/anime/stream/food-wars-shokugeki-no-sma/staffel-1/episode-6"
    )
  ]
)

# Iterate through the episodes and retrieve direct links
for episode in anime:
  print(f"Episode: {episode}")
  print(f"Direct Link: {episode.get_direct_link('VOE', 'German Sub')}")
```