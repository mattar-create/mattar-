from pathlib import Path

from pypdf import PdfReader


PDF = Path(r"C:\Users\vitor\Documents\Ferramentas\output\pdf\apresentacao-full-organizada.pdf")


def main() -> None:
    reader = PdfReader(str(PDF))
    sizes = []
    for index, page in enumerate(reader.pages, start=1):
        box = page.mediabox
        width = round(float(box.width), 2)
        height = round(float(box.height), 2)
        sizes.append((width, height))
        print(f"{index:02d}: {width} x {height}")

    unique_sizes = sorted(set(sizes))
    print(f"Pages: {len(reader.pages)}")
    print(f"Unique page sizes: {unique_sizes}")


if __name__ == "__main__":
    main()
