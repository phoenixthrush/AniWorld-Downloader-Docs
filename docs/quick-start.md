# Installation

This guide will walk you through the steps to install aniworld on your system.

## Prerequisites

Ensure you have Python 3.10 or higher installed on your system.

### Windows

:::: details

#### Windows Installer (64-bit)

Download the latest Python 3.13 installer from the [official Python website](https://www.python.org/downloads/windows/).

::: warning
Because of the `windows-curses` dependency required to run the npyscreen-based UI on Windows, only Python 3.10 until Python 3.13 is supported. Python 3.14 and later will not work on Windows as of right now.

The other functionality of aniworld for example the webui will continue to work on Python 3.14 and later.

Feel free to check the [download page](https://pypi.org/project/windows-curses/#files) for more information.
:::

::: info
Note that Python 3.13.x cannot be used on Windows 7 or earlier.
:::

#### Install Python

Run the installer and follow the instructions. Make sure to check the box that says "Add python.exe to PATH" during installation.

![Add Python to PATH](https://github.com/phoenixthrush/AniWorld-Downloader/blob/models/.github/assets/Python_Add_to_Path_Tutorial.png?raw=true)

#### Verify Installation

To verify that Python is installed on your system, you can run the following command in your terminal:

```bash
py --version
```

or

```bash
python --version
```

This should display the version of Python that is installed. If you see the version number, then Python is installed correctly.

::::

### Linux/Unix

::: details

#### Install Python

You can install Python using your distribution's package manager. For example, on Debian-based systems (like Ubuntu), you can run:

```bash
sudo apt update
sudo apt install python3 python3-pip
```

On Red Hat-based systems (like Fedora), you can run:

```bash
sudo dnf install python3 python3-pip
```

On Arch Linux, you can run:

```bash
sudo pacman -S python python-pip
```

#### Verify Installation

To verify that Python is installed on your system, you can run the following command in your terminal:

```bash
python3 --version
```

This should display the version of Python that is installed. If you see the version number, then Python is installed correctly.
:::

### MacOS

::: details

#### Install Python using Homebrew

You can install Python using Homebrew. If you don't have Homebrew installed, you can install it by running the following command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once you have Homebrew installed, you can install Python by running:

```bash
brew install python@3.13
```

#### Install Python using pyenv

If you want to use pyenv to manage your Python versions, you can install Python 3.13 using pyenv with the following command:

```bash
# Install pyenv dependencies
brew install openssl readline sqlite3 xz tcl-tk@8 libb2 zstd zlib pkgconfig

# Install pyenv
brew install pyenv

# Set up shell environment for Pyenv in zsh shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init - zsh)"' >> ~/.zshrc

# Restart your shell
exec "$SHELL"

# Install and then switch to the latest Python 3.13 using pyenv
pyenv install 3.13
pyenv global 3.13
```

For more information on how to install pyenv, check out the [pyenv installation guide](https://github.com/pyenv/pyenv?tab=readme-ov-file#macos).

:::

### Source

You can download it from the [official Python website](https://www.python.org/downloads/source/).

## Install aniworld

You can install aniworld using pip. Open your terminal and run the following command:

```bash
pip install aniworld
```

If you want to install the latest development version, you can use pip to install it directly from the GitHub repository:

```bash
pip install --upgrade git+https://github.com/phoenixthrush/AniWorld-Downloader.git@models#egg=aniworld
```

## Verify Installation

To verify that aniworld has been installed correctly, you can run the following command in your terminal:

```bash
aniworld --version
```

This should display the version of aniworld that you have installed. If you see the version number, then the installation was successful!

## Next Steps

Now that you have aniworld installed, you can start using it to download anime content. Check out the [Usage Guide](./usage) for detailed instructions on how to use aniworld effectively.
