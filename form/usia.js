const tanggalLahir = document.getElementById('tanggal-lahir');
const usia = document.getElementById('usia');

const formatTanggal = (tanggal) => {
    const tahun = tanggal.getFullYear();
    const bulan = String(tanggal.getMonth() + 1).padStart(2, '0');
    const hari = String(tanggal.getDate()).padStart(2, '0');

    return `${tahun}-${bulan}-${hari}`;
};

const hitungUsia = () => {
    if (!tanggalLahir.value) {
        usia.value = '';
        return;
    }

    const [tahun, bulan, hari] = tanggalLahir.value.split('-').map(Number);
    const tanggalLahirDipilih = new Date(tahun, bulan - 1, hari);
    const hariIni = new Date();
    let usiaSekarang = hariIni.getFullYear() - tanggalLahirDipilih.getFullYear();
    const belumUlangTahun =
        hariIni.getMonth() < tanggalLahirDipilih.getMonth() ||
        (hariIni.getMonth() === tanggalLahirDipilih.getMonth() && hariIni.getDate() < tanggalLahirDipilih.getDate());

    if (belumUlangTahun) {
        usiaSekarang -= 1;
    }

    usia.value = usiaSekarang >= 0 ? usiaSekarang : '';
};

tanggalLahir.max = formatTanggal(new Date());
tanggalLahir.addEventListener('change', hitungUsia);
