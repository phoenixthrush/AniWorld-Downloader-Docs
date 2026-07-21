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

Downloads require FFmpeg. Watching requires mpv, VLC, or IINA on macOS. Install the missing program and make sure its executable is available on `PATH`.

Docker already includes the parts needed for downloads. Standalone releases generally bundle them too, but those builds are rarely tested and may not work on every system.

## Browser or captcha problems

The first run may download Chromium. Keep the app open until it finishes and make sure the install directory is writable.

For repeated `403` or captcha failures:

1. Open the source site in a normal browser and confirm it works on your connection.
2. Set `ANIWORLD_CAPTCHA_VISIBLE=1` and solve the prompt yourself.
3. Set `ANIWORLD_CAPTCHA_DEBUG_LOG=1` for more detail.
4. Try `ANIWORLD_NO_ADBLOCK=1` if the challenge page stays blank.

Some sites use regional blocks or change their protection without warning.

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

If it already exists, check that your Docker user can write to it. The application itself runs as an unprivileged user.

## Still stuck?

[Open an issue](https://github.com/phoenixthrush/AniWorld-Downloader/issues/new) with:

- AniWorld Downloader version
- operating system and install method
- Python version, when applicable
- the command or Web UI action that failed
- debug log excerpt and exact source URL
- steps another person can follow to reproduce it

Please search existing issues first. Never post login details, cookies, Discord tokens, or OIDC secrets.
