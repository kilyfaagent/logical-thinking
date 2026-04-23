import type { Prompt } from "@/types";

export const prompts: Prompt[] = [
  // Sales (1-10)
  { id: 1, category: "Sales", text: "Revenue penjualan retail fashion brand X turun 25% YoY padahal traffic toko naik 10%. Apa yang terjadi dan bagaimana solusinya?" },
  { id: 2, category: "Sales", text: "Conversion rate e-commerce perusahaan FMCG dari visit ke purchase hanya 1.2%, jauh di bawah benchmark 3%. Identifikasi masalah dan buat action plan." },
  { id: 3, category: "Sales", text: "Tim sales B2B software company closing deal rata-rata 6 bulan, kompetitor hanya 3 bulan. Breakdown issue-nya." },
  { id: 4, category: "Sales", text: "Perusahaan asuransi kehilangan 30% agent top performer dalam 1 tahun terakhir. Bagaimana dampaknya ke revenue dan apa solusinya?" },
  { id: 5, category: "Sales", text: "Sebuah startup SaaS memiliki churn rate 8% per bulan. Breakdown penyebab dan susun strategi retensi." },
  { id: 6, category: "Sales", text: "Dealer otomotif mengalami penurunan penjualan unit 40% di Q3, tapi spare part naik 15%. Apa yang bisa dilakukan?" },
  { id: 7, category: "Sales", text: "Perusahaan farmasi ingin masuk ke pasar OTC (over the counter) tapi hanya punya pengalaman di ethical drugs. Apa risiko dan strategi go-to-market?" },
  { id: 8, category: "Sales", text: "Toko elektronik offline mengalami showrooming masif — customer datang lihat produk tapi beli online. Solusi?" },
  { id: 9, category: "Sales", text: "Revenue dari channel distributor tradisional turun 20%, tapi direct-to-consumer (DTC) belum bisa menggantikan. Bagaimana transisi yang tepat?" },
  { id: 10, category: "Sales", text: "Perusahaan B2B manufacturing mendapat keluhan bahwa pricing-nya tidak transparan dan sulit dipahami klien. Redesign pricing strategy." },

  // Operations (11-20)
  { id: 11, category: "Operations", text: "Pabrik makanan mengalami defect rate 5% di lini produksi baru. Target maksimal 1%. Identifikasi root cause." },
  { id: 12, category: "Operations", text: "Lead time pengiriman dari warehouse ke customer naik dari 2 hari jadi 5 hari. Apa saja faktor penyebabnya?" },
  { id: 13, category: "Operations", text: "Perusahaan logistik kehilangan 3% barang dalam proses delivery setiap bulan. Buat issue tree untuk mengatasi ini." },
  { id: 14, category: "Operations", text: "Restoran chain dengan 50 outlet mengalami inkonsistensi kualitas makanan. Breakdown masalah operasional." },
  { id: 15, category: "Operations", text: "Startup delivery mengalami peak hour bottleneck: order melonjak 3x tapi rider hanya naik 1.5x. Solusi?" },
  { id: 16, category: "Operations", text: "Perusahaan konstruksi selalu terlambat 30-40% dari timeline proyek. Identifikasi systematic issues." },
  { id: 17, category: "Operations", text: "RS swasta ingin mengurangi waktu tunggu pasien di IGD dari rata-rata 45 menit jadi 15 menit. Buat action plan." },
  { id: 18, category: "Operations", text: "Perusahaan garment mengalami overstock 40% di gudang karena forecasting demand yang buruk. Bagaimana memperbaiki?" },
  { id: 19, category: "Operations", text: "Perusahaan fleet management memiliki 500 kendaraan tapi utilisasi hanya 60%. Bagaimana meningkatkan ke 85%?" },
  { id: 20, category: "Operations", text: "Call center telco menangani 10.000 call/hari dengan FCR (first call resolution) hanya 45%. Target 75%. Susun strategy." },

  // Digital Transformation (21-30)
  { id: 21, category: "Digital Transformation", text: "Bank regional ingin mendigitalisasi proses KYC yang saat ini membutuhkan 5 hari kerja. Target 1 jam. Buat roadmap." },
  { id: 22, category: "Digital Transformation", text: "Perusahaan manufaktur tradisional ingin implementasi IoT di lantai produksi tapi workforce-nya resist terhadap perubahan. Bagaimana approach-nya?" },
  { id: 23, category: "Digital Transformation", text: "BUMN ingin membangun super app untuk layanan publik tapi memiliki 15 legacy system yang tidak terintegrasi. Susun strategy." },
  { id: 24, category: "Digital Transformation", text: "Retailer fashion ingin implementasi omnichannel tapi online dan offline team bekerja dalam silo. Breakdown masalah organisasi dan teknologi." },
  { id: 25, category: "Digital Transformation", text: "Perusahaan asuransi ingin menggunakan AI untuk underwriting tapi regulasi belum jelas. Bagaimana memulai?" },
  { id: 26, category: "Digital Transformation", text: "Koperasi simpan pinjam dengan 200 cabang ingin go digital tapi anggota rata-rata berusia 50+. Strategy?" },
  { id: 27, category: "Digital Transformation", text: "Perusahaan media cetak dengan 30 tahun sejarah ingin pivot ke digital media. Revenue model apa yang cocok?" },
  { id: 28, category: "Digital Transformation", text: "Pemerintah kota ingin membuat smart city dashboard tapi data tersebar di 20 dinas berbeda dengan format berbeda. Solusi?" },
  { id: 29, category: "Digital Transformation", text: "Perusahaan tambang ingin implementasi autonomous mining tapi infrastruktur IT di remote area sangat terbatas. Approach?" },
  { id: 30, category: "Digital Transformation", text: "Universitas swasta ingin mentransformasi pengalaman mahasiswa secara digital dari pendaftaran sampai alumni. Prioritas apa dulu?" },

  // Customer Experience (31-40)
  { id: 31, category: "Customer Experience", text: "NPS (Net Promoter Score) bank digital turun dari 72 ke 45 dalam 6 bulan. Identifikasi kemungkinan penyebab." },
  { id: 32, category: "Customer Experience", text: "Aplikasi food delivery mendapat rating 2.8/5 di app store. Keluhan utama: UX rumit, delivery lambat, customer service buruk. Prioritas perbaikan?" },
  { id: 33, category: "Customer Experience", text: "Hotel chain mewah mendapat review negatif berulang tentang inkonsistensi layanan antar cabang. Root cause?" },
  { id: 34, category: "Customer Experience", text: "E-commerce fashion memiliki return rate 35%, jauh di atas industri 15%. Breakdown penyebab dan solusi." },
  { id: 35, category: "Customer Experience", text: "Airline budget mendapat keluhan soal hidden charges yang membuat total harga jauh lebih mahal dari yang ditampilkan. Redesign pricing transparency." },
  { id: 36, category: "Customer Experience", text: "Perusahaan telco kehilangan 15% pelanggan post-paid ke kompetitor setiap kuartal. Buat retention framework." },
  { id: 37, category: "Customer Experience", text: "Klinik kecantikan premium mendapat complaint tentang hasil treatment tidak sesuai ekspektasi. Bagaimana mengelola expectation gap?" },
  { id: 38, category: "Customer Experience", text: "Platform edtech memiliki completion rate kursus hanya 8%. Breakdown penyebab dan strategi meningkatkan engagement." },
  { id: 39, category: "Customer Experience", text: "Supermarket chain ingin meningkatkan basket size rata-rata dari Rp 150.000 ke Rp 250.000. Strategy?" },
  { id: 40, category: "Customer Experience", text: "Perusahaan subscription box mengalami churn 20% setelah bulan ke-3. Kenapa dan bagaimana mengatasinya?" },

  // Finance (41-50)
  { id: 41, category: "Finance", text: "Perusahaan manufaktur memiliki DSO (Days Sales Outstanding) 90 hari, industri rata-rata 45 hari. Identifikasi masalah cash flow." },
  { id: 42, category: "Finance", text: "Startup yang sudah Series B burning rate Rp 5M/bulan tapi revenue hanya Rp 800jt. Kapan habis runway-nya dan apa action plan?" },
  { id: 43, category: "Finance", text: "Perusahaan properti ingin melakukan IPO tapi margin bersih hanya 3%. Bagaimana meningkatkan profitabilitas sebelum listing?" },
  { id: 44, category: "Finance", text: "Fintech lending memiliki NPL (Non-Performing Loan) rate 8%, regulasi maksimal 5%. Breakdown penyebab dan mitigasi." },
  { id: 45, category: "Finance", text: "Perusahaan retail dengan 100 toko ingin menutup 30 toko yang merugi tapi ada implikasi karyawan, sewa, dan brand. Decision framework?" },
  { id: 46, category: "Finance", text: "Holding company memiliki 5 subsidiary tapi transfer pricing antar entity tidak optimal. Bagaimana mengoptimasi?" },
  { id: 47, category: "Finance", text: "Perusahaan ekspor mengalami kerugian forex 10% karena fluktuasi USD/IDR. Hedging strategy?" },
  { id: 48, category: "Finance", text: "Cost of acquisition (CAC) digital bank 3x lebih tinggi dari LTV (Lifetime Value) customer. Bagaimana memperbaiki unit economics?" },
  { id: 49, category: "Finance", text: "Perusahaan F&B ingin ekspansi ke 3 kota baru tapi budget terbatas. Framework prioritasi investasi?" },
  { id: 50, category: "Finance", text: "Koperasi dengan aset Rp 500M ingin merger dengan koperasi lain. Due diligence apa saja yang diperlukan?" },

  // Supply Chain (51-60)
  { id: 51, category: "Supply Chain", text: "Perusahaan consumer goods bergantung pada 1 supplier untuk 70% bahan baku utama. Risk assessment dan mitigation plan?" },
  { id: 52, category: "Supply Chain", text: "Perusahaan elektronik mengalami stockout 15% SKU setiap bulan sementara 20% SKU overstock. Inventory optimization strategy?" },
  { id: 53, category: "Supply Chain", text: "Cold chain logistics untuk vaksin mengalami temperature excursion 5% dari total shipment. Identifikasi failure points." },
  { id: 54, category: "Supply Chain", text: "Perusahaan furniture custom-made memiliki lead time produksi 8 minggu, customer minta 3 minggu. Solusi?" },
  { id: 55, category: "Supply Chain", text: "Distributor FMCG ingin mengurangi biaya last-mile delivery di area rural yang tersebar. Strategy?" },
  { id: 56, category: "Supply Chain", text: "Perusahaan kosmetik ingin sourcing bahan baku lokal untuk mengurangi dependency import 80%. Roadmap?" },
  { id: 57, category: "Supply Chain", text: "Perusahaan e-commerce mengalami peak season (Harbolnas) dan fulfillment capacity tidak cukup. Bagaimana scaling strategy?" },
  { id: 58, category: "Supply Chain", text: "Perusahaan agribisnis kehilangan 25% produk karena post-harvest losses. Identifikasi titik kehilangan dan solusi." },
  { id: 59, category: "Supply Chain", text: "Pabrik otomotif mengalami gangguan supply chip semikonduktor. Strategi jangka pendek dan panjang?" },
  { id: 60, category: "Supply Chain", text: "Perusahaan farmasi harus memastikan traceability 100% dari bahan baku sampai pasien. Sistem apa yang dibutuhkan?" },

  // HR & Organization (61-70)
  { id: 61, category: "HR & Organization", text: "Perusahaan tech mengalami attrition rate 25% di engineer level senior. Exit interview menunjukkan masalah culture. Breakdown." },
  { id: 62, category: "HR & Organization", text: "Perusahaan multinasional ingin menerapkan remote-first policy tapi middle management resist. Change management strategy?" },
  { id: 63, category: "HR & Organization", text: "Startup yang grow dari 20 ke 200 orang dalam 1 tahun mengalami communication breakdown. Organizational restructuring?" },
  { id: 64, category: "HR & Organization", text: "Perusahaan BUMN ingin merekrut digital talent tapi salary range tidak kompetitif dengan swasta. Strategy?" },
  { id: 65, category: "HR & Organization", text: "Perusahaan family business generasi ke-3 ingin profesionalisasi manajemen. Bagaimana transisi tanpa conflict?" },
  { id: 66, category: "HR & Organization", text: "Engagement survey menunjukkan 60% karyawan merasa tidak punya career path yang jelas. Buat talent development framework." },
  { id: 67, category: "HR & Organization", text: "Merger 2 perusahaan dengan culture yang sangat berbeda (startup vs korporat). Integration playbook?" },
  { id: 68, category: "HR & Organization", text: "Perusahaan ingin mengurangi biaya training 30% tapi tetap meningkatkan kompetensi karyawan. Approach?" },
  { id: 69, category: "HR & Organization", text: "Tim cross-functional untuk proyek digital transformation tidak efektif — silo mentality masih kuat. Solusi?" },
  { id: 70, category: "HR & Organization", text: "Perusahaan dengan 5.000 karyawan ingin implementasi OKR tapi belum pernah punya performance framework terstruktur. Rollout plan?" },

  // Strategy & Growth (71-80)
  { id: 71, category: "Strategy & Growth", text: "Perusahaan taxi konvensional kehilangan 60% market share ke ride-hailing. Pivot strategy apa yang feasible?" },
  { id: 72, category: "Strategy & Growth", text: "Perusahaan media sosial lokal ingin bersaing dengan TikTok di pasar Indonesia. Competitive strategy?" },
  { id: 73, category: "Strategy & Growth", text: "Perusahaan batik tradisional ingin scale up tapi takut kehilangan kualitas artisan. Growth without compromise strategy?" },
  { id: 74, category: "Strategy & Growth", text: "Marketplace B2B untuk bahan bangunan ingin ekspansi dari Jawa ke seluruh Indonesia. Prioritization framework?" },
  { id: 75, category: "Strategy & Growth", text: "Perusahaan FMCG ingin masuk ke premium segment setelah 20 tahun di mass market. Brand architecture strategy?" },
  { id: 76, category: "Strategy & Growth", text: "Startup healthtech dengan telemedicine ingin menambah layanan apotek online. Build, buy, or partner analysis?" },
  { id: 77, category: "Strategy & Growth", text: "Perusahaan penerbangan ingin diversifikasi revenue stream selain tiket pesawat. Opportunity mapping?" },
  { id: 78, category: "Strategy & Growth", text: "Jaringan gym lokal dengan 10 cabang ingin franchise model. Readiness assessment apa saja?" },
  { id: 79, category: "Strategy & Growth", text: "Perusahaan renewable energy ingin masuk pasar Indonesia tapi regulasi dan infrastruktur belum mendukung. Entry strategy?" },
  { id: 80, category: "Strategy & Growth", text: "Perusahaan edtech B2C ingin pivot ke B2B (corporate training). Transformasi apa yang dibutuhkan?" },

  // Risk & Compliance (81-85)
  { id: 81, category: "Risk & Compliance", text: "Perusahaan fintech mengalami data breach yang mengekspos 100.000 data pelanggan. Crisis management dan remediation plan?" },
  { id: 82, category: "Risk & Compliance", text: "Perusahaan manufaktur gagal audit ISO 9001 di 3 area kritis. Corrective action plan?" },
  { id: 83, category: "Risk & Compliance", text: "Bank digital harus comply dengan regulasi OJK baru tentang responsible lending tapi sistem belum siap. Compliance roadmap?" },
  { id: 84, category: "Risk & Compliance", text: "Perusahaan tambang menghadapi protes komunitas lokal terkait dampak lingkungan. Stakeholder management strategy?" },
  { id: 85, category: "Risk & Compliance", text: "Perusahaan ekspor makanan harus memenuhi standar food safety baru dari EU. Gap analysis dan implementation plan?" },

  // Data & Analytics (86-90)
  { id: 86, category: "Data & Analytics", text: "Perusahaan retail memiliki data dari 10 sumber berbeda tapi tidak bisa membuat unified customer view. Data architecture strategy?" },
  { id: 87, category: "Data & Analytics", text: "Tim data science sudah buat 20 model ML tapi hanya 2 yang di-deploy ke production. Apa bottleneck-nya?" },
  { id: 88, category: "Data & Analytics", text: "Perusahaan telco ingin implementasi real-time personalization tapi latency saat ini 2 detik, target 200ms. Technical approach?" },
  { id: 89, category: "Data & Analytics", text: "Manajemen tidak percaya dengan dashboard BI karena data sering tidak akurat. Bagaimana membangun data trust?" },
  { id: 90, category: "Data & Analytics", text: "Perusahaan ingin menjadi data-driven tapi hanya 10% karyawan yang bisa membaca data. Data literacy program?" },
];

export function getDailyPrompt(date: Date = new Date()): Prompt {
  const seed = date.toDateString();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const index = Math.abs(hash) % prompts.length;
  return prompts[index];
}

export function getRandomPrompt(excludeId?: number): Prompt {
  const filtered = excludeId
    ? prompts.filter((p) => p.id !== excludeId)
    : prompts;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
