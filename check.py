from pathlib import Path
from html.parser import HTMLParser
import re,subprocess
root=Path(__file__).parent
errors=[]
class Page(HTMLParser):
 def __init__(self): super().__init__();self.ids=[];self.links=[];self.headings=0;self.alt=[];self.lang=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='h1':self.headings+=1
  if tag=='html':self.lang=a.get('lang')=='pt-BR'
  if tag=='img' and not a.get('alt'):self.alt.append(a.get('src'))
  for k in ('href','src'):
   if k in a:self.links.append(a[k])
for f in root.rglob('*.html'):
 p=Page();p.feed(f.read_text())
 if p.headings!=1:errors.append(f'{f}: expected 1 h1, got {p.headings}')
 if not p.lang:errors.append(f'{f}: missing pt-BR')
 if len(set(p.ids))!=len(p.ids):errors.append(f'{f}: duplicate ids')
 if p.alt:errors.append(f'{f}: images missing alt {p.alt}')
 for link in p.links:
  if link.startswith(('http:','https:','mailto:','tel:','data:')):continue
  path,_,anchor=link.partition('#')
  target=(f.parent/path).resolve() if path else f
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'{f}: broken link {link}')
  elif anchor and target.suffix=='.html':
   q=Page();q.feed(target.read_text())
   if anchor not in q.ids:errors.append(f'{f}: missing fragment {link}')
for f in root.rglob('*.js'):
 r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
 if r.returncode:errors.append(r.stderr)
assert len(list(root.glob('*/index.html')))==5
if errors:raise SystemExit('\n'.join(errors))
print('PASS: 5 landing pages + gallery; HTML ids, local links, fragments, image alt text, language and JavaScript syntax.')
