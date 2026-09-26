"""Generate a minimal valid placeholder public/resume.pdf (one page, one line).

ponytail: throwaway so the M2 resume download has a real file to serve.
Replace with the real resume PDF when available; delete this script then.
"""
import os

stream = b"BT /F1 24 Tf 72 770 Td (Faustzaki - Creative Developer & UI/UX Designer) Tj ET"
objs = [
    b"<</Type/Catalog/Pages 2 0 R>>",
    b"<</Type/Pages/Kids[3 0 R]/Count 1>>",
    b"<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>",
    b"<</Length %d>>stream\n%s\nendstream" % (len(stream), stream),
    b"<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
]

out = b"%PDF-1.4\n"
offsets = []
for i, o in enumerate(objs, 1):
    offsets.append(len(out))
    out += b"%d 0 obj\n%s\nendobj\n" % (i, o)
xref_pos = len(out)
out += b"xref\n0 %d\n0000000000 65535 f \n" % (len(objs) + 1)
for off in offsets:
    out += b"%010d 00000 n \n" % off
out += b"trailer<</Size %d/Root 1 0 R>>\nstartxref\n%d\n%%%%EOF\n" % (len(objs) + 1, xref_pos)

path = os.path.join(os.path.dirname(__file__), "..", "public", "resume.pdf")
os.makedirs(os.path.dirname(path), exist_ok=True)
with open(path, "wb") as f:
    f.write(out)

with open(path, "rb") as f:
    data = f.read()
assert data.startswith(b"%PDF-1.4"), "missing PDF header"
assert b"%%EOF" in data[-32:], "missing EOF marker"
print("verify ok:", data[:8], len(data), "bytes ->", os.path.abspath(path))
