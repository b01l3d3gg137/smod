let userNIM = "";

window.onload = function () {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    window.location.href = "/index.html";
    return;
  }

  const data = JSON.parse(userInfo);
  userNIM = data.data.user_login.username; // Simpan NIM user
  displayImage();
  displayUserInfo(data);
  displayMenuItems();
  updateUserInitial(data.mhs.nama);
};

// Array berisi kutipan-kutipan
const quotes = [
"Jangan cuma scroll TikTok, scroll juga buku. Masa depanmu bukan di FYP, tapi di graduation stage.",
"(Jangan hanya berselancar di TikTok, tapi juga baca buku. Masa depanmu bukan di halaman FYP, melainkan di panggung kelulusan.)",
"Perkuliahan itu kayak game level up. Setiap semester adalah tantangan baru. Jangan stuck di satu level aja, ya!",
"(Perkuliahan itu seperti permainan yang terus naik level. Setiap semester adalah tantangan baru. Jangan terjebak di satu level saja!)",
"Hustle itu penting, tapi jangan lupa self-care. Badai pasti berlalu, tapi nilai UTS tetap ada.",
"(Bekerja keras itu penting, tapi jangan lupa merawat diri. Masalah pasti akan selesai, tapi ujian tengah semester tetap ada.)",
"Jangan takut gagal, karena gagal itu cuma versi lain dari belajar.",
"Hidup itu kayak es kopi susu, pahit manisnya harus dirasain. Begitu juga dengan perkuliahan.",
"Kamu adalah versi terbaik dari dirimu sendiri. Jadi, jangan pernah berhenti untuk berkembang.",
"Jangan cuma nge-trend, tapi jadilah trendsetter.",
"Mimpi setinggi langit, tapi jangan lupa grounded.",
"Percaya diri itu kunci utama. Jangan pernah ragu untuk tunjukkan kemampuanmu.",
"Jangan jadi penonton, tapi jadilah pemain utama dalam cerita hidupmu.",
"Kuliah itu bukan hanya tentang nilai, tapi juga tentang pengalaman.",
"Jangan takut keluar dari zona nyaman, karena disitulah pertumbuhan dimulai.",
"Investasi terbaik adalah investasi pada diri sendiri.",
"Jangan pernah menyerah pada mimpimu, karena mimpi adalah kompas yang akan membawamu ke tujuan.",
"Jadilah versi terbaik dari dirimu, bukan versi terbaik dari orang lain.",
"Kuliah itu bukan sprint, tapi marathon. Jadi, jaga stamina dan jangan cepat lelah.",
"Kegagalan bukan akhir dari segalanya, tapi awal dari sebuah keberhasilan.",
"Jangan takut bertanya, karena bertanya adalah tanda bahwa kamu ingin belajar.",
"Temukan passionmu, lalu kejarlah dengan sekuat tenaga.",
"Masa depanmu ada di tanganmu sendiri. Jadi, raihlah dengan segenap kemampuanmu.",
];

// Fungsi untuk mendapatkan kutipan secara acak
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}      

      // Fungsi untuk memperbarui inisial pengguna
function updateUserInitial(fullName) {
  const userInitialDiv = document.getElementById("userInitial");
  const initial = fullName.charAt(0).toUpperCase(); // Ambil huruf pertama dan ubah jadi huruf kapital
  userInitialDiv.querySelector('span').textContent = initial; // Ganti teks di dalam span
}

  // Menampilkan kutipan acak di elemen dengan ID quote-display
 document.getElementById('quote-display').textContent = getRandomQuote();

function displayImage() {
  const imageDiv = document.getElementById("userImage");
  imageDiv.innerHTML = `
    <img src="https://simantap.unper.ac.id/storage/mahasiswa/2021/${userNIM}.png"/>
  
  `;
}

function displayUserInfo(data) {
  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = `
        <span class="text-2xl font-semibold">Selamat Malam,</span>
        <span class="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text poppins-bold font-semibold">${data.mhs.nama}</span>
        <span>👋</span>
    `;
}

function displayMenuItems() {
  const menuItemsDiv = document.getElementById("menuItems");
  menuItemsDiv.innerHTML = `
    <div class="flex justify-between w-full max-w-xs">
      <button class="btn btn-outline flex-1 mr-2 color-buttom" onclick="checkAndRedirect('uts')">
        <span class="menu-item">Cetak Kartu UTS</span>
      </button>
      <button class="btn btn-outline flex-1 ml-2 color-buttom" onclick="checkAndRedirect('uas')">
        <span class="menu-item">Cetak Kartu UAS</span>
      </button>
    </div>
    <button class="btn btn-outline mt-4 color-buttom" onclick="cetakTranskrip()">
      <div class="menu-item">Cetak Kartu Transkrip</div>
    </button>
  `;
}


function checkAndRedirect(type) {
  const nim = userNIM; // Pastikan nim diambil dari context yang benar
  const url = `https://voip.sbp.net.id:3000/proxy/cek-pdf?nim=${nim}&type=${type}`;

  // Cek status file melalui server proxy
  fetch(url, {
      method: 'GET',
      credentials: 'include'  // Mengirimkan cookies, termasuk cookies untuk sesi pengguna
  })
  .then(response => {
      if (response.status === 500) {
          // Jika statusnya 500, berarti ada masalah, kemungkinan karena belum login
          showLoginWarning();
      } else if (response.ok) {
          // Jika statusnya 200 OK, lanjutkan untuk mengunduh PDF
          const downloadUrl = `https://simantap.unper.ac.id/cetak/${nim}/205/kartu-${type}.pdf?print=pdf`;
          // const downloadUrl = `http://localhost:3000/proxy/download-pdf?nim=${nim}&type=${type}`;
          window.open(downloadUrl, '_blank');
      } else {
          // Jika status lainnya selain 500 atau 200, anggap ada kesalahan
          throw new Error('Terjadi kesalahan saat mengakses URL');
      }
  })
  .catch(error => {
      console.error(error);
      showLoginWarning();
  });
}




function showLoginWarning() {
  const modal = document.getElementById("my_modal_1");
  modal.showModal();  // Menampilkan modal
}




async function cetakTranskrip() {
  try {
    const response = await fetch(
      "https://voip.sbp.net.id:3000/proxy/transkrip",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim: userNIM }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transkrip_${userNIM}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      alert("Gagal mengunduh transkrip");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengunduh transkrip");
  }
}

function logout() {
  localStorage.removeItem("userInfo");
  window.location.href = "../index.html";
}

  // Mendapatkan elemen dengan ID current-year
const yearElement = document.getElementById('current-year');
// Mengupdate konten dengan tahun saat ini
 yearElement.textContent = new Date().getFullYear();
