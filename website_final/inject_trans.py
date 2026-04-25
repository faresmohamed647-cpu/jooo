import json
import re

with open('pd_translations.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

en_trans = data['en']
ar_trans = data['ar']

def dict_to_js(d):
    lines = []
    for k, v in d.items():
        val = json.dumps(v, ensure_ascii=False)
        lines.append(f"    '{k}': {val},")
    return "\n".join(lines)

en_js = "\n    // Project Details\n" + dict_to_js(en_trans)
ar_js = "\n    // Project Details\n" + dict_to_js(ar_trans)

with open('script.js', 'r', encoding='utf-8') as f:
    script = f.read()

# Insert en_js right before "ar: {"
script = re.sub(r'(\n\s*)(ar:\s*\{)', lambda m: en_js + m.group(1) + m.group(2), script)

# Insert ar_js right before the end of the ar object which ends right before "};"
script = re.sub(r'(\n\s*)(\}\s*;\s*\n\s*// Text replacements engine)', lambda m: ar_js + m.group(1) + m.group(2), script)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(script)

print("Injected into script.js")
