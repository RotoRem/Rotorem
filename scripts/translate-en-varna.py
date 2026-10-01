import re
import pathlib
from deep_translator import GoogleTranslator

tr = GoogleTranslator(source="bg", target="en")
root = pathlib.Path(__file__).resolve().parent.parent / "src/pages/en/services"
files = [
    "washing-machine-repair.astro",
    "dryer-repair.astro",
    "dishwasher-repair.astro",
    "oven-repair.astro",
    "boiler-repair.astro",
    "electrical-services.astro",
]
cache: dict[str, str] = {}

CYR = re.compile(r"[А-Яа-яЁё]")


def translate(text: str) -> str:
    text = text.strip()
    if not text or not CYR.search(text):
        return text
    if text in cache:
        return cache[text]
    try:
        out = tr.translate(text)
    except Exception:
        out = text
    cache[text] = out
    return out


def translate_quoted_strings(block: str) -> str:
    pattern = re.compile(r"""(['"])((?:\\.|(?!\1).)*)\1""")

    def repl(m: re.Match) -> str:
        q, s = m.group(1), m.group(2)
        if not CYR.search(s):
            return m.group(0)
        return q + translate(s) + q

    return pattern.sub(repl, block)


for name in files:
    fp = root / name
    c = fp.read_text(encoding="utf-8")
    parts = c.split("---")
    if len(parts) < 3:
        print("skip", name)
        continue
    parts[1] = translate_quoted_strings(parts[1])
    body = translate_quoted_strings("---".join(parts[2:]))
    fp.write_text(parts[0] + "---" + parts[1] + "---" + body, encoding="utf-8")
    print("Translated", name)

print("Total cache entries:", len(cache))
