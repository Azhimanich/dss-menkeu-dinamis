// Konfigurasi inti DSS – Cluster B: Kriteria Seleksi Teknis
const CRITERIA = [
  {
    code: "B1",
    name: "Kompetensi Makroekonomi",
    baseWeight: 0.17,
  },
  {
    code: "B2",
    name: "Keahlian Manajemen Fiskal & Sosial",
    baseWeight: 0.17,
  },
  {
    code: "B3",
    name: "Manajemen Utang Negara",
    baseWeight: 0.17,
  },
  {
    code: "B4",
    name: "Kapasitas Negosiasi Keuangan Internasional",
    baseWeight: 0.15,
  },
  {
    code: "B5",
    name: "Optimalisasi Penerimaan & Perpajakan",
    baseWeight: 0.14,
  },
  {
    code: "B6",
    name: "Pengelolaan Hubungan Fiskal Daerah",
    baseWeight: 0.11,
  },
  {
    code: "B7",
    name: "Integritas & Tata Kelola",
    baseWeight: 0.09,
  },
];

// Skala linguistik Fuzzy (segitiga) dan defuzzifikasi
const FUZZY_SCALE = {
  "sangat-buruk": { label: "Sangat Buruk", tri: [0.0, 0.0, 0.25] },
  buruk: { label: "Buruk", tri: [0.0, 0.25, 0.5] },
  cukup: { label: "Cukup", tri: [0.25, 0.5, 0.75] },
  baik: { label: "Baik", tri: [0.5, 0.75, 1.0] },
  "sangat-baik": { label: "Sangat Baik", tri: [0.75, 1.0, 1.0] },
};

function defuzzify([l, m, u]) {
  return (l + m + u) / 3;
}

// Elemen DOM
const weightsTableBody = document.querySelector("#weights-table tbody");
const candidatesContainer = document.getElementById("candidates-container");
const candidateNameInput = document.getElementById("candidate-name");
const addCandidateBtn = document.getElementById("add-candidate-btn");
const calculateBtn = document.getElementById("calculate-btn");
const resetBtn = document.getElementById("reset-btn");
const resultsSection = document.getElementById("results");
const rankingTableBody = document.querySelector("#ranking-table tbody");
const bestCandidateEl = document.getElementById("best-candidate");
const debugLogEl = document.getElementById("debug-log");

// Kondisi eksternal (Cluster A) – digunakan untuk menyesuaikan bobot
const conditionInputs = {
  a1: document.getElementById("a1"),
  a2: document.getElementById("a2"),
  a3: document.getElementById("a3"),
  a4: document.getElementById("a4"),
  a5: document.getElementById("a5"),
  a6: document.getElementById("a6"),
  a7: document.getElementById("a7"),
  a8: document.getElementById("a8"),
  a9: document.getElementById("a9"),
};

// Menyimpan faktor dan catatan terakhir untuk tiap kriteria B
let lastFactors = new Array(CRITERIA.length).fill(1.0);
let lastFactorNotes = CRITERIA.map(() => []);

let candidates = [];

