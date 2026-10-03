"""Check every generated HTML page and its local links without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib
import struct

ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.h1 = 0
        self.main = 0
        self.lang = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate id: {attrs['id']}"
            self.ids.add(attrs['id'])
        if tag == 'html':
            self.lang = attrs.get('lang')
        self.h1 += tag == 'h1'
        self.main += tag == 'main'
        if tag == 'img':
            assert 'alt' in attrs, 'Image missing alt'
            assert 'width' in attrs and 'height' in attrs, 'Image missing dimensions'
        for attribute in ('href', 'src'):
            if attribute in attrs:
                self.links.append(attrs[attribute])


def check():
    pages = {}
    for path in ROOT.rglob('*.html'):
        parser = PageParser()
        parser.feed(path.read_text(encoding='utf-8'))
        assert parser.h1 == 1 and parser.main == 1, f'{path}: heading or main landmark'
        assert parser.lang == 'ja', f'{path}: document language'
        pages[path.resolve()] = parser
    assert len(pages) == 5, f'Expected 5 pages, got {len(pages)}'
    for path, parser in pages.items():
        for link in parser.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            target = ((ROOT if url.path.startswith('/') else path.parent) / unquote(url.path.lstrip('/'))).resolve() if url.path else path
            if target.is_dir():
                target /= 'index.html'
            assert target.is_file(), f'{path}: broken link {link}'
            if url.fragment:
                assert target in pages and unquote(url.fragment) in pages[target].ids, f'{path}: missing anchor {link}'
    kv = (ROOT / 'assets' / 'KV.png').read_bytes()
    assert kv[:8] == b'\x89PNG\r\n\x1a\n'
    assert struct.unpack('>II', kv[16:24]) == (1672, 941), 'Unexpected KV dimensions'
    print(f'PASS: {len(pages)} pages, all local assets/links/anchors, landmarks, image dimensions.')
    print('KV SHA256:', hashlib.sha256(kv).hexdigest())


if __name__ == '__main__':
    check()
