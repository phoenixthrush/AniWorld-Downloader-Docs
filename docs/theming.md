# Themes and Appearance

Use **Settings → Appearance** to change the Web UI with CSS and an optional GLSL background shader. Changes apply to everyone using the instance, survive restarts, and require administrator access when authentication is enabled.

## Start with a theme

1. Open the [light theme](https://github.com/phoenixthrush/AniWorld-Downloader/blob/models/themes/light.css) or the [documented template](https://github.com/phoenixthrush/AniWorld-Downloader/blob/models/themes/template.css).
2. Copy the CSS into the stylesheet field in Appearance.
3. Save and check the result.

For a small change, override a few variables:

```css
:root {
  --bg: #f5f6f8;
  --surface: #ffffff;
  --text: #3f4652;
  --accent: #e11d48;
}
```

The template lists the available variables, defaults, and what each one controls. Prefer these variables over selectors tied to internal markup. You can still use ordinary CSS for layouts, animations, and other effects.

## Import a published theme

Instead of pasting an entire stylesheet, import a hosted CSS file:

```css
@import url('https://cdn.jsdelivr.net/gh/USER/REPOSITORY@REF/theme.css');
```

Replace `USER`, `REPOSITORY`, and `REF` with the theme's repository and branch, tag, or commit. A fixed commit keeps the imported version predictable; a branch follows the author's updates.

The server moves standalone `@import` rules to the top when saving, before other CSS rules. The remote server must return a CSS content type (`text/css`). The app warns about known plain-text hosts, including Pastebin and raw GitHub/Gist URLs, and suggests a jsDelivr equivalent for raw GitHub files.

For example:

```text
https://raw.githubusercontent.com/USER/REPOSITORY/REF/theme.css
https://cdn.jsdelivr.net/gh/USER/REPOSITORY@REF/theme.css
```

Imports are fetched by each visitor's browser. The hosting service receives those requests and can change the stylesheet. Only import themes from sources you trust.

## Files and persistence

| File | Purpose | Size limit |
| --- | --- | --- |
| `custom.css` | Instance-wide stylesheet | 512 KiB |
| `custom.frag` | Background fragment shader | 64 KiB |

Both files live beside `.env` in the app data directory, normally `~/.aniworld`. You can edit them directly and reload the page. With the supplied Docker Compose file, they are retained in the `aniworld-data` volume. Back up that directory or volume to preserve your theme.

Saving an empty field removes its custom file. Custom styles and shaders are not loaded on the login or first-run setup pages.

## Background layers and interface state

Two empty layers sit behind the page content:

```css
.theme-layer[data-layer="1"] {
  background: radial-gradient(circle at top, #29243d, transparent 70%);
}

.theme-layer[data-layer="2"] {
  background: linear-gradient(120deg, transparent, #ffffff08);
}
```

Layer 1 is furthest back. Layer 2 sits in front of it, behind the content. These elements let a theme add effects without taking over an app-owned pseudo-element. The template also explains stacking, surface transparency, and site accent colors.

The `<body>` element exposes state for selectors:

| Attribute | Values |
| --- | --- |
| `data-page` | Page name, such as `index`, `queue`, `library`, `autosync`, or `settings` |
| `data-site` | Selected site key, such as `aniworld`, `sto`, or `megakino` |
| `data-queue` | `active` or `idle` |
| `data-queue-count` | Queue count updated by the interface |
| `data-modal` | `open` or `closed` |

```css
body[data-queue="active"] .theme-layer[data-layer="2"] {
  opacity: 0.6;
}

body[data-modal="open"] .theme-layer {
  animation-play-state: paused;
}
```

## Background shader

The shader field accepts a GLSL fragment shader, not JavaScript. It draws on a canvas behind the interface:

```glsl
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  fragColor = vec4(uv, 0.5 + 0.5 * sin(u_time), 1.0);
}
```

The app provides `u_resolution` (canvas dimensions), `u_time` (elapsed seconds), and `fragColor` (output color). The settings editor checks compilation before saving and displays compiler errors. Use `.theme-shader` to style the canvas itself.

Rendering is capped at 500,000 pixels and pauses when the tab is hidden. Reduced-motion preferences freeze the time value at zero. If WebGL or compilation fails, the shader is skipped. Complex shaders can still use significant GPU resources; keep effects lightweight.

## Recover from a broken theme

Open `/settings?nocss=1` on your instance, for example:

```text
http://localhost:8080/settings?nocss=1
```

This skips custom CSS and the background shader for that page. Clear or fix the relevant field, save, then reopen Settings without the query parameter. You can also remove `custom.css` or `custom.frag` from the app data directory.
