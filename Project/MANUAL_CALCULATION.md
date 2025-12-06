# Perhitungan Manual - Step by Step

Dokumentasi ini menjelaskan perhitungan manual untuk setiap algoritma dengan contoh numerik yang detail.

---

## 📊 Contoh Data

### **Kriteria (Cluster B) - Bobot Dasar**
| Kode | Kriteria | Bobot Dasar (W₀) |
|------|----------|-------------------|
| B1   | Kompetensi Makroekonomi | 0.17 |
| B2   | Keahlian Manajemen Fiskal & Sosial | 0.17 |
| B3   | Manajemen Utang Negara | 0.17 |
| B4   | Kapasitas Negosiasi Keuangan Internasional | 0.15 |
| B5   | Optimalisasi Penerimaan & Perpajakan | 0.14 |
| B6   | Pengelolaan Hubungan Fiskal Daerah | 0.11 |
| B7   | Integritas & Tata Kelola | 0.09 |
| **Total** | | **1.00** |

### **Kondisi Eksternal (Cluster A) - Contoh**
- A1: Stabilitas Moneter Global = **Tinggi** (Risiko Tinggi)
- A2: Proyeksi Pertumbuhan PDB Global = **Resesi**
- A3: Aliran Modal Asing = **Outflow Kuat**
- A4: Risiko Konflik = **Tinggi**
- A5: Harga Komoditas = **Stabil**
- A6: Rantai Pasok = **Normal**
- A7: Kemiskinan & Pengangguran = **Di Atas Target**
- A8: Kepatuhan Pajak = **Rendah**
- A9: Kebutuhan Infrastruktur = **Tinggi**

### **Kandidat & Penilaian Fuzzy**
| Kandidat | B1 | B2 | B3 | B4 | B5 | B6 | B7 |
|----------|----|----|----|----|----|----|----|
| Kandidat A | Baik | Sangat Baik | Baik | Cukup | Baik | Baik | Sangat Baik |
| Kandidat B | Sangat Baik | Baik | Cukup | Baik | Sangat Baik | Cukup | Baik |
| Kandidat C | Cukup | Baik | Sangat Baik | Sangat Baik | Cukup | Baik | Baik |

---

## 🔢 STEP 1: ANP - Perhitungan Bobot Dinamis

### **1.1. Tentukan Faktor Penyesuaian**

Berdasarkan kondisi eksternal yang dipilih:

**Aturan Penyesuaian:**
- A1 = "tinggi" → B1 × 1.2, B3 × 1.2
- A2 = "resesi" → B2 × 1.3
- A3 = "outflow" → B3 × 1.25, B4 × 1.2
- A4 = "tinggi" → B4 × 1.25
- A7 = "diatas" → B2 × 1.25, B6 × 1.2
- A8 = "rendah" → B5 × 1.25
- A9 = "tinggi" → B3 × 1.2

**Perhitungan Faktor:**

| Kriteria | Faktor Awal | Pengaruh | Faktor Akhir |
|----------|-------------|----------|--------------|
| B1 | 1.0 | A1: × 1.2 | **1.2** |
| B2 | 1.0 | A2: × 1.3, A7: × 1.25 | 1.3 × 1.25 = **1.625** |
| B3 | 1.0 | A1: × 1.2, A3: × 1.25, A9: × 1.2 | 1.2 × 1.25 × 1.2 = **1.8** |
| B4 | 1.0 | A3: × 1.2, A4: × 1.25 | 1.2 × 1.25 = **1.5** |
| B5 | 1.0 | A8: × 1.25 | **1.25** |
| B6 | 1.0 | A7: × 1.2 | **1.2** |
| B7 | 1.0 | - | **1.0** |

### **1.2. Hitung Bobot yang Disesuaikan**

**Rumus:** `Bobot Disesuaikan = Bobot Dasar × Faktor`

| Kriteria | Bobot Dasar (W₀) | Faktor | Bobot Disesuaikan |
|----------|------------------|--------|-------------------|
| B1 | 0.17 | 1.2 | 0.17 × 1.2 = **0.204** |
| B2 | 0.17 | 1.625 | 0.17 × 1.625 = **0.27625** |
| B3 | 0.17 | 1.8 | 0.17 × 1.8 = **0.306** |
| B4 | 0.15 | 1.5 | 0.15 × 1.5 = **0.225** |
| B5 | 0.14 | 1.25 | 0.14 × 1.25 = **0.175** |
| B6 | 0.11 | 1.2 | 0.11 × 1.2 = **0.132** |
| B7 | 0.09 | 1.0 | 0.09 × 1.0 = **0.09** |
| **Total** | 1.00 | | **1.40825** |

