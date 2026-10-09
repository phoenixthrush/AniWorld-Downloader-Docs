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

## EPUB output requires Pillow

Install `aniworld[epub]` with the Python interpreter running the app, then restart the Web UI and retry. For an editable checkout, use `python -m pip install -e ".[epub]"`. JPG and CBZ work without Pillow.

## Browser or captcha problems

Chromium setup runs when an operation needs a browser, such as a CAPTCHA fallback or the HentaiTV/AnimeIDHentai JavaScript player. The app does not install Chromium or start Xvfb during ordinary startup or HTTP-only requests. An existing browser installation is reused; when it is missing, the app may install it unless `ANIWORLD_NO_AUTO_INSTALL=1`. Keep the app open until installation finishes and make sure the browser cache directory is writable. Xvfb setup is limited to headed browser operations on Linux without a display; the supplied Docker image starts its virtual display when the container starts. The download folder does not control dependency setup.

The app and Docker image install full Chromium with `--no-shell`, which skips the separate headless-shell download. HentaiTV and AnimeIDHentai run that full Chromium executable without a window (`headless=True`) to resolve the JavaScript player. CAPTCHA flows use headed Chromium, with Xvfb when needed on Linux.

For repeated `403` or captcha failures:

1. Open the source site in a normal browser and confirm it works on your connection.
2. If the Chromium installation is missing, run `python -m patchright install chromium` with the same Python installation as the app.
3. Solve image challenges in the Chromium window when using the CLI, or open the CAPTCHA viewer from the running item on the Web UI queue page. Set `ANIWORLD_CAPTCHA_VISIBLE=1` to show a background window, and `ANIWORLD_CAPTCHA_MANUAL=1` to click widgets yourself.
4. Set `ANIWORLD_CAPTCHA_DEBUG_LOG=1` to log browser errors and failed requests, then turn it off again after troubleshooting. If you need more time to solve a challenge, set `ANIWORLD_CAPTCHA_TIMEOUT` to a positive number of seconds.

Some sites use regional blocks or change their protection without warning.

CAPTCHA verification can still fail. During testing, a German VPN location repeatedly returned Turnstile error `600010` ("Verification failed"). Switching to an Austrian VPN location got past the blocked check and returned the player link for the same episode. If verification keeps failing, try another VPN location or network.

### Moflix browse or search returns 403

Current Moflix requests use HTTP first, then Chromium when the response identifies a Cloudflare challenge. Browser setup runs only for that fallback. This applies to browse, keyword search, and title metadata. The fallback loads the homepage before requesting the API, so it may take longer than an ordinary HTTP request. Browsing titles needs Chromium only when the HTTP requests hit that challenge.

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

On managed networks, a proxy may use a private certificate authority. The app defaults to the certifi bundle, so adding a CA only to the OS/container store may not resolve this. Set `REQUESTS_CA_BUNDLE`, `CURL_CA_BUNDLE`, or `SSL_CERT_FILE` in the process environment or app `.env`, pointing to a bundle containing both the normal trusted roots and your private CA. The app loads `.env` before applying certificate defaults. It uses the first nonempty setting in that order for the shared HTTP session and fills unset CA variables with the same bundle, so setting only `SSL_CERT_FILE` also supplies the Requests/cURL defaults. Process environment values override `.env` values for the same variable; explicitly different CA paths are preserved. See [certificate configuration](./configuration). Browser and external-tool trust can differ; include which request/client failed when reporting a problem. Keep TLS verification enabled.

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

## SSO does not protect the Web UI

Use both `--web-auth --web-sso`, or both `ANIWORLD_WEB_AUTH=1` and `ANIWORLD_WEB_SSO=1`. Enabling SSO alone does not install the authentication checks. `--web-force-sso` enables both, but requires working OIDC configuration and the SSO extra. See [Web authentication](./configuration#web-authentication).

For reverse proxies, also check the [external URL and trusted proxy settings](./configuration#https-reverse-proxy).

## API requests return 401 or 403

Check that the key is valid and that its scope permits the operation. Administrative endpoints need a full-access key. API keys cannot manage other keys, even with full access. See [HTTP API](./http-api).
