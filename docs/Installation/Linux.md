# Linux

## Prerequisites

Make sure Python is installed on your system. You can verify this by opening the Terminal and running the command `python -v`. If Python is installed and the version is 3.9 or newer, you're all set.

You can download the latest Python installer by either selecting "macOS 64-bit universal2 installer" from the [Python Downloads Page](https://www.python.org/downloads/latest/) or by using Apt or your package manager.

:::tip[My tip]

If you are on a Debian-based distribution and have `apt` installed, you can install Python and the `venv` package by running the following command:

```
sudo apt install python3 python3-venv
```

:::

To create a virtual environment, use the following command:
```
python -m venv venv
```

Activate the environment:
```
source venv/bin/activate
```

## Install `aniworld` from PyPI using pip

```
pip install aniworld
```

## Updating `aniworld`

To update `aniworld` to the latest version, use the following command:

```
pip install --upgrade aniworld
```