// Hitung bobot dinamis berbasis ANP sederhana
function computeDynamicWeights() {
  // Salin bobot dasar
  const rawWeights = CRITERIA.map((c) => c.baseWeight);

  const factors = new Array(CRITERIA.length).fill(1.0);
  const factorNotes = CRITERIA.map(() => []);

  // Aturan pengaruh Cluster A -> B (berbasis deskripsi di prompt)
  const a1 = conditionInputs.a1.value;
  const a2 = conditionInputs.a2.value;
  const a3 = conditionInputs.a3.value;
  const a4 = conditionInputs.a4.value;
  const a5 = conditionInputs.a5.value;
  const a6 = conditionInputs.a6.value;
  const a7 = conditionInputs.a7.value;
  const a8 = conditionInputs.a8.value;
  const a9 = conditionInputs.a9.value;

  // A1: Risiko moneter global tinggi -> B1 & B3 naik
  if (a1 === "tinggi") {
    factors[0] *= 1.2; // B1
    factors[2] *= 1.2; // B3
    factorNotes[0].push("A1: Risiko moneter global tinggi (butuh kompetensi makroekonomi kuat)");
    factorNotes[2].push("A1: Risiko moneter global tinggi (butuh manajemen utang hati-hati)");
  }

  // A2: Resesi -> Stimulus Fiskal (B2) naik
  if (a2 === "resesi") {
    factors[1] *= 1.3; // B2
    factorNotes[1].push("A2: Resesi PDB global (perlu stimulus fiskal & jaring pengaman sosial)");
  }

  // A3: Capital flow outflow kuat -> B3 & B4 naik
  if (a3 === "outflow") {
    factors[2] *= 1.25; // B3
    factors[3] *= 1.2; // B4
    factorNotes[2].push("A3: Outflow modal asing kuat (butuh manajemen utang & likuiditas)");
    factorNotes[3].push("A3: Outflow modal asing kuat (butuh negosiasi internasional)");
  }

  // A4: Konflik tinggi -> Negosiasi internasional (B4) naik
  if (a4 === "tinggi") {
    factors[3] *= 1.25; // B4
    factorNotes[3].push("A4: Risiko konflik regional/global tinggi");
  }

  // A5: Harga komoditas turun drastis -> Optimalisasi penerimaan (B5) naik
  if (a5 === "turun") {
    factors[4] *= 1.25; // B5
    factorNotes[4].push("A5: Harga komoditas ekspor menurun drastis");
  }

  // A6: Rantai pasok terganggu -> Manajemen fiskal (B2) naik
  if (a6 === "terganggu") {
    factors[1] *= 1.2;
    factorNotes[1].push("A6: Rantai pasok global terganggu (penyesuaian subsidi/logistik)");
  }

  // A7: Kemiskinan & pengangguran di atas target -> B2 & B6 naik
  if (a7 === "diatas") {
    factors[1] *= 1.25; // B2
    factors[5] *= 1.2; // B6
    factorNotes[1].push("A7: Kemiskinan & pengangguran di atas target");
    factorNotes[5].push("A7: Tekanan kesejahteraan daerah meningkat");
  }

  // A8: Kepatuhan pajak rendah -> B5 naik
  if (a8 === "rendah") {
    factors[4] *= 1.25;
    factorNotes[4].push("A8: Kepatuhan pajak nasional rendah");
  }

  // A9: Kebutuhan infrastruktur tinggi -> B3 naik
  if (a9 === "tinggi") {
    factors[2] *= 1.2;
    factorNotes[2].push("A9: Kebutuhan infrastruktur mendesak (butuh pendanaan besar)");
  }

  const adjusted = rawWeights.map((w, idx) => w * factors[idx]);
  const sum = adjusted.reduce((acc, v) => acc + v, 0);
  const normalized = adjusted.map((v) => v / sum);

  // Simpan untuk digunakan pada tabel pengaruh Cluster A → B
  lastFactors = factors;
  lastFactorNotes = factorNotes;

  return normalized;
}

