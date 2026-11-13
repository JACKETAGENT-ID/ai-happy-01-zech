# Hugging the Moon

A tiny astronaut in a white suit hugs a big smiling crescent moon, floating
in a deep indigo night sky scattered with golden stars like confetti. The
flat-vector artwork pairs the calm of the night with the warmth of a small,
wholehearted hug — a moment of pure, uncomplicated joy.

## Run

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts   # writes out/entry.png
```

The program copies `happy.png` byte-for-byte to `$MAKEFUN_OUTPUT_DIR/entry.png`
(or `/output/entry.png` when the variable is unset). Node 22, standard
library only, no network access.
