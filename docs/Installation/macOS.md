# macOS

## Prerequisites

Make sure Python is installed on your system. You can verify this by opening the Terminal and running the command `python -v`. If Python is installed and the version is 3.9 or newer, you're all set.

You can download the latest Python installer by either selecting "macOS 64-bit universal2 installer" from the [Python Downloads Page](https://www.python.org/downloads/latest/) or by using [Homebrew](https://brew.sh).

:::tip[Homebrew Installation]

To install Homebrew, run the following command in your Terminal:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, you can install Python by running:

```
brew install python@3.13
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

:::tip[Virtual Environments]
You don't need to create a new virtual environment every time. Once created, you can reuse it by remembering its path and navigating to it using `cd`. To find the current path of your virtual environment, you can use the `pwd` command. If you close your terminal, the `(venv)` prefix in your prompt will disappear, indicating that the virtual environment is no longer active. To reactivate it, simply run the activation command again:

```
source venv/bin/activate
```
For convenience, you can automate this process by adding the activation command to your shell's startup file, such as `.bashrc` for Bash users.

To determine if you are using Bash, you can run the following command in your terminal:
```
echo $SHELL
```
:::

## Install `aniworld` from PyPI using pip

```
pip install aniworld
```

## Updating `aniworld`

To update `aniworld` to the latest version, use the following command:

```
pip install --upgrade aniworld
```
