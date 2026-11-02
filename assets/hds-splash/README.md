# Holy Doughnut Studio splash

The animated studio logo (winged doughnut with a halo) as a drop-in splash screen for any web game or page.
One file, `hds-splash.js` (about 58 KB, no dependencies): the logo SVG, its CSS and the animation are all inside.

First used in Donut Town (its copy lives in the game source as `src/js/28-splash.js`). The animation comes from the
"Holy Doughnut Studio" logo artifact.

## What it does

About 4 seconds, then it fades out over the page (the page is already loaded underneath, so there is no wait):

| Time (s) | Part |
|---|---|
| 0.0–0.55 | black body and lettering block rises in |
| 0.2–1.0 | cyan sunburst pops out with a white flash, rays spin down to a slow drift |
| 0.45–1.3 | doughnut drops in with a bounce and spins; sprinkles pop on |
| 0.85–1.9 | wings unfurl with an elastic swing, then flap |
| 0.95–2.1 | HOLY DOUGHNUT lettering is scanned in, top to bottom |
| 1.45–2.6 | halo drops onto the top, wobbles, a ring ripples out |
| 1.95–2.8 | STUDIO letters pop up one by one |
| 3.0+ | idle: flapping, sway, colour sheen over the lettering, twinkles |
| 4.1 | fade out (0.45 s) |

A tap, click or any key skips it. Keys and taps are swallowed until the fade has finished, so a skip never also
presses a button in the page. With "reduce motion" turned on, the finished logo is shown for 1.6 s instead.

## Use it

```html
<script src="https://hole-donuts.github.io/Official-Website/assets/hds-splash/hds-splash.js"></script>
<script>
  HDSSplash.show({ lang: 'id' }).then(() => {
    /* the splash has gone: start music, focus the menu, … */
  });
</script>
```

Or copy `hds-splash.js` into the project (for single-file builds, paste it into the page's `<script>`).
Render the title screen first and call `show()` right after, so the title is already there when the splash fades.

### Options

| Option | Default | |
|---|---|---|
| `lang` | from the browser | `'id'` or `'en'`, for the "Tap to skip" line |
| `skipText` | `Ketuk untuk lewati` / `Tap to skip` | any text, or `false` to hide the line |
| `theme` | `'light'` | `'light'` (#edf5f6), `'cyan'`, `'purple'`, `'dark'` |
| `duration` | `4.1` | seconds before the fade starts (never shorter than the 3 s intro) |
| `skippable` | `true` | `false` = always plays to the end |
| `parent` | `document.body` | element the splash is added to |
| `zIndex` | `2147483000` | stacking order |
| `storageKey` | `'hds-nosplash'` | if `localStorage[storageKey] === '1'` the splash is skipped (handy for automated tests) |
| `onDone` | none | called when it has gone (same moment the promise resolves) |

`show()` returns a promise that resolves `true` when the splash has gone, or `false` at once if it was turned off.
Adding `?nosplash` to the page URL also turns it off.

### Other things on `HDSSplash`

* `HDSSplash.SVG`: the logo markup (ids start with `hds-`).
* `HDSSplash.renderer(element)`: returns `draw(t)` that poses the logo inside `element` at `t` seconds. Use it to
  render frames yourself, for a video or a trailer.
* `HDSSplash.INTRO`: 3.0, the length of the intro.

## Other engines (Godot, Unity)

Rebuild it as an animation of separate parts: body + lettering, sunburst disc + rays, flash, doughnut, sprinkles,
two wings (one mirrored, pivot at the wing root 121,150 in SVG units), halo, halo ring, STUDIO letters. The `draw(t)`
function in `hds-splash.js` lists every part with its start time, duration and easing (out-back, out-bounce,
out-elastic, in-out-cubic), so the timing can be copied exactly.

## Files

* `hds-splash.js`: the splash.
* `demo.html`: try it, with replay and theme buttons.
