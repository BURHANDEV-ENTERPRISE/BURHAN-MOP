# MOP Flow Skill Builder Guide

MOP Flow menyokong integrasi agent skills yang mudah alih (portable) merentas pelbagai model seperti Claude, Codex, Gemini, dan Antigravity. Dokumen ini menerangkan cara membina *skill* baharu untuk MOP Flow.

## Lokasi Skill

Skill rasmi MOP Flow disimpan dalam dua kategori:
- **Portable Skills:** `.agents/skills/` (Berfungsi di semua AI agent)
- **Runtime Native Skills:** `.claude/skills/` (Berfungsi secara natif melalui integrasi Ruflo)

MOP Flow secara automatik membina satu `skill-manifest.json` dan menyatukan semua ini menjadi *bridged skills*.

## Format Skill (SKILL.md)

Setiap skill mesti mempunyai fail `SKILL.md` dalam sebuah folder tersendiri.
Folder tersebut akan menjadi `id` skill tersebut.

Contoh `SKILL.md`:
```markdown
---
name: my-new-skill
description: "Penerangan padat kemahiran anda."
---

# my-new-skill

Arahan untuk agent apabila mereka menggunakan kemahiran ini.

## Langkah:
1. ...
2. ...

## Tools / Skrip Tambahan
Anda boleh merujuk skrip tambahan jika kemahiran anda mempunyai folder `scripts/` atau kod khas.
```

## Cara Tambah

1. Buat folder baharu di dalam `.agents/skills/nama-skill-anda`.
2. Letakkan fail `SKILL.md` berserta apa jua skrip tambahan.
3. Jalankan `node .MOP/scripts/mop-flow.mjs manifest refresh` untuk kemaskini manifest.
4. Uji skill tersebut dengan agen kegemaran anda.

Sila gunakan fail `SKILL.md` sebagai tempat mutlak untuk agent membaca arahan dan memahami logik skill tersebut. MOP Flow sangat memandang tinggi integriti fail teks atas arahan terus dari LLM.
