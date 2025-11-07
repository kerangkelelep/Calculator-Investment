// Menunggu sampai seluruh halaman HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

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
        // Gunakan parseFloat untuk mengubah teks (string) menjadi angka desimal
        const principal = parseFloat(document.getElementById('principal').value);
        const monthly = parseFloat(document.getElementById('monthly').value);
        const rate = parseFloat(document.getElementById('rate').value);
        const years = parseFloat(document.getElementById('years').value);

        // 2. Lakukan Perhitungan (Logika Inti)
        
        // Ubah bunga tahunan (%) menjadi bunga bulanan (desimal)
        // Contoh: 8% per tahun -> (8 / 100) / 12 = 0.00666... per bulan
        const monthlyRate = (rate / 100) / 12;

        // Ubah jangka waktu (tahun) menjadi total bulan
        const totalMonths = years * 12;

        // Siapkan variabel untuk total nilai
        let futureValue = principal;

        // Gunakan loop untuk menghitung bunga setiap bulan
        for (let i = 0; i < totalMonths; i++) {
            // Hitung bunga dari saldo saat ini
            let interestThisMonth = futureValue * monthlyRate;
            // Tambahkan bunga ke saldo
            futureValue += interestThisMonth;

            // Tambahkan setoran bulanan (di akhir bulan)
            futureValue += monthly;
        }

        // Hitung total modal yang disetor
        const totalPrincipal = principal + (monthly * totalMonths);

        // Hitung total bunga yang didapat
        const totalInterest = futureValue - totalPrincipal;

        // 3. Tampilkan Hasil ke Halaman
        
        // Tampilkan hasil dalam format mata uang Rupiah
        resultTotalEl.textContent = formatCurrency(futureValue);
        resultPrincipalEl.textContent = formatCurrency(totalPrincipal);
        resultInterestEl.textContent = formatCurrency(totalInterest);

        // Tampilkan wadah hasil yang tadi disembunyikan
        resultContainer.classList.remove('hidden');
    });

    // Fungsi bantuan untuk memformat angka menjadi Rupiah (Rp)
    function formatCurrency(number) {
        // Menggunakan fitur bawaan browser untuk format mata uang
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, // Tidak menampilkan desimal
            maximumFractionDigits: 0
        }).format(number);
    }
});
