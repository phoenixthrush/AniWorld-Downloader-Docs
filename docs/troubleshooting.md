# Troubleshooting

Start by updating AniWorld Downloader and running the failed command with debug logging:

```bash
python -m pip install -U aniworld
aniworld --debug
```

The app also writes `aniworld.log` to your system's temporary directory. Include the relevant error when reporting a problem, but remove passwords, tokens, and private URLs first.

## Command not found

Try the module form, which works even when your Python scripts directory is not on `PATH`:

```bash
python -m aniworld
```

If several Python installations are present, install and run the package with the same interpreter.

## FFmpeg or player missing

Video downloads require FFmpeg. Watching uses mpv or IINA on macOS; synchronized playback also needs Syncplay. Install the missing program and make sure its executable is available on `PATH`.

Docker already includes the parts needed for downloads. Standalone builds still depend on the tools required by the selected action being available or installed by the app.

## Browser or captcha problems

The first run may download Chromium. Keep the app open until it finishes and make sure the install directory is writable.

For repeated `403` or captcha failures:

1. Open the source site in a normal browser and confirm it works on your connection.
2. If the Chromium installation is missing, run `python -m patchright install chromium` with the same Python installation as the app.
3. Solve image challenges in the Chromium window when using the CLI, or open the CAPTCHA viewer from the running item on the Web UI queue page. Set `ANIWORLD_CAPTCHA_VISIBLE=1` to show a background window, and `ANIWORLD_CAPTCHA_MANUAL=1` to click widgets yourself.
4. Set `ANIWORLD_CAPTCHA_DEBUG_LOG=1` to log browser errors and failed requests, then turn it off again after troubleshooting. If you need more time to solve a challenge, set `ANIWORLD_CAPTCHA_TIMEOUT` to a positive number of seconds.

Some sites use regional blocks or change their protection without warning.

CAPTCHA verification can still fail. During testing, a German VPN location repeatedly returned Turnstile error `600010` ("Verification failed"). Switching to an Austrian VPN location got past the blocked check and returned the player link for the same episode. If verification keeps failing, try another VPN location or network.

### Moflix browse or search returns 403

Current Moflix requests use HTTP first, then the existing Chromium browser when the response identifies a Cloudflare challenge. This applies to browse, keyword search, and title metadata. The fallback loads the homepage before requesting the API, so it may take longer than an ordinary HTTP request. Chromium must be available even when you only want to browse titles.

Update the package if your version lacks this fallback. If it still fails, follow the browser checks above and include the debug log in your report. Other HTTP errors still propagate; the fallback does not treat every `403` as a Cloudflare challenge.

## A provider fails

Stream hosts regularly remove links or reject requests. Try another provider or configure a fallback order:

```dotenv
ANIWORLD_PROVIDER=VOE
ANIWORLD_PROVIDER_FALLBACK_ORDER=VOE,Vidmoly,Vidoza,Doodstream
```

A title can exist while one language, episode, or host is unavailable.

## Certificate errors

Update the package and its certificate bundle:

```bash
python -m pip install -U aniworld certifi
```

On managed networks, a proxy may use a private certificate authority. Add that authority to the operating system or container trust store instead of disabling TLS verification.

## Web UI is unreachable

For the same computer, use `http://localhost:8080`. For another device on your network, start with:

```bash
aniworld -w --web-expose --no-browser
```

Then use the server's local IP address, allow port `8080` through its firewall, and enable authentication before exposing it beyond your home network.

## Docker cannot write downloads

Create the bind-mounted directory before starting Compose:

```bash
mkdir -p Downloads
docker compose up -d
```

If it already exists, check its ownership and permissions for the container’s application user, not just your host login. The application itself runs as an unprivileged user.

## Still stuck?

[Open an issue](https://github.com/phoenixthrush/AniWorld-Downloader/issues/new) with:

- AniWorld Downloader version
- operating system and install method
- Python version, when applicable
- the command or Web UI action that failed
- debug log excerpt and exact source URL
- steps another person can follow to reproduce it

Please search existing issues first. Never post login details, cookies, Discord tokens, or OIDC secrets.

## Settings disappear after restart

Most settings changed in the Web UI apply only to the current process. Export them from Settings and merge them into your app `.env`, or configure them through Docker. Explicit process environment variables override `.env` values. See [persistence](./configuration#what-survives-a-restart).

## A theme hides the controls

Open `http://localhost:8080/settings?nocss=1`, adjusting the address for your server. This disables custom CSS and the shader for that page so you can correct or clear them. See [theme recovery](./theming#recover-from-a-broken-theme).

## API requests return 401 or 403

Check that the key is valid and that its scope permits the operation. Administrative endpoints need a full-access key. API keys cannot manage other keys, even with full access. See [HTTP API](./http-api).
