# Windows

## Command Not Found

If you encounter a "command not found" error, it usually means the program or script you're trying to run is not in your system's PATH. Here's how to fix it:

![Adding Python to PATH](https://github.com/phoenixthrush/AniWorld-Downloader/blob/next/.github/assets/Python_Add_to_Path_Tutorial.png?raw=true)

1. **Verify PATH**: Check if the program's directory is included in your PATH environment variable:
    ```cmd
    echo %PATH%
    ```
    If the directory is missing, you can temporarily add it:
    ```cmd
    set PATH=%PATH%;C:\path\to\program
    ```
    To make this change permanent, update the PATH environment variable:
    - Open the Start Menu, search for "Environment Variables," and select "Edit the system environment variables."
    - In the System Properties window, click "Environment Variables."
    - Under "System variables," locate and edit the `Path` variable to include the program's directory.