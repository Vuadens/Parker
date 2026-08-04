#!/usr/bin/env python3
"""
Parker worker · resolve.py

Given a URL, uses yt-dlp to list available video/audio formats without
downloading anything. Prints a single JSON object to stdout and exits 0
on success, or prints an error to stderr and exits 1 on failure.

Called by the Node API via child_process.spawn with argv, never through
a shell — so this script never needs to worry about shell-injection from
the URL itself.

Usage: python3 resolve.py <url>
"""
import sys
import json

from yt_dlp import YoutubeDL


def human_size(num_bytes):
    if not num_bytes:
        return None
    mb = num_bytes / (1024 * 1024)
    return round(mb, 1)


def pick_formats(info):
    video, audio = [], []
    for f in info.get("formats", []):
        # Skip formats with no real payload (storyboards, etc.)
        if f.get("vcodec") == "none" and f.get("acodec") == "none":
            continue

        size = f.get("filesize") or f.get("filesize_approx")
        entry = {
            "id": f["format_id"],
            "ext": f.get("ext"),
            "size_mb": human_size(size),
        }

        is_video = f.get("vcodec") not in (None, "none")
        is_audio_only = f.get("vcodec") in (None, "none") and f.get("acodec") not in (None, "none")

        if is_video:
            entry["width"] = f.get("width")
            entry["height"] = f.get("height")
            video.append(entry)
        elif is_audio_only:
            entry["abr"] = round(f.get("abr")) if f.get("abr") else None
            audio.append(entry)

    # Keep it to a sane number of options per channel, best-first.
    video = sorted(video, key=lambda x: (x.get("height") or 0), reverse=True)[:6]
    audio = sorted(audio, key=lambda x: (x.get("abr") or 0), reverse=True)[:4]
    return video, audio


def main():
    if len(sys.argv) != 2:
        print("Usage: resolve.py <url>", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "noplaylist": True,
    }

    try:
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)

    video, audio = pick_formats(info)

    result = {
        "title": info.get("title"),
        "extractor": info.get("extractor_key"),
        "duration": info.get("duration"),
        "video": video,
        "audio": audio,
    }

    print(json.dumps(result))


if __name__ == "__main__":
    main()
