from pathlib import Path

from PIL import Image, ImageStat


SAMPLES = Path(r"C:\Users\vitor\Documents\Ferramentas\tmp\pdfs\apresentacao-check")


def main() -> None:
    images = sorted(path for path in SAMPLES.glob("*.png") if path.stat().st_size > 0)
    if not images:
        raise FileNotFoundError(f"No rendered samples found in {SAMPLES}")

    blank = []
    for path in images:
        with Image.open(path) as image:
            stat = ImageStat.Stat(image.convert("RGB"))
            extrema = image.convert("RGB").getextrema()
            varied_channels = sum(1 for lo, hi in extrema if hi > lo)
            if varied_channels == 0 or max(stat.stddev) < 0.5:
                blank.append(path.name)
            print(f"{path.name}: {image.width}x{image.height}, stddev={max(stat.stddev):.2f}")

    print(f"Checked images: {len(images)}")
    if blank:
        raise ValueError("Possibly blank samples: " + ", ".join(blank))


if __name__ == "__main__":
    main()
