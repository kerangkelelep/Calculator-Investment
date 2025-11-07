// File: script.js (Versi BARU dengan format)

// Menunggu sampai seluruh halaman HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // --- BAGIAN BARU: FUNGSI FORMAT INPUT ---
    
    // "Pegang" input yang ingin kita format
    const principalInput = document.getElementById('principal');
    const monthlyInput = document.getElementById('monthly');

    // Fungsi untuk memformat angka dengan pemisah ribuan (titik)
    function formatNumber(number) {
        // Gunakan format 'id-ID' (Bahasa Indonesia) untuk pemisah ribuan
        return new Intl.NumberFormat('id-ID').format(number);
    }

    // Fungsi untuk membersihkan nilai input (menghapus titik/koma)
    function cleanNumber(value) {
        // Ganti semua karakter non-angka (selain angka 0-9)
        return value.replace(/[^0-9]/g, '');
    }

    // Fungsi untuk menerapkan format saat pengguna mengetik
    function onInputFormat(event) {
        // 1. Ambil nilai mentah dan bersihkan
        const input = event.target;
        const value = input.value;
        const cleanedValue = cleanNumber(value);

        // 2. Jika kosong, jangan lakukan apa-apa
        if (cleanedValue === '') {
            input.value = '';
            return;
        }

        // 3. Ubah menjadi angka dan format kembali
        const number = parseFloat(cleanedValue);
        const formattedValue = formatNumber(number);

        // 4. Setel nilai input ke nilai yang sudah diformat
        input.value = formattedValue;
    }

    // Tambahkan "pendengar" ke setiap input
    principalInput.addEventListener('input', onInputFormat);
    monthlyInput.addEventListener('input', onInputFormat);
    
    // Format nilai default saat halaman dimuat
    principalInput.value = formatNumber(cleanNumber(principalInput.value));
    monthlyInput.value = formatNumber(cleanNumber(monthlyInput.value));

    // --- AKHIR BAGIAN BARU ---


    // --- BAGIAN LAMA: LOGIKA KALKULATOR (Dengan Modifikasi) ---

    // "Pegang" elemen-elemen penting dari HTML
    const investForm = document.getElementById('invest-form');
    const resultContainer = document.getElementById('result-container');
    
    // "Pegang" elemen-elemen untuk menampilkan hasil
    const resultTotalEl = document.getElementById('result-total');
    const resultPrincipalEl = document.getElementById('result-principal');
    const resultInterestEl = document.getElementById('result-interest');

    // Tambahkan "pendengar" ke formulir. Jalankan fungsi saat disubmit.
    investForm.addEventListener('submit', (event) => {
        // Mencegah halaman me-refresh saat tombol submit ditekan
        event.preventDefault();

        // 1. Ambil semua nilai input dari formulir
        
        // MODIFIKASI DI SINI: Bersihkan nilai sebelum di-parse
        const principal = parseFloat(cleanNumber(principalInput.value));
        const monthly = parseFloat(cleanNumber(monthlyInput.value));
        
        // Input ini tidak perlu dibersihkan karena tipenya "number"
        const rate = parseFloat(document.getElementById('rate').value);
        const years = parseFloat(document.getElementById('years').value);

        // 2. Lakukan Perhitungan (Logika Inti)
        
        const monthlyRate = (rate / 100) / 12;
        const totalMonths = years * 12;
        
        // Cek jika input tidak valid (misal: kosong setelah dibersihkan)
        if (isNaN(principal) || isNaN(monthly) || isNaN(rate) || isNaN(years)) {
            alert("Harap isi semua kolom dengan angka yang valid.");
            return;
        }

        let futureValue = principal;

        for (let i = 0; i < totalMonths; i++) {
            let interestThisMonth = futureValue * monthlyRate;
            futureValue += interestThisMonth;
            futureValue += monthly;
        }

        const totalPrincipal = principal + (monthly * totalMonths);
        const totalInterest = futureValue - totalPrincipal;

        // 3. Tampilkan Hasil ke Halaman
        
        resultTotalEl.textContent = formatCurrency(futureValue);
        resultPrincipalEl.textContent = formatCurrency(totalPrincipal);
        resultInterestEl.textContent = formatCurrency(totalInterest);

        resultContainer.classList.remove('hidden');
    });

    // Fungsi bantuan untuk memformat angka menjadi Rupiah (Rp)
    function formatCurrency(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    }
});
