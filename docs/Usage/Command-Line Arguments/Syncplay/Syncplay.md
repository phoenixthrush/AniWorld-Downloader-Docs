# Syncplay

## Syncplay Options

Host anime sessions with friends using Syncplay for perfect sync.

### Hostname

Set the Syncplay server address to connect with friends for synchronized playback.

**Argument:** `--hostname` (short: `-sH`)

**Default:** `syncplay.pl:8997`

:::tip[Official Syncplay Servers (hosted in France)]
- syncplay.pl:8995
- syncplay.pl:8996
- syncplay.pl:8997
- syncplay.pl:8998
- syncplay.pl:8999
:::

**Example:** `--hostname Beans`

### Username

Set the username that will appear to others in the room when you connect to the Syncplay server.

**Argument:** `--username` (short: `-sU`)

**Default:** `<your system's username>`  

:::tip[Default Username]
The username defaults to the one configured on your operating system. You can override it by specifying a custom username.
:::

**Example:** `--username Chungus`

### Room

Set the Syncplay room where you and others can join for synchronized playback.

**Argument:** `--room` (short: `-sR`)

**Default:** The default room is dynamically generated based on the title of the media being played. If a password is provided, it is appended to the room name. The resulting string is hashed using SHA-256 to create a unique room identifier.

**Example Default Room:** `AniWorld_Downloader.<hashed_room_name>`

:::tip[Default Room]
If no room is specified, Syncplay will connect you to the default room. You can specify a custom room name to create or join a specific room.
:::

**Example:** `--room AnimeNight`

### Password

Set a password for your Syncplay room to restrict access and ensure privacy during your sessions. This ensures that only trusted participants can join, so nobody will interrupt your session with friends.

**Argument:** `--password` (short: `-sP`)

**Default:** No password is set by default.

**Example:** `--password Ballsack`
