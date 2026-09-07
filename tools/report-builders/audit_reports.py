from pathlib import Path
from zipfile import ZipFile
from docx import Document
import re

notice = "Bu belgeler stajyer öğrencimiz Eyüp Miraç OY'un operasyonları daha iyi öğrenebilmesi ve öğrendiklerini uygulayabilmesi  adına şirket tarafından özel izinle hazırlanmıştır. Üçüncü kişilerce kullanılması ya da paylaşılması yasaktır."
for p in Path('teslim').glob('*.docx'):
    if p.name.startswith('~$'):
        continue
    d = Document(p)
    footer_text = '\n'.join(x.text for s in d.sections for x in s.footer.paragraphs)
    with ZipFile(p) as z:
        bad = z.testzip()
        # Kullanılan belge parçalarını denetle; Word şablonundaki kullanılmayan
        # yerleşik renkli stiller baskı paletini temsil etmez.
        xml = b'\n'.join(z.read(n) for n in z.namelist() if n in ('word/document.xml','word/header1.xml','word/footer1.xml'))
    colors = {x.decode().upper() for x in re.findall(rb'(?:w:color|w:fill)="([0-9A-Fa-f]{6})"', xml)}
    neutral = all(c[0:2] == c[2:4] == c[4:6] for c in colors)
    print(p.name, 'paras=', len(d.paragraphs), 'tables=', len(d.tables), 'sections=', len(d.sections), 'footer_ok=', notice in footer_text, 'zip_ok=', bad is None, 'neutral_palette=', neutral, 'bytes=', p.stat().st_size)
    if 'Siyah_Beyaz' in p.name and not neutral:
        print('non_neutral=', sorted(c for c in colors if not (c[0:2] == c[2:4] == c[4:6])))
