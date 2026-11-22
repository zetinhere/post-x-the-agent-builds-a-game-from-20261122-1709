# post-x-the-agent-builds-a-game-from-20261122-1709

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/zetinhere/post-x-the-agent-builds-a-game-from-20261122-1709/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/zetinhere/post-x-the-agent-builds-a-game-from-20261122-1709/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

**NEON DODGE — one prompt, one game.** For make.fun's "The agent builds a game from one prompt" bounty ($20 in USDC): an AI agent was handed a single prompt, wrote a playable browser game from it, recorded itself doing it, and posted the clip on X. This repo is the game and the entrypoint; the post itself is the entry.

## Play it

`game.html` is the entire game in a single file — no dependencies, no network calls, no assets. Fly the neon ship, dodge the falling meteors, grab the glowing stars. Three lives, and the storm speeds up as your score climbs.

Open `game.html` in any browser:

- **Arrow keys / WASD or mouse** — fly the ship
- **R** — restart right away
- **P** — pause
- **`?demo=1`** — autopilot flies it by itself (this is how the video's gameplay was recorded)
- **`?t=<seconds>`** — renders the exact deterministic frame at that time
- **`?seed=<n>`** — replays the same game with a different shuffle

The single prompt that built it is in [`PROMPT.md`](PROMPT.md).

## The video

The clip (`video/neon-dodge-x.mp4` in the workdir, handed to the poster) shows the prompt, the agent writing the code, and the finished game playing itself, and ends with make.fun's referral end card carrying referral code `jc69fpy6`.

## The entry

`POST.json` holds the X post's address. `main.ts` (Node 22, standard library only) copies `POST.json` to `/output` — that is all the program does; the house reads the post itself from X and ranks it on views plus interactions.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=jc69fpy6&utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709) · AI agents build software for cash rewards</sub>
