"""Translate Cyrillic content in EN Sofia service pages (quoted strings + HTML text)."""
from __future__ import annotations

import pathlib
import re
import time

from deep_translator import GoogleTranslator

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src/pages/en/services/sofia"
FILES = [
    "washing-machine-repair.astro",
    "dryer-repair.astro",
    "dishwasher-repair.astro",
    "oven-repair.astro",
    "boiler-repair.astro",
]

CYR = re.compile(r"[А-Яа-яЁё]")
tr = GoogleTranslator(source="bg", target="en")
cache: dict[str, str] = {}


def translate(text: str) -> str:
    text = text.strip()
    if not text or not CYR.search(text):
        return text
    if text in cache:
        return cache[text]
    for attempt in range(4):
        try:
            out = tr.translate(text)
            break
        except Exception:
            time.sleep(1.5 * (attempt + 1))
            out = text
    else:
        out = text
    cache[text] = out
    return out


def translate_quoted_strings(block: str) -> str:
    pattern = re.compile(r"""(['"])((?:\\.|(?!\1).)*)\1""")

    def repl(m: re.Match[str]) -> str:
        q, s = m.group(1), m.group(2)
        if not CYR.search(s):
            return m.group(0)
        if "prioritizeAppliance" in block[max(0, m.start() - 40) : m.start()]:
            return m.group(0)
        return q + translate(s) + q

    return pattern.sub(repl, block)


def translate_html_text_nodes(block: str) -> str:
    pattern = re.compile(r">([^<>{}]+)<")

    def repl(m: re.Match[str]) -> str:
        inner = m.group(1)
        if not CYR.search(inner):
            return m.group(0)
        stripped = inner.strip()
        if not stripped or not CYR.search(stripped):
            return m.group(0)
        leading = inner[: len(inner) - len(inner.lstrip())]
        trailing = inner[len(inner.rstrip()) :]
        translated = translate(stripped)
        return ">" + leading + translated + trailing + "<"

    return pattern.sub(repl, block)


POST_REPLACEMENTS = [
    ("Roto Rem", "RotoRem"),
    ("Rotorem", "RotoRem"),
    ("Roto Рем", "RotoRem"),
    ("| On address |", "| At Your Home |"),
    ("| At the address |", "| At Your Home |"),
    ("white goods repair", "appliance repair"),
    ("Visit and diagnosis", "Visit and diagnostics"),
    ("After diagnosis", "After diagnostics"),
    ("Upon clarification", "Upon agreement"),
    ("The washing machine is not draining water", "The washing machine won't drain"),
    ("does not spin", "won't spin"),
    ("does not heat", "won't heat"),
    ("does not drain", "won't drain"),
]


def postprocess(text: str) -> str:
    for old, new in POST_REPLACEMENTS:
        text = text.replace(old, new)
    return text


def process_file(name: str) -> None:
    fp = ROOT / name
    content = fp.read_text(encoding="utf-8")
    parts = content.split("---", 2)
    if len(parts) < 3:
        print("skip", name)
        return
    front = translate_quoted_strings(parts[1])
    body = parts[2]
    body = translate_quoted_strings(body)
    body = translate_html_text_nodes(body)
    out = postprocess(parts[0] + "---" + front + "---" + body)
    fp.write_text(out, encoding="utf-8")
    print("Translated", name)


def main() -> None:
    for name in FILES:
        process_file(name)
    print("Cache entries:", len(cache))


if __name__ == "__main__":
    main()