### **1.3. Normalisasi Bobot**

**Rumus:** `Wᵢ = Bobot Disesuaikanᵢ / Σ(Bobot Disesuaikan)`

**Total Bobot Disesuaikan = 1.40825**

| Kriteria | Bobot Disesuaikan | Normalisasi (Wᵢ) |
|----------|-------------------|------------------|
| B1 | 0.204 | 0.204 / 1.40825 = **0.1448** |
| B2 | 0.27625 | 0.27625 / 1.40825 = **0.1962** |
| B3 | 0.306 | 0.306 / 1.40825 = **0.2173** |
| B4 | 0.225 | 0.225 / 1.40825 = **0.1598** |
| B5 | 0.175 | 0.175 / 1.40825 = **0.1243** |
| B6 | 0.132 | 0.132 / 1.40825 = **0.0937** |
| B7 | 0.09 | 0.09 / 1.40825 = **0.0639** |
| **Total** | 1.40825 | **1.0000** ✓ |

**Hasil:** Bobot dinamis akhir (W) = [0.1448, 0.1962, 0.2173, 0.1598, 0.1243, 0.0937, 0.0639]

---

## 🎯 STEP 2: Fuzzy Logic - Defuzzifikasi

### **2.1. Skala Fuzzy (Triangular Fuzzy Numbers)**

| Label Linguistik | Triangular [Lower, Middle, Upper] |
|------------------|-----------------------------------|
| Sangat Buruk | [0.0, 0.0, 0.25] |
| Buruk | [0.0, 0.25, 0.5] |
| Cukup | [0.25, 0.5, 0.75] |
| Baik | [0.5, 0.75, 1.0] |
| Sangat Baik | [0.75, 1.0, 1.0] |

### **2.2. Defuzzifikasi (Centroid Method)**

**Rumus:** `Nilai Crisp = (Lower + Middle + Upper) / 3`

| Label | Perhitungan | Nilai Crisp |
|-------|-------------|------------|
| Sangat Buruk | (0.0 + 0.0 + 0.25) / 3 | **0.0833** |
| Buruk | (0.0 + 0.25 + 0.5) / 3 | **0.2500** |
| Cukup | (0.25 + 0.5 + 0.75) / 3 | **0.5000** |
| Baik | (0.5 + 0.75 + 1.0) / 3 | **0.7500** |
| Sangat Baik | (0.75 + 1.0 + 1.0) / 3 | **0.9167** |

### **2.3. Matriks Keputusan X (Setelah Defuzzifikasi)**

**Kandidat A:**
- B1: Baik → 0.7500
- B2: Sangat Baik → 0.9167
- B3: Baik → 0.7500
- B4: Cukup → 0.5000
- B5: Baik → 0.7500
- B6: Baik → 0.7500
- B7: Sangat Baik → 0.9167

**Kandidat B:**
- B1: Sangat Baik → 0.9167
- B2: Baik → 0.7500
- B3: Cukup → 0.5000
- B4: Baik → 0.7500
- B5: Sangat Baik → 0.9167
- B6: Cukup → 0.5000
- B7: Baik → 0.7500

**Kandidat C:**
- B1: Cukup → 0.5000
- B2: Baik → 0.7500
- B3: Sangat Baik → 0.9167
- B4: Sangat Baik → 0.9167
- B5: Cukup → 0.5000
- B6: Baik → 0.7500
- B7: Baik → 0.7500

**Matriks X (3 kandidat × 7 kriteria):**

```
        B1     B2     B3     B4     B5     B6     B7
A  [ 0.7500, 0.9167, 0.7500, 0.5000, 0.7500, 0.7500, 0.9167 ]
B  [ 0.9167, 0.7500, 0.5000, 0.7500, 0.9167, 0.5000, 0.7500 ]
C  [ 0.5000, 0.7500, 0.9167, 0.9167, 0.5000, 0.7500, 0.7500 ]
```

---

## 📐 STEP 3: TOPSIS - Perhitungan Peringkat

### **3.1. Normalisasi Vektor (Vector Normalization)**

**Rumus untuk setiap kolom j:**
```
normⱼ = √(Σᵢ xᵢⱼ²)
rᵢⱼ = xᵢⱼ / normⱼ
```

