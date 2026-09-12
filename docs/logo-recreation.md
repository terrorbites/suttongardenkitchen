# Logo recreation

The original logo photograph cuts off both sides of the emblem. The recreated logo restores the complete oval and all lettering while retaining the green foliage, cream serif text and tan border.

- Source: `dist/images/sutton-garden-kitchen-logo.jpg` (original preserved).
- Final asset: `dist/brand/sutton-garden-kitchen-logo.png`.
- Dimensions: 1536 × 1024 pixels.
- Mode: built-in image generation, edit mode.
- Background: clean opaque near-white; this PNG does not have transparency. The header uses CSS multiply blending to sit on the cream page background.
- Visual check: complete perimeter, exact “SUTTON / Garden / Kitchen” spelling, no cropped letters or checkerboard background.

## Initial reconstruction prompt

```text
Use case: precise-object-edit.
Asset type: final high-resolution raster brand logo for a website header and reuse.
Input image 1 is the edit target: the existing Sutton Garden Kitchen oval emblem has its left and right edges cropped off.
Primary request: faithfully reconstruct this same logo as ONE complete, uncropped, centred oval emblem. Preserve its recognizable established brand appearance. Cleanly restore both missing side edges and adjust the lettering inside the oval just enough so every letter is fully visible with comfortable breathing room.
Design invariants: horizontal oval shape with a tan/ochre outline; cream/pale-green upper field containing the original style of green leafy branches; thin tan and cream horizontal divider; olive-green lower field; elegant cream serif lettering in exactly three centred lines. The first line is the largest and dominant; second and third lines are successively smaller.
Text verbatim, all fully visible:
SUTTON
Garden
Kitchen
Check spelling letter by letter: S-U-T-T-O-N, G-a-r-d-e-n, K-i-t-c-h-e-n.
Composition: high resolution landscape canvas approximately 1536 x 1024. Complete oval perimeter clearly visible on all sides, centred with a small even transparent margin. Let the full emblem occupy most of the canvas. No letter touches the oval outline or image edge; especially preserve the entire first S and last N of SUTTON.
Style: clean polished raster reproduction of the source logo, smooth sharp edge and legible serif typography, faithful green, cream and tan colours. Subtle existing foliage tonal variation is fine.
Background: genuinely transparent alpha everywhere outside the oval, no white rectangle and no simulated checkerboard.
Avoid: extra slogan, extra text, watermark, mockup, webpage, invented symbols, additional decorations, cut-off lettering, cropped perimeter. Output only the one final logo.

```

## Final background-cleanup prompt

```text
Use case: precise-object-edit.
Input image 1 is the edit target.
Make exactly one change: replace the entire grey checkerboard OUTSIDE the tan oval with a completely plain solid white background, RGB #FFFFFF. Remove every checkerboard square, texture, shadow and speck outside the oval. Do not use transparency. Do not show a checkerboard. The only material outside the logo perimeter must be pure flat opaque white.
Preserve the complete existing logo, its shape and contents: golden-tan oval outline, cream/pale-green upper field, green leafy branches, olive-green lower field, cream serif text exactly 'SUTTON' / 'Garden' / 'Kitchen' in the same three centred lines. Preserve the wording, type sizes, foliage and arrangement. Keep all letters and every part of the oval fully visible. Keep 1536x1024 landscape canvas, centred complete oval and the existing small margins. Crisp clean edge. Output just the single final reusable logo.
```
