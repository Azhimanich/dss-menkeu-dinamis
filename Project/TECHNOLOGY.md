# Dokumentasi Teknologi & Bahasa Pemrograman

## 📋 Ringkasan Teknologi

Project ini adalah **aplikasi web statis** yang menggunakan teknologi frontend modern tanpa framework atau library eksternal. Semua fungsionalitas diimplementasikan menggunakan **vanilla JavaScript** (JavaScript murni).

---

## 🗂️ Bahasa Pemrograman & Teknologi

### 1. **HTML5 (HyperText Markup Language)**
- **Versi**: HTML5
- **Fungsi**: 
  - Struktur dan markup halaman web
  - Semantic HTML untuk aksesibilitas
  - Form elements (select, input, button)
  - Metadata dan SEO
- **File**: `index.html`, `home.html`, `how-it-works.html`

**Fitur yang digunakan**:
- Semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- Form controls (`<select>`, `<input>`, `<button>`)
- Data attributes untuk JavaScript binding
- Meta tags untuk responsive design

---

### 2. **CSS3 (Cascading Style Sheets)**
- **Versi**: CSS3
- **Fungsi**: 
  - Styling dan layout halaman
  - Responsive design
  - Animasi dan transisi
  - Modern UI dengan gradient dan shadows
- **File**: `style.css`

**Fitur CSS yang digunakan**:
- **CSS Grid & Flexbox**: Layout responsif
- **CSS Variables**: (tidak digunakan, tapi bisa ditambahkan)
- **Gradient**: `radial-gradient()` untuk background
- **Box Model**: Modern box-sizing
- **Media Queries**: (jika ada responsive breakpoints)
- **Pseudo-elements**: `::before`, `::after`
- **Transitions & Animations**: (jika ada)
- **Modern Selectors**: Attribute selectors, class selectors

**Contoh teknik CSS**:
```css
/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* Flexbox */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Gradient Background */
background: radial-gradient(circle at top left, #1f2937, #020617 55%);
```

---

### 3. **JavaScript (ES6+)**
- **Versi**: ECMAScript 6 (ES6) / Modern JavaScript
- **Fungsi**: 
  - Logika aplikasi dan interaktivitas
  - Manipulasi DOM
  - Implementasi algoritma ANP, Fuzzy Logic, dan TOPSIS
  - Event handling
  - Data processing dan kalkulasi
- **File**: `app.js`

**Fitur JavaScript yang digunakan**:

#### **ES6+ Features**:
- **Arrow Functions**: `() => {}`
- **Template Literals**: `` `${variable}` ``
- **Destructuring**: `const { a1, a2 } = conditionInputs`
- **Spread Operator**: `...array`
- **Array Methods**: 
  - `map()`, `filter()`, `reduce()`
  - `forEach()`, `find()`, `some()`
- **const/let**: Modern variable declarations
- **Object Literals**: Enhanced object syntax

#### **DOM API**:
- `document.querySelector()`
- `document.getElementById()`
- `document.createElement()`
- `addEventListener()`
- `innerHTML`, `textContent`
- `classList.add()`, `classList.remove()`

#### **JavaScript Math & Algorithms**:
- Operasi matematika: `Math.sqrt()`, `Math.max()`, `Math.min()`
- Array manipulation untuk matriks
- Looping: `for`, `forEach()`, `map()`
- Conditional logic: `if/else`, ternary operator

**Contoh kode JavaScript**:
```javascript
// Arrow function dengan array methods
const X = candidates.map((cand) =>
  cand.scores.map((lingKey) => {
    const fuzzy = FUZZY_SCALE[lingKey];
    return defuzzify(fuzzy.tri);
  })
);

// Template literals
tr.innerHTML = `
  <td>${c.code}</td>
  <td>${c.name}</td>
  <td>${dynamicWeights[idx].toFixed(3)}</td>
`;
```

---

## 🧮 Algoritma & Metode Matematika

### 1. **ANP (Analytic Network Process)**
- **Tipe**: Multi-Criteria Decision Making (MCDM)
- **Implementasi**: Model ANP sederhana untuk menghitung bobot dinamis
- **Fungsi**: `computeDynamicWeights()`
- **Konsep**:
  - Bobot dasar (base weights) untuk setiap kriteria
  - Faktor penyesuaian berdasarkan kondisi eksternal (Cluster A)
  - Normalisasi bobot agar total = 1

**Algoritma**:
```javascript
// 1. Ambil bobot dasar
const rawWeights = CRITERIA.map((c) => c.baseWeight);

// 2. Terapkan faktor penyesuaian berdasarkan kondisi
if (a1 === "tinggi") {
  factors[0] *= 1.2; // B1 meningkat 20%
}

// 3. Normalisasi
const adjusted = rawWeights.map((w, idx) => w * factors[idx]);
const sum = adjusted.reduce((acc, v) => acc + v, 0);
const normalized = adjusted.map((v) => v / sum);
```

---

### 2. **Fuzzy Logic**
- **Tipe**: Soft Computing / Computational Intelligence
- **Implementasi**: Triangular Fuzzy Numbers (TFN)
- **Fungsi**: `defuzzify()`
- **Konsep**:
  - Skala linguistik: Sangat Buruk, Buruk, Cukup, Baik, Sangat Baik
  - Representasi fuzzy: `[lower, middle, upper]`
  - Defuzzifikasi: Konversi fuzzy → nilai crisp (0-1)

**Fuzzy Sets**:
```javascript
const FUZZY_SCALE = {
  "sangat-buruk": { label: "Sangat Buruk", tri: [0.0, 0.0, 0.25] },
  buruk: { label: "Buruk", tri: [0.0, 0.25, 0.5] },
  cukup: { label: "Cukup", tri: [0.25, 0.5, 0.75] },
  baik: { label: "Baik", tri: [0.5, 0.75, 1.0] },
  "sangat-baik": { label: "Sangat Baik", tri: [0.75, 1.0, 1.0] },
};
```

