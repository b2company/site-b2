#!/usr/bin/env python3
"""Remove barra do WordPress do HTML"""
import re

print("🔄 Lendo arquivo...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

original_size = len(html)

# Remover CSS do WP Admin Bar
print("🗑️  Removendo CSS do WordPress...")
html = re.sub(r'<style>[^<]*?#wpadminbar.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<style>/\*! This file is auto-generated \*/html\{--wp-admin.*?</style>', '', html, flags=re.DOTALL)

# Remover div do WP Admin Bar
print("🗑️  Removendo HTML do WordPress...")
html = re.sub(r'<div id="wpadminbar".*?</div>\s*(?=<div)', '', html, flags=re.DOTALL)

# Remover scripts relacionados
html = re.sub(r'<script[^>]*wp-admin[^>]*>.*?</script>', '', html, flags=re.DOTALL)

new_size = len(html)
reduction = original_size - new_size

print(f"✅ WordPress removido!")
print(f"📊 Tamanho original: {original_size:,} bytes")
print(f"📊 Tamanho novo: {new_size:,} bytes")
print(f"📉 Redução: {reduction:,} bytes ({reduction/original_size*100:.1f}%)")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Arquivo index.html atualizado!")
