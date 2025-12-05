## DSS Dinamis Menkeu – ANP · Fuzzy · TOPSIS

Aplikasi web ringan (HTML, CSS, dan JavaScript murni) untuk mendukung penentuan prioritas Menteri Keuangan berdasarkan:

- **Cluster A – Kondisi Eksternal**: menggeser bobot kriteria teknis secara dinamis (model ANP sederhana).
- **Cluster B – Kriteria Teknis**: dinilai menggunakan **Fuzzy Logic** (istilah linguistik).
- **TOPSIS**: menggabungkan bobot dinamis dan penilaian untuk menghasilkan peringkat akhir kandidat.

### Menjalankan Aplikasi

1. Pastikan semua file (`index.html`, `style.css`, `app.js`) berada dalam folder yang sama.
2. Buka `index.html` langsung di browser modern (Chrome / Edge / Firefox), atau gunakan server statis sederhana.

### Alur Penggunaan

1. **Set Kondisi Eksternal (A1–A5)**  
   Sistem menghitung ulang bobot dinamis kriteria teknis (Cluster B) secara otomatis.

2. **Tambah Kandidat & Penilaian Fuzzy**  
   Tambahkan beberapa kandidat, lalu beri penilaian linguistik (Sangat Buruk–Sangat Baik) untuk masing-masing kriteria.

3. **Hitung Peringkat (TOPSIS)**  
   Tekan tombol *Hitung Peringkat* untuk melihat skor kedekatan \(CC_i\) dan urutan kandidat dari terbaik ke terendah.

### Deployment ke Vercel via GitHub

1. **Buat Repository GitHub**
   - Buka [GitHub](https://github.com) dan buat repository baru
   - Nama repository: `dss-menkeu-dinamis` (atau nama lain sesuai keinginan)

2. **Push Kode ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DSS Menkeu Dinamis"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
   Ganti `USERNAME` dan `REPO_NAME` dengan username GitHub dan nama repository Anda.

3. **Deploy ke Vercel**
   - Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub
   - Klik **"Add New Project"**
   - Pilih repository yang baru dibuat
   - Vercel akan otomatis mendeteksi konfigurasi:
     - **Framework Preset**: Other
     - **Root Directory**: `./` (atau `./Project` jika root berbeda)
   - Klik **"Deploy"**
   - Tunggu proses deployment selesai
   - Website Anda akan live di URL seperti: `https://your-project.vercel.app`

4. **Auto-Deploy**
   - Setiap kali Anda push perubahan ke GitHub, Vercel akan otomatis deploy ulang
   - Semua deployment tersimpan di dashboard Vercel

### File Struktur
```
Project/
├── index.html          # Halaman utama aplikasi
├── home.html           # Halaman home
├── how-it-works.html   # Halaman cara kerja
├── app.js              # Logika aplikasi (ANP, Fuzzy, TOPSIS)
├── style.css           # Styling
├── gambar/             # Assets gambar
├── vercel.json         # Konfigurasi Vercel
├── package.json        # Metadata project
└── README.md           # Dokumentasi
```


