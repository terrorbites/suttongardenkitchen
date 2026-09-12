"""Re-encode local fonts as WOFF2. Optional tooling: pip install fonttools brotli."""
from pathlib import Path
from fontTools.ttLib import TTFont

directory = Path(__file__).resolve().parents[1] / "dist" / "fonts"
for name in ("fraunces-semibold", "fraunces-semibold-italic", "shrikhand-regular"):
    source = directory / f"{name}.ttf"
    output = directory / f"{name}.woff2"
    font = TTFont(source, recalcBBoxes=False, recalcTimestamp=False)
    original_glyphs = font.getGlyphOrder()
    original_cmap = font.getBestCmap()
    font.flavor = "woff2"
    font.save(output)
    font.close()
    result = TTFont(output)
    assert result.getGlyphOrder() == original_glyphs
    assert result.getBestCmap() == original_cmap
    result.close()
    print(f"{name}: {source.stat().st_size:,} -> {output.stat().st_size:,} bytes")