function renderWeightsTable() {
  const dynamicWeights = computeDynamicWeights();
  weightsTableBody.innerHTML = "";
  CRITERIA.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.code}</td>
      <td>${c.name}</td>
      <td>${dynamicWeights[idx].toFixed(3)}</td>
    `;
    weightsTableBody.appendChild(tr);
  });

  renderInfluenceTable();
}

// Tabel relasi pengaruh Cluster A → B agar user paham perubahan bobot
function renderInfluenceTable() {
  const tbody = document.querySelector("#influence-table tbody");
  if (!tbody) return;

  // Deskripsi manual hubungan utama A → B (edukatif)
  const influenceDescriptions = [
    "Terutama dipengaruhi oleh A1 (Stabilitas Moneter Global) dan A2 (PDB Global).",
    "Terutama dipengaruhi oleh A2 (PDB Global), A6 (Rantai Pasok), dan A7 (Kemiskinan & Pengangguran).",
    "Terutama dipengaruhi oleh A1 (Moneter Global), A3 (Capital Flow), dan A9 (Infrastruktur).",
    "Terutama dipengaruhi oleh A3 (Capital Flow) dan A4 (Risiko Konflik Regional/Global).",
    "Terutama dipengaruhi oleh A5 (Harga Komoditas) dan A8 (Kepatuhan Pajak).",
    "Terutama dipengaruhi oleh A7 (Kesejahteraan Domestik) dan dinamika fiskal daerah.",
    "Terutama dipengaruhi oleh kombinasi A1–A9, dengan bobot dasar tinggi namun sensitivitas seimbang.",
  ];

  tbody.innerHTML = "";

  CRITERIA.forEach((c, idx) => {
    const factor = lastFactors[idx] ?? 1.0;
    const notes = lastFactorNotes[idx] ?? [];

    let statusLabel = "Netral";
    let badgeClass = "badge-neutral";

    if (factor > 1.001) {
      statusLabel = "Menguat";
      badgeClass = "badge-up";
    } else if (factor < 0.999) {
      statusLabel = "Melemah";
      badgeClass = "badge-down";
    }

    const detailNotes =
      notes.length > 0
        ? notes.join("; ")
        : "Tidak ada pemicu khusus dari Cluster A (bobot sesuai dasar ANP).";

    const desc = influenceDescriptions[idx] || "";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.code}</td>
      <td>${c.name}</td>
      <td>${desc}</td>
      <td><span class="${badgeClass}">${statusLabel}</span><br/><small>${detailNotes}</small></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render form penilaian untuk setiap kandidat
function renderCandidates() {
  candidatesContainer.innerHTML = "";
  candidates.forEach((cand, cIdx) => {
    const card = document.createElement("div");
    card.className = "candidate-card";

    const header = document.createElement("div");
    header.className = "candidate-header";
    header.innerHTML = `
      <span class="candidate-name">${cand.name}</span>
      <span class="chip">ID #${cIdx + 1}</span>
    `;
    card.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "candidate-grid";

    CRITERIA.forEach((crit, bIdx) => {
      const field = document.createElement("div");
      field.className = "field";

      const label = document.createElement("label");
      label.textContent = `${crit.code} – ${crit.name}`;

      const select = document.createElement("select");
      select.dataset.candidateIndex = String(cIdx);
      select.dataset.criteriaIndex = String(bIdx);

      Object.entries(FUZZY_SCALE).forEach(([key, value]) => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = value.label;
        select.appendChild(opt);
      });

      // Default "Cukup"
      select.value = "cukup";
      cand.scores[bIdx] = "cukup";

      select.addEventListener("change", (e) => {
        const target = e.target;
        const ci = Number(target.dataset.candidateIndex);
        const bi = Number(target.dataset.criteriaIndex);
        candidates[ci].scores[bi] = target.value;
      });

      field.appendChild(label);
      field.appendChild(select);
      grid.appendChild(field);
    });

    card.appendChild(grid);
    candidatesContainer.appendChild(card);
  });
}

// Tambah kandidat baru
addCandidateBtn.addEventListener("click", () => {
  const name = candidateNameInput.value.trim();
  if (!name) {
    alert("Isi nama kandidat terlebih dahulu.");
    return;
  }
  candidates.push({
    name,
    scores: new Array(CRITERIA.length).fill("cukup"),
  });
  candidateNameInput.value = "";
  renderCandidates();
  resultsSection.classList.add("hidden");
});

// Re-render bobot jika kondisi eksternal berubah
Object.values(conditionInputs).forEach((el) => {
  el.addEventListener("change", () => {
    renderWeightsTable();
    resultsSection.classList.add("hidden");
  });
});

// TOPSIS + integrasi ANP & Fuzzy
calculateBtn.addEventListener("click", () => {
  if (candidates.length === 0) {
    alert("Tambahkan minimal satu kandidat terlebih dahulu.");
    return;
  }

  // 1. Dapatkan bobot dinamis dari ANP
  const weights = computeDynamicWeights();

  // 2. Matriks keputusan X (defuzzifikasi)
  //    rows = kandidat, cols = kriteria
  const X = candidates.map((cand) =>
    cand.scores.map((lingKey) => {
      const fuzzy = FUZZY_SCALE[lingKey];
      return defuzzify(fuzzy.tri); // nilai crisp di [0,1]
    })
  );

  const m = candidates.length;
  const n = CRITERIA.length;

  // 3. Normalisasi vektor
  const norms = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    let sumSq = 0;
    for (let i = 0; i < m; i++) {
      sumSq += X[i][j] ** 2;
    }
    norms[j] = Math.sqrt(sumSq) || 1;
  }

  const R = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      R[i][j] = X[i][j] / norms[j];
    }
  }

  // 4. Matriks terbobot V = R * W
  const V = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      V[i][j] = R[i][j] * weights[j];
    }
  }

  // 5. Tentukan solusi ideal positif (PIS) & negatif (NIS)
  const pis = new Array(n).fill(0);
  const nis = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    const col = V.map((row) => row[j]);
    pis[j] = Math.max(...col);
    nis[j] = Math.min(...col);
  }

  // 6. Hitung jarak ke PIS dan NIS, lalu CCi
  const distancesPlus = new Array(m).fill(0);
  const distancesMinus = new Array(m).fill(0);
  const closeness = new Array(m).fill(0);

  for (let i = 0; i < m; i++) {
    let sumPlus = 0;
    let sumMinus = 0;
    for (let j = 0; j < n; j++) {
      sumPlus += (V[i][j] - pis[j]) ** 2;
      sumMinus += (V[i][j] - nis[j]) ** 2;
    }
    distancesPlus[i] = Math.sqrt(sumPlus);
    distancesMinus[i] = Math.sqrt(sumMinus);
    const denom = distancesPlus[i] + distancesMinus[i] || 1;
    closeness[i] = distancesMinus[i] / denom;
  }

  // 7. Susun peringkat
  const ranking = candidates
    .map((cand, idx) => ({
      name: cand.name,
      cc: closeness[idx],
    }))
    .sort((a, b) => b.cc - a.cc);

  rankingTableBody.innerHTML = "";
  ranking.forEach((row, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${row.name}</td>
      <td>${row.cc.toFixed(4)}</td>
    `;
    rankingTableBody.appendChild(tr);
  });

  if (ranking.length > 0) {
    const top = ranking[0];
    bestCandidateEl.textContent = `Kandidat dengan kecocokan teknis tertinggi terhadap prioritas nasional saat ini adalah ${top.name} dengan skor kedekatan CCᵢ = ${top.cc.toFixed(
      4
    )}.`;
  } else {
    bestCandidateEl.textContent = "";
  }

  // 8. Catatan debug ringkas
  const logLines = [];
  logLines.push("=== Bobot Dinamis (ANP) ===");
  CRITERIA.forEach((c, idx) =>
    logLines.push(`${c.code} ${c.name}: ${weights[idx].toFixed(4)}`)
  );
  logLines.push("\n=== Matriks Keputusan Defuzzifikasi X (kandidat x kriteria) ===");
  X.forEach((row, i) =>
    logLines.push(
      `Kandidat ${candidates[i].name}: [${row.map((v) => v.toFixed(3)).join(", ")}]`
    )
  );
  logLines.push("\n=== Skor Kedekatan TOPSIS (CCi) ===");
  ranking.forEach((r, idx) =>
    logLines.push(`#${idx + 1} ${r.name} -> ${r.cc.toFixed(4)}`)
  );
  debugLogEl.textContent = logLines.join("\n");

  resultsSection.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  // Reset kondisi eksternal
  conditionInputs.a1.value = "sedang";
  conditionInputs.a2.value = "stagnan";
  conditionInputs.a3.value = "netral";
  conditionInputs.a4.value = "sedang";
  conditionInputs.a5.value = "stabil";
  conditionInputs.a6.value = "normal";
  conditionInputs.a7.value = "sesuai";
  conditionInputs.a8.value = "tinggi";
  conditionInputs.a9.value = "rendah";

  // Reset kandidat
  candidates = [];
  candidatesContainer.innerHTML = "";

  // Sembunyikan hasil
  resultsSection.classList.add("hidden");
  debugLogEl.textContent = "";

  renderWeightsTable();
});

// Inisialisasi awal
renderWeightsTable();