**Perhitungan norm untuk setiap kriteria:**

**B1:**
- norm₁ = √(0.7500² + 0.9167² + 0.5000²)
- norm₁ = √(0.5625 + 0.8403 + 0.2500)
- norm₁ = √1.6528 = **1.2856**

**B2:**
- norm₂ = √(0.9167² + 0.7500² + 0.7500²)
- norm₂ = √(0.8403 + 0.5625 + 0.5625)
- norm₂ = √1.9653 = **1.4019**

**B3:**
- norm₃ = √(0.7500² + 0.5000² + 0.9167²)
- norm₃ = √(0.5625 + 0.2500 + 0.8403)
- norm₃ = √1.6528 = **1.2856**

**B4:**
- norm₄ = √(0.5000² + 0.7500² + 0.9167²)
- norm₄ = √(0.2500 + 0.5625 + 0.8403)
- norm₄ = √1.6528 = **1.2856**

**B5:**
- norm₅ = √(0.7500² + 0.9167² + 0.5000²)
- norm₅ = √(0.5625 + 0.8403 + 0.2500)
- norm₅ = √1.6528 = **1.2856**

**B6:**
- norm₆ = √(0.7500² + 0.5000² + 0.7500²)
- norm₆ = √(0.5625 + 0.2500 + 0.5625)
- norm₆ = √1.3750 = **1.1726**

**B7:**
- norm₇ = √(0.9167² + 0.7500² + 0.7500²)
- norm₇ = √(0.8403 + 0.5625 + 0.5625)
- norm₇ = √1.9653 = **1.4019**

**Matriks R (Normalized):**

```
        B1       B2       B3       B4       B5       B6       B7
A  [ 0.5833,  0.6536,  0.5833,  0.3889,  0.5833,  0.6396,  0.6536 ]
B  [ 0.7130,  0.5345,  0.3889,  0.5833,  0.7130,  0.4264,  0.5345 ]
C  [ 0.3889,  0.5345,  0.7130,  0.7130,  0.3889,  0.6396,  0.5345 ]
```

**Perhitungan contoh (A, B1):**
- r₁₁ = 0.7500 / 1.2856 = **0.5833**

---

### **3.2. Matriks Terbobot V = R × W**

**Rumus:** `vᵢⱼ = rᵢⱼ × wⱼ`

**Bobot W = [0.1448, 0.1962, 0.2173, 0.1598, 0.1243, 0.0937, 0.0639]**

**Perhitungan untuk Kandidat A:**

| Kriteria | rᵢⱼ | wⱼ | vᵢⱼ = rᵢⱼ × wⱼ |
|----------|-----|-----|----------------|
| B1 | 0.5833 | 0.1448 | 0.5833 × 0.1448 = **0.0845** |
| B2 | 0.6536 | 0.1962 | 0.6536 × 0.1962 = **0.1282** |
| B3 | 0.5833 | 0.2173 | 0.5833 × 0.2173 = **0.1267** |
| B4 | 0.3889 | 0.1598 | 0.3889 × 0.1598 = **0.0621** |
| B5 | 0.5833 | 0.1243 | 0.5833 × 0.1243 = **0.0725** |
| B6 | 0.6396 | 0.0937 | 0.6396 × 0.0937 = **0.0599** |
| B7 | 0.6536 | 0.0639 | 0.6536 × 0.0639 = **0.0418** |

**Matriks V (3 kandidat × 7 kriteria):**

```
        B1      B2      B3      B4      B5      B6      B7
A  [ 0.0845, 0.1282, 0.1267, 0.0621, 0.0725, 0.0599, 0.0418 ]
B  [ 0.1032, 0.1049, 0.0845, 0.0932, 0.0886, 0.0400, 0.0342 ]
C  [ 0.0563, 0.1049, 0.1548, 0.1140, 0.0484, 0.0599, 0.0342 ]
```

---

### **3.3. Solusi Ideal Positif (PIS) dan Negatif (NIS)**

**PIS (Positive Ideal Solution):**
- PISⱼ = max(v₁ⱼ, v₂ⱼ, ..., vₘⱼ) untuk setiap kriteria j

**NIS (Negative Ideal Solution):**
- NISⱼ = min(v₁ⱼ, v₂ⱼ, ..., vₘⱼ) untuk setiap kriteria j

**Perhitungan:**

