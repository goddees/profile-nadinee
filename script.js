// ================= ELEMEN UTAMA =================
const deskripsi  = document.querySelector("#deskripsi");
const tombolTeks = document.querySelector("#tombolTeks");
const tombolTema = document.querySelector("#tombolTema");
const foto       = document.querySelector(".profil img");
const kartu      = document.querySelectorAll(".kartu");

const acak = (a) => a[Math.floor(Math.random() * a.length)];

// ================= KELOPAK =================
// Kelopak jatuh pelan di background
function kelopakJatuh() {
  const k = document.createElement("div");
  k.className = "kelopak";
  k.style.left = Math.random() * 100 + "vw";
  k.style.setProperty("--s", 20 + Math.random() * 40 + "px");
  k.style.animationDuration = 9 + Math.random() * 7 + "s";
  document.body.appendChild(k);
  setTimeout(() => k.remove(), 17000);
}
setInterval(kelopakJatuh, 900);

// Kelopak meledak dari titik tertentu
function ledakKelopak(x, y, jumlah = 22) {
  for (let i = 0; i < jumlah; i++) {
    const k = document.createElement("div");
    k.className = "kelopak letus";
    const sudut = Math.random() * Math.PI * 2;
    const jarak = 70 + Math.random() * 150;
    k.style.left = x + "px";
    k.style.top = y + "px";
    k.style.setProperty("--dx", Math.cos(sudut) * jarak + "px");
    k.style.setProperty("--dy", Math.sin(sudut) * jarak + 40 + "px");
    k.style.setProperty("--r", Math.random() * 540 - 270 + "deg");
    document.body.appendChild(k);
    setTimeout(() => k.remove(), 1600);
  }
}

// ================= FOTO: ORBIT + LABEL =================
if (foto) {
  const orbit = document.createElement("div");
  orbit.className = "orbit";
  foto.parentNode.insertBefore(orbit, foto);
  orbit.appendChild(foto);
  orbit.insertAdjacentHTML("afterbegin", '<div class="ring"></div>');

  // [teks, posisi, warna titik, delay]
  const label = [
    ["Informatika", "top:4%; left:2%",       "#ff6fa8", "0s"],
    ["Web",         "top:18%; right:-4%",    "#a46bd9", ".6s"],
    ["Cooking",     "bottom:20%; left:-6%",  "#ffb347", "1.2s"],
    ["Baking",      "bottom:6%; right:2%",   "#7ed6a5", "1.8s"],
    ["Hiking",      "top:-3%; right:30%",    "#6ec1ff", "2.4s"],
  ];
  label.forEach(([teks, pos, warna, d]) => {
    const c = document.createElement("div");
    c.className = "chip";
    c.textContent = teks;
    c.style.cssText = `${pos};--w:${warna};--d:${d}`;
    orbit.appendChild(c);
  });

  const petunjuk = document.createElement("p");
  petunjuk.className = "petunjuk";
  petunjuk.textContent = "Sentuh fotonya ✨";
  orbit.after(petunjuk);

  foto.addEventListener("click", () => {
    foto.classList.remove("pop");
    void foto.offsetWidth;
    foto.classList.add("pop");
    const r = foto.getBoundingClientRect();
    ledakKelopak(r.left + r.width / 2, r.top + r.height / 2, 28);
  });
}

// ================= PITA TEKS BERJALAN =================
const kata = ["HTML", "CSS", "JavaScript", "Git", "Figma", "Cooking", "Baking", "Hiking"];
const isi = kata.map((k) => `<span>${k}</span><span>🌸</span>`).join("");
const pita = document.createElement("div");
pita.className = "pita";
pita.innerHTML = `<div class="jalur">${isi}${isi}${isi}${isi}</div>`;
const judulHobi = document.querySelector(".judul-bagian");
(judulHobi || document.body).before(pita);

// ================= NAMA: HURUF LONCAT =================
const namaEl = document.querySelector(".profil h2");
if (namaEl) {
  const warna = ["#e0518f", "#a46bd9", "#ff8a5c", "#4fb9a0", "#d6479b"];
  namaEl.innerHTML = [...namaEl.textContent]
    .map((h) => (h === " " ? " " : `<span class="nama-huruf">${h}</span>`))
    .join("");
  namaEl.querySelectorAll(".nama-huruf").forEach((s) =>
    s.addEventListener("mouseenter", () => { s.style.color = acak(warna); })
  );
}

// ================= TOMBOL: KELOPAK SAAT KLIK =================
document.querySelectorAll("button").forEach((b) => {
  b.addEventListener("click", () => {
    const r = b.getBoundingClientRect();
    ledakKelopak(r.left + r.width / 2, r.top + r.height / 2, 10);
  });
});

