# macOS

## Command Not Found

Encountering a "command not found" error typically indicates that the program or script you're trying to execute is not in your system's PATH. Follow these steps to resolve the issue:

1. **Check PATH**: Verify if the directory containing the program is included in your PATH environment variable:
    ```bash
    echo $PATH
    ```
    If the directory is not listed, you can temporarily add it:
    ```bash
    export PATH=$PATH:/path/to/program
    ```
    To make this change permanent, append the above line to your shell configuration file (e.g., `~/.bashrc` or `~/.zshrc`).