| Kriteria | v_A | v_B | v_C | PISⱼ | NISⱼ |
|----------|-----|-----|-----|------|------|
| B1 | 0.0845 | 0.1032 | 0.0563 | **0.1032** (B) | **0.0563** (C) |
| B2 | 0.1282 | 0.1049 | 0.1049 | **0.1282** (A) | **0.1049** (B,C) |
| B3 | 0.1267 | 0.0845 | 0.1548 | **0.1548** (C) | **0.0845** (B) |
| B4 | 0.0621 | 0.0932 | 0.1140 | **0.1140** (C) | **0.0621** (A) |
| B5 | 0.0725 | 0.0886 | 0.0484 | **0.0886** (B) | **0.0484** (C) |
| B6 | 0.0599 | 0.0400 | 0.0599 | **0.0599** (A,C) | **0.0400** (B) |
| B7 | 0.0418 | 0.0342 | 0.0342 | **0.0418** (A) | **0.0342** (B,C) |

**Hasil:**
- **PIS = [0.1032, 0.1282, 0.1548, 0.1140, 0.0886, 0.0599, 0.0418]**
- **NIS = [0.0563, 0.1049, 0.0845, 0.0621, 0.0484, 0.0400, 0.0342]**

---

### **3.4. Jarak ke PIS dan NIS (Euclidean Distance)**

**Rumus Jarak ke PIS:**
```
dᵢ⁺ = √(Σⱼ (vᵢⱼ - PISⱼ)²)
```

**Rumus Jarak ke NIS:**
```
dᵢ⁻ = √(Σⱼ (vᵢⱼ - NISⱼ)²)
```

**Perhitungan untuk Kandidat A:**

**Jarak ke PIS (d₁⁺):**
- (0.0845 - 0.1032)² = (-0.0187)² = 0.000350
- (0.1282 - 0.1282)² = (0.0000)² = 0.000000
- (0.1267 - 0.1548)² = (-0.0281)² = 0.000790
- (0.0621 - 0.1140)² = (-0.0519)² = 0.002694
- (0.0725 - 0.0886)² = (-0.0161)² = 0.000259
- (0.0599 - 0.0599)² = (0.0000)² = 0.000000
- (0.0418 - 0.0418)² = (0.0000)² = 0.000000
- **Σ = 0.004193**
- **d₁⁺ = √0.004193 = 0.0648**

**Jarak ke NIS (d₁⁻):**
- (0.0845 - 0.0563)² = (0.0282)² = 0.000795
- (0.1282 - 0.1049)² = (0.0233)² = 0.000543
- (0.1267 - 0.0845)² = (0.0422)² = 0.001781
- (0.0621 - 0.0621)² = (0.0000)² = 0.000000
- (0.0725 - 0.0484)² = (0.0241)² = 0.000581
- (0.0599 - 0.0400)² = (0.0199)² = 0.000396
- (0.0418 - 0.0342)² = (0.0076)² = 0.000058
- **Σ = 0.004154**
- **d₁⁻ = √0.004154 = 0.0645**

**Perhitungan untuk Kandidat B:**

**Jarak ke PIS (d₂⁺):**
- (0.1032 - 0.1032)² = 0.000000
- (0.1049 - 0.1282)² = (-0.0233)² = 0.000543
- (0.0845 - 0.1548)² = (-0.0703)² = 0.004942
- (0.0932 - 0.1140)² = (-0.0208)² = 0.000433
- (0.0886 - 0.0886)² = 0.000000
- (0.0400 - 0.0599)² = (-0.0199)² = 0.000396
- (0.0342 - 0.0418)² = (-0.0076)² = 0.000058
- **Σ = 0.006372**
- **d₂⁺ = √0.006372 = 0.0798**

**Jarak ke NIS (d₂⁻):**
- (0.1032 - 0.0563)² = (0.0469)² = 0.002200
- (0.1049 - 0.1049)² = 0.000000
- (0.0845 - 0.0845)² = 0.000000
- (0.0932 - 0.0621)² = (0.0311)² = 0.000968
- (0.0886 - 0.0484)² = (0.0402)² = 0.001616
- (0.0400 - 0.0400)² = 0.000000
- (0.0342 - 0.0342)² = 0.000000
- **Σ = 0.004784**
- **d₂⁻ = √0.004784 = 0.0692**

**Perhitungan untuk Kandidat C:**

