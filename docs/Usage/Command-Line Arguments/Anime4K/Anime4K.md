# Anime4K Setup Guide

[Anime4K](https://github.com/bloc97/Anime4K) is a high-quality real-time upscaler designed for anime videos.

## Configuration for High-Performance GPUs
If you have a high-end GPU, such as:

- **NVIDIA**: GTX 1080, RTX 2070, RTX 3060, ...
- **AMD**: RX 590, Vega 56, 5700XT, 6600XT, ...
- **Apple Silicon**: M1 Pro/Max/Ultra, M2 Pro/Max, ...

Run the following command to optimize Anime4K for your GPU:

```
aniworld --anime4k High
```

## Configuration for Low-Performance GPUs
For low-end or integrated GPUs, such as:

- **NVIDIA**: GTX 980, GTX 1060, ...
- **AMD**: RX 570, ...
- **Apple Silicon**: M1, M2, ...
- **Intel**: Integrated GPUs

Use this command to configure Anime4K for better performance:

```
aniworld --anime4k Low
```

## Uninstalling Anime4K
To completely remove Anime4K from your setup, run:

```
aniworld --anime4k Remove
```

## File Locations
Anime4K stores its files in the **mpv** directory. The location varies by operating system:

- **Windows**: `C:\Users\<YourUsername>\AppData\Roaming\mpv`
- **macOS**: `/Users/<YourUsername>/.config/mpv`
- **Linux**: `/home/<YourUsername>/.config/mpv`

## Switching Modes
You can switch between `High` and `Low` modes at any time to match your GPU's performance. Use the appropriate command (`High` or `Low`) to reconfigure Anime4K as needed.

For a clean removal of Anime4K, use the `Remove` option as described above.