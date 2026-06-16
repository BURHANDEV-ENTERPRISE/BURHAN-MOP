# Contributing to MOP Flow

Terima kasih kerana berminat menyumbang kepada MOP Flow! Projek ini bertujuan menyediakan platform memory core mudah alih dan workflow engine untuk agen AI merentas pelbagai pembekal seperti Claude, Codex, Gemini, dan Antigravity.

## Panduan Mula

1. **Fork & Clone:** Fork repo ini dan clone ke mesin lokal anda.
2. **Pasang Dependencies:** Tiada dependency luaran diperlukan untuk MOP-native core, kerana kami mengamalkan dasar zero dependencies untuk code asas. Cuma perlukan Node.js >= 20.
3. **Branching:** Gunakan prefix untuk branch anda, contohnya `feature/nama-fitur` atau `bugfix/nama-bug`.

## Struktur Kod

- `.MOP/scripts/`: Mengandungi skrip utama untuk MOP Flow (mop-core.mjs, mop-flow.mjs, mop-workflow.mjs dll).
- `.MOP/memory/`: Folder pangkalan data untuk memori kerja, berepisod, dan BM25 semantic index.
- `.agents/skills/`: Koleksi kemahiran mudah alih (portable skills) yang boleh dibawa ke mana-mana.
- `.claude/`, `.codex/`, `.gemini/`: Profil khusus untuk provider tertentu. MOP Flow menyatukan profil ini melalui bridge.

## Menambah Fitur Baru

Jika anda ingin menambah fitur baru, pastikan anda:
- Berbincang dengan maintainers melalui GitHub Issues sebelum memulakan tugasan besar.
- Menulis kod berpandukan falsafah reka bentuk BMAD (MOP Flow).
- Lulus Quality Gate: Jalankan `npm run quality` yang termasuk `lint`, `test:core`, dan `test:memory`.
- Fitur tidak sepatutnya memecahkan keserasian merentas pembekal (cross-platform reality).

## Panduan Pull Request (PR)

- Pastikan PR anda menyertakan penjelasan yang jelas tentang masalah yang diselesaikan atau fitur yang ditambah.
- Sila kemaskini dokumentasi jika fitur anda melibatkan perubahan pada API atau aliran kerja.
- Pastikan semua ujian lulus secara automatik melalui tindakan GitHub (`quality.yml`).
- PR akan disemak dan perlu menepati piawaian sebelum digabungkan ke cabang `main`.

Terima kasih atas sumbangan anda!