// ================= "CHANGE TEXT": DIKETIK SATU-SATU =================
const daftarTeks = [
  "Halooo! i'm Nadine, a first-semester Informatics Engineering student, and I'm learning how to make websites. I love trying new things, especially anything tech, because technology changes so fast every day.",
  "Hey there! I'm Nadine, a first-semester Informatics Engineering student, and I'm just getting started with building websites. I'm always excited to try new stuff, especially tech, because it keeps changing every single day.",
  "Hi, I'm Nadine! I'm in my first semester of Informatics Engineering, and right now I'm learning how to build websites. Trying new things is kind of my thing, especially in tech, because it never stops moving forward.",
];
let nomor = 0;
let timerKetik;

tombolTeks.addEventListener("click", () => {
  nomor = (nomor + 1) % daftarTeks.length;
  const huruf = Array.from(daftarTeks[nomor]);
  clearInterval(timerKetik);
  deskripsi.textContent = "";
  deskripsi.classList.add("ketik");
  let i = 0;
  timerKetik = setInterval(() => {
    deskripsi.textContent = huruf.slice(0, ++i).join("");
    if (i >= huruf.length) {
      clearInterval(timerKetik);
      setTimeout(() => deskripsi.classList.remove("ketik"), 1500);
    }
  }, 25);
});

// ================= "SWITCH THEME": MODE GELAP + KUNANG-KUNANG =================
const bulan = document.createElement("div");
bulan.id = "bulan";
bulan.textContent = "🌙";
document.body.appendChild(bulan);

let timerKunang;
function kunangKunang() {
  const k = document.createElement("div");
  k.className = "kunang";
  k.style.left = Math.random() * 100 + "vw";
  k.style.top = 30 + Math.random() * 65 + "vh";
  k.style.setProperty("--x", Math.random() * 160 - 80 + "px");
  k.style.setProperty("--y", Math.random() * -120 + "px");
  k.style.setProperty("--t", 4 + Math.random() * 4 + "s");
  document.body.appendChild(k);
  setTimeout(() => k.remove(), 8200);
}

tombolTema.addEventListener("click", () => {
  const gelap = document.body.classList.toggle("gelap");
  clearInterval(timerKunang);
  if (gelap) timerKunang = setInterval(kunangKunang, 350);
  const r = tombolTema.getBoundingClientRect();
  ledakKelopak(r.left + r.width / 2, r.top, 14);
});

// ================= KARTU HOBI =================
const detail = [
  "Resep dari TikTok langsung kucoba! 🍳",
  "Kue, roti, dan cookies buat orang tersayang 🍪",
  "Liburan = waktunya naik gunung 🥾",
];
kartu.forEach((k, i) => {
  // bungkus emoji di judul supaya bisa goyang
  const h3 = k.querySelector("h3");
  if (h3) {
    h3.innerHTML = h3.textContent.replace(
      /(\p{Extended_Pictographic}\uFE0F?)/gu,
      '<span class="emoji">$1</span>'
    );
  }

  const p = document.createElement("p");
  p.className = "detail";
  p.textContent = detail[i] || "Hobi favoritku! 💗";
  k.appendChild(p);

  k.addEventListener("click", () => {
    k.classList.toggle("terbuka");
    k.classList.remove("goyang");
    void k.offsetWidth;
    k.classList.add("goyang");
    const r = k.getBoundingClientRect();
    ledakKelopak(r.left + r.width / 2, r.top + 30, 12);
  });
});

// ================= BAR SCROLL + TOMBOL ROKET =================
const progres = document.createElement("div");
progres.id = "progres";
document.body.appendChild(progres);

const naik = document.createElement("div");
naik.id = "naik";
naik.textContent = "🚀";
document.body.appendChild(naik);
naik.addEventListener("click", () => {
  naik.classList.add("terbang");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => naik.classList.remove("terbang"), 1100);
});

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight || 1;
  progres.style.width = (window.scrollY / total) * 100 + "%";
  naik.classList.toggle("tampil", window.scrollY > 300);
});

// ================= BUNGA MENGIKUTI KURSOR =================
const pengikut = document.createElement("div");
pengikut.id = "pengikut";
pengikut.innerHTML = "<span>🌸</span>";
document.body.appendChild(pengikut);

let mx = -50, my = -50, px = -50, py = -50;
document.addEventListener("mousemove", (e) => { mx = e.clientX + 14; my = e.clientY + 14; });
(function gerak() {
  px += (mx - px) * 0.15;
  py += (my - py) * 0.15;
  pengikut.style.transform = `translate(${px}px, ${py}px)`;
  requestAnimationFrame(gerak);
})();
document.addEventListener("mouseover", (e) => {
  pengikut.classList.toggle("besar", !!e.target.closest("button, .kartu, img, #naik"));
});

// ================= EASTER EGG: KETIK "love" =================
let ketikan = "";
document.addEventListener("keydown", (e) => {
  ketikan = (ketikan + e.key).toLowerCase().slice(-4);
  if (ketikan === "love") {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const h = document.createElement("div");
        h.className = "kelopak hati";
        h.textContent = acak(["💗", "💖", "💕", "🩷"]);
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = 18 + Math.random() * 20 + "px";
        h.style.setProperty("--s", "30px");
        h.style.animationDuration = 4 + Math.random() * 3 + "s";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 7500);
      }, i * 100);
    }
  }
});