**Jarak ke PIS (d₃⁺):**
- (0.0563 - 0.1032)² = (-0.0469)² = 0.002200
- (0.1049 - 0.1282)² = (-0.0233)² = 0.000543
- (0.1548 - 0.1548)² = 0.000000
- (0.1140 - 0.1140)² = 0.000000
- (0.0484 - 0.0886)² = (-0.0402)² = 0.001616
- (0.0599 - 0.0599)² = 0.000000
- (0.0342 - 0.0418)² = (-0.0076)² = 0.000058
- **Σ = 0.004417**
- **d₃⁺ = √0.004417 = 0.0665**

**Jarak ke NIS (d₃⁻):**
- (0.0563 - 0.0563)² = 0.000000
- (0.1049 - 0.1049)² = 0.000000
- (0.1548 - 0.0845)² = (0.0703)² = 0.004942
- (0.1140 - 0.0621)² = (0.0519)² = 0.002694
- (0.0484 - 0.0484)² = 0.000000
- (0.0599 - 0.0400)² = (0.0199)² = 0.000396
- (0.0342 - 0.0342)² = 0.000000
- **Σ = 0.008032**
- **d₃⁻ = √0.008032 = 0.0896**

**Ringkasan Jarak:**

| Kandidat | d⁺ (Jarak ke PIS) | d⁻ (Jarak ke NIS) |
|----------|-------------------|-------------------|
| A | 0.0648 | 0.0645 |
| B | 0.0798 | 0.0692 |
| C | 0.0665 | 0.0896 |

---

### **3.5. Closeness Coefficient (CCᵢ)**

**Rumus:**
```
CCᵢ = dᵢ⁻ / (dᵢ⁺ + dᵢ⁻)
```

**Perhitungan:**

**Kandidat A:**
- CC₁ = 0.0645 / (0.0648 + 0.0645)
- CC₁ = 0.0645 / 0.1293
- **CC₁ = 0.4988**

**Kandidat B:**
- CC₂ = 0.0692 / (0.0798 + 0.0692)
- CC₂ = 0.0692 / 0.1490
- **CC₂ = 0.4644**

**Kandidat C:**
- CC₃ = 0.0896 / (0.0665 + 0.0896)
- CC₃ = 0.0896 / 0.1561
- **CC₃ = 0.5740**

---

### **3.6. Peringkat Akhir**

**Urutan berdasarkan CCᵢ (dari tertinggi ke terendah):**

| Peringkat | Kandidat | CCᵢ | Keterangan |
|-----------|----------|-----|------------|
| **1** | **C** | **0.5740** | Terbaik - Paling dekat dengan solusi ideal |
| **2** | **A** | **0.4988** | Kedua |
| **3** | **B** | **0.4644** | Ketiga |

**Interpretasi:**
- **Kandidat C** memiliki CCᵢ tertinggi (0.5740), artinya paling dekat dengan solusi ideal positif dan paling jauh dari solusi ideal negatif.
- Semakin tinggi CCᵢ, semakin baik kandidat tersebut.
- CCᵢ berkisar antara 0 (terburuk) hingga 1 (terbaik).

---

## 📝 Ringkasan Formula

### **ANP:**
1. `Faktor Akhir = Faktor₁ × Faktor₂ × ... × Faktorₙ`
2. `Bobot Disesuaikan = Bobot Dasar × Faktor`
3. `Wᵢ = Bobot Disesuaikanᵢ / Σ(Bobot Disesuaikan)`

### **Fuzzy Logic:**
1. `Nilai Crisp = (Lower + Middle + Upper) / 3`

### **TOPSIS:**
1. `normⱼ = √(Σᵢ xᵢⱼ²)`
2. `rᵢⱼ = xᵢⱼ / normⱼ`
3. `vᵢⱼ = rᵢⱼ × wⱼ`
4. `PISⱼ = max(v₁ⱼ, v₂ⱼ, ..., vₘⱼ)`
5. `NISⱼ = min(v₁ⱼ, v₂ⱼ, ..., vₘⱼ)`
6. `dᵢ⁺ = √(Σⱼ (vᵢⱼ - PISⱼ)²)`
7. `dᵢ⁻ = √(Σⱼ (vᵢⱼ - NISⱼ)²)`
8. `CCᵢ = dᵢ⁻ / (dᵢ⁺ + dᵢ⁻)`

---

**Dokumentasi ini dapat digunakan untuk verifikasi perhitungan manual atau sebagai referensi akademik.**

