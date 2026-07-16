from pathlib import Path

from pypdf import PdfReader, PdfWriter


SOURCE_DIR = Path("C:/Users/vitor/Desktop/Apresenta\u00e7\u00e3o Full")
OUTPUT_DIR = Path(r"C:\Users\vitor\Documents\Ferramentas\output\pdf")
OUTPUT_FILE = OUTPUT_DIR / "apresentacao-full-organizada.pdf"
ORDER_LOG = OUTPUT_DIR / "apresentacao-full-organizada-ordem.txt"


ORDER = [
    "1.pdf",
    "2.pdf",
    "3.pdf",
    "4.pdf",
    "5.pdf",
    "6.pdf",
    "6.1.pdf",
    "6.2.pdf",
    "6.3.pdf",
    "6.4.pdf",
    "7.pdf",
    "7.1.pdf",
    "7.2.pdf",
    "7.3.pdf",
    "7.4.pdf",
    "8.pdf",
    "8.1.pdf",
    "8.2.pdf",
    "8.3.pdf",
    "8.4.pdf",
    "9.pdf",
    "10.pdf",
    "11.pdf",
    "12.pdf",
    "13.pdf",
    "14.pdf",
    "15.pdf",
    "16.pdf",
    "17.1.pdf",
    "18.1.pdf",
    "19.1.pdf",
    "20.1.pdf",
    "21.1.pdf",
    "17.2.pdf",
    "18.2.pdf",
    "19.2.pdf",
    "20.2.pdf",
    "21.2.pdf",
    "22.pdf",
    "23.pdf",
]


def main() -> None:
    missing = [name for name in ORDER if not (SOURCE_DIR / name).is_file()]
    if missing:
        joined = "\n".join(f"- {name}" for name in missing)
        raise FileNotFoundError(f"Missing expected PDFs:\n{joined}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    writer = PdfWriter()
    log_lines = []
    total_pages = 0

    for name in ORDER:
        path = SOURCE_DIR / name
        reader = PdfReader(str(path))
        page_count = len(reader.pages)
        total_pages += page_count
        log_lines.append(f"{name}: {page_count} page(s)")
        for page in reader.pages:
            writer.add_page(page)

    with OUTPUT_FILE.open("wb") as stream:
        writer.write(stream)

    ORDER_LOG.write_text(
        "\n".join(
            [
                f"Output: {OUTPUT_FILE}",
                f"Source: {SOURCE_DIR}",
                f"Files: {len(ORDER)}",
                f"Pages: {total_pages}",
                "",
                *log_lines,
                "",
            ]
        ),
        encoding="utf-8",
    )

    print(f"Wrote: {OUTPUT_FILE}")
    print(f"Files: {len(ORDER)}")
    print(f"Pages: {total_pages}")
    print(f"Order log: {ORDER_LOG}")


if __name__ == "__main__":
    main()


