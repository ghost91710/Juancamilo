from html.parser import HTMLParser
from pathlib import Path
from xml.sax.saxutils import escape
import re
import cairo
import gi
gi.require_version('Pango', '1.0')
gi.require_version('PangoCairo', '1.0')
from gi.repository import Pango, PangoCairo

class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(); self.body=False; self.current=None; self.blocks=[]; self.text=''
    def handle_starttag(self, tag, attrs):
        if tag=='body': self.body=True
        if not self.body:return
        if tag in ('h1','h2','p','li'):self.current=tag;self.text=''
        elif self.current and tag=='br':self.text+='\n'
        elif self.current and tag=='b':self.text+='<b>'
    def handle_endtag(self,tag):
        if tag=='b' and self.current:self.text+='</b>'
        if tag==self.current:
            self.blocks.append((tag,self.text.strip()));self.current=None
    def handle_data(self,data):
        if self.current:self.text+=escape(re.sub(r'\s+', ' ', data))

parser=Blocks();parser.feed(Path('docs/cv/juan-camilo.html').read_text())
surface=cairo.PDFSurface('src/assets/cv-JuanCamiloGonzalez.pdf',595.28,841.89)
surface.set_metadata(cairo.PDF_METADATA_TITLE,'Juan Camilo González Muñoz — CV')
surface.set_metadata(cairo.PDF_METADATA_AUTHOR,'Juan Camilo González Muñoz')
ctx=cairo.Context(surface); y=32
for tag, text in parser.blocks:
    if tag=='h2':
        y+=6;ctx.set_source_rgb(.85,.74,.1);ctx.rectangle(40,y,515,2);ctx.fill();y+=7
    size={'h1':19,'h2':10,'p':9,'li':9}[tag]
    layout=PangoCairo.create_layout(ctx)
    layout.set_font_description(Pango.FontDescription(f'DejaVu Sans {"Bold " if tag in ("h1","h2") else ""}{size}'))
    # Pango uses points mapped through its default 96 DPI; set PDF resolution to 72.
    PangoCairo.context_set_resolution(layout.get_context(),72)
    layout.set_width(int((505 if tag=='li' else 515)*Pango.SCALE));layout.set_spacing(int(1.4*Pango.SCALE))
    layout.set_markup(('•  ' if tag=='li' else '')+text,-1)
    _,logical=layout.get_extents();height=logical.height/Pango.SCALE
    if y+height>810:raise RuntimeError(f'CV overflows page at {tag}: {y+height}')
    ctx.set_source_rgb(.12,.12,.12);ctx.move_to(45 if tag=='li' else 40,y);PangoCairo.show_layout(ctx,layout)
    y+=height+(2 if tag=='li' else 5)
surface.finish();print(f'One page rendered; content ends at {y:.1f} pt')