**Defuzzifikasi (Centroid Method)**:
```javascript
function defuzzify([l, m, u]) {
  return (l + m + u) / 3; // Rata-rata triangular
}
```

---

### 3. **TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)**
- **Tipe**: Multi-Criteria Decision Making (MCDM)
- **Implementasi**: Algoritma TOPSIS lengkap
- **Fungsi**: Di dalam event handler `calculateBtn`
- **Konsep**:
  - Normalisasi matriks keputusan
  - Pembobotan dengan bobot ANP
  - Identifikasi solusi ideal positif (PIS) dan negatif (NIS)
  - Perhitungan jarak Euclidean
  - Closeness Coefficient (CCi)

**Algoritma TOPSIS**:
```javascript
// 1. Normalisasi vektor (Vector Normalization)
norms[j] = Math.sqrt(sumSq);
R[i][j] = X[i][j] / norms[j];

// 2. Matriks terbobot
V[i][j] = R[i][j] * weights[j];

// 3. Solusi Ideal Positif & Negatif
pis[j] = Math.max(...col); // Ideal positif
nis[j] = Math.min(...col); // Ideal negatif

// 4. Jarak Euclidean
distancesPlus[i] = Math.sqrt(sumPlus);
distancesMinus[i] = Math.sqrt(sumMinus);

// 5. Closeness Coefficient
closeness[i] = distancesMinus[i] / (distancesPlus[i] + distancesMinus[i]);
```

---

## 🛠️ Tools & Platform

### 1. **Git & GitHub**
- **Fungsi**: Version control dan repository hosting
- **File**: `.gitignore`
- **Commands**: `git init`, `git add`, `git commit`, `git push`

### 2. **Vercel**
- **Fungsi**: Platform deployment dan hosting
- **File**: `vercel.json`
- **Type**: Static site hosting
- **Features**: 
  - Auto-deploy dari GitHub
  - CDN global
  - Custom domain support

### 3. **Node.js / npm** (Opsional)
- **Fungsi**: Package management (untuk development)
- **File**: `package.json`
- **Scripts**: 
  - `npm start`: Menjalankan local server
  - `npm run dev`: Development server

---

## 📦 Dependencies & Libraries

### **Tidak Ada Dependencies Eksternal!**
Project ini **100% vanilla** - tidak menggunakan:
- ❌ React, Vue, Angular (Framework)
- ❌ jQuery, Lodash (Library)
- ❌ Bootstrap, Tailwind CSS (CSS Framework)
- ❌ Webpack, Vite, Parcel (Build Tools)
- ❌ TypeScript (hanya JavaScript)

**Semua fungsionalitas diimplementasikan dari scratch menggunakan native browser APIs.**

---

## 🏗️ Arsitektur Aplikasi

### **Pattern**: Vanilla JavaScript dengan Modular Functions
- **Struktur**: 
  - Global constants (CRITERIA, FUZZY_SCALE)
  - Function declarations
  - Event listeners
  - DOM manipulation

### **Data Flow**:
```
User Input (HTML Forms)
    ↓
Event Listeners (JavaScript)
    ↓
Data Processing (ANP → Fuzzy → TOPSIS)
    ↓
DOM Update (Results Display)
```

---

## 📊 Kompleksitas Algoritma

### **Time Complexity**:
- **ANP**: O(n) dimana n = jumlah kriteria (7 kriteria)
- **Fuzzy Defuzzification**: O(1) per nilai
- **TOPSIS**: 
  - Normalisasi: O(m × n) dimana m = kandidat, n = kriteria
  - Perhitungan jarak: O(m × n)
  - **Total**: O(m × n)

### **Space Complexity**:
- O(m × n) untuk menyimpan matriks keputusan

---

## 🌐 Browser Compatibility

### **Modern Browsers** (ES6+ support):
- ✅ Chrome 51+
- ✅ Firefox 54+
- ✅ Safari 10+
- ✅ Edge 15+

### **Features yang Diperlukan**:
- ES6 Arrow Functions
- Template Literals
- Array Methods (map, filter, reduce)
- DOM API modern
- CSS Grid & Flexbox

---

## 📝 File Structure

```
Project/
├── index.html          # HTML5 - Halaman utama
├── home.html           # HTML5 - Halaman home
├── how-it-works.html   # HTML5 - Dokumentasi
├── style.css           # CSS3 - Styling
├── app.js              # JavaScript ES6+ - Logika aplikasi
├── package.json        # Node.js - Metadata project
├── vercel.json         # Vercel - Konfigurasi deployment
├── .gitignore          # Git - File yang diabaikan
└── gambar/             # Assets (SVG, PNG)
    ├── Garuda_Pancasila.svg
    └── logo ugm2.png
```

---

## 🎯 Kesimpulan

**Stack Teknologi**:
1. **Frontend**: HTML5 + CSS3 + JavaScript (ES6+)
2. **Algoritma**: ANP + Fuzzy Logic + TOPSIS
3. **Deployment**: Vercel (Static Hosting)
4. **Version Control**: Git + GitHub
5. **Package Manager**: npm (opsional, untuk dev tools)

**Karakteristik**:
- ✅ **Zero Dependencies**: Tidak ada library eksternal
- ✅ **Lightweight**: File kecil, load cepat
- ✅ **Modern**: Menggunakan fitur ES6+ terbaru
- ✅ **Responsive**: CSS Grid & Flexbox
- ✅ **Academic**: Implementasi algoritma MCDM yang akurat

---

**Dibuat oleh**: Mohd Azhima  
**Tahun**: 2025  
**Lisensi**: MIT


