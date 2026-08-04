#!/usr/bin/env python3
"""
Parker worker · download.py

Downloads a single previously-resolved format_id for a URL into a given
output directory, then prints the resulting file path and size as JSON.

Usage: python3 download.py <url> <format_id> <out_dir>
"""
import sys
import os
import json
import glob

from yt_dlp import YoutubeDL


def main():
    if len(sys.argv) != 4:
        print("Usage: download.py <url> <format_id> <out_dir>", file=sys.stderr)
        sys.exit(1)

    url, format_id, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]
    os.makedirs(out_dir, exist_ok=True)

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "format": format_id,
        "outtmpl": os.path.join(out_dir, "%(title).80s.%(ext)s"),
    }

    try:
        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)

    files = glob.glob(os.path.join(out_dir, "*"))
    if not files:
        print("No file was produced", file=sys.stderr)
        sys.exit(1)

    file_path = max(files, key=os.path.getctime)
    size_mb = round(os.path.getsize(file_path) / (1024 * 1024), 2)

    print(json.dumps({"filePath": file_path, "fileSizeMb": size_mb}))


if __name__ == "__main__":
    main()
