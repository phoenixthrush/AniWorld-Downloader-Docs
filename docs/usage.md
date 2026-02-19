# Usage

This section provides examples of how to use the `aniworld` package.

## Menu

To open up the npyscreen TUI, simply run the following command in your terminal:

```bash
aniworld
```

## Web UI

To open up the web UI, run the following command in your terminal:

```bash
aniworld --web-ui
```

## API

To use the API, you can import the `aniworld` package in your Python code and call the functions as needed. For example:

```python
from aniworld.models import AniworldSeries

series = AniworldSeries("https://aniworld.to/anime/stream/highschool-dxd")

print("=== SERIES INFO ===")
print("URL:", series.url)
print("Title:", series.title)
print("Description:", series.description)
print("...")

series.download()
```

Feel free to check out the other examples in the `examples` directory for more usage scenarios.

Next section: [Configuration](configuration)
