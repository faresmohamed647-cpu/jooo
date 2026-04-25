import re

with open('project-details.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the span wrappers I added
html = re.sub(r'<span data-i18n="pd\.[^"]+">(.*?)</span>', r'\1', html, flags=re.DOTALL)

# Remove the data-i18n attributes I added directly to tags
html = re.sub(r'\sdata-i18n="pd\.[^"]+"', '', html)

with open('project-details.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Reverted HTML")
