import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const endpoint = "http://localhost:3002/api/v1/formlaporan";
  const [formlaporan, setFormlaporan] = useState([]);
  const [newForm, setNewForm] = useState({
    Nama: '',
    Tanggal: '',
    Kategori: '',
    Lokasi: '',
    DetailKerusakan: '',
  });
  const [gambar, setGambar] = useState(null);
  const [error, setError] = useState(null);

  // Mengambil data laporan dari server (GET request)
  const fetchLaporan = async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFormlaporan(data.data); // Sesuaikan dengan respon backend
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  // Menghandle perubahan input form
  const handleChange = (e) => {
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value
    });
  };

  // Menghandle perubahan file input
  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  // Mengirimkan data ke server (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Menggunakan FormData untuk mengirim data dan file gambar
    const formData = new FormData();
    formData.append('Nama', newForm.Nama);
    formData.append('Tanggal', newForm.Tanggal);
    formData.append('Kategori', newForm.Kategori);
    formData.append('Lokasi', newForm.Lokasi);
    formData.append('DetailKerusakan', newForm.DetailKerusakan);
    formData.append('Gambar', gambar); // File gambar

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData, // Kirim FormData
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      alert('Data berhasil ditambahkan');
      fetchLaporan(); // Refresh data setelah submit
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav>
        <div className="logo">
          <a href="#">
            <img src="GOLDEN_HOUR.png" alt="Logo" className="logo-img" />
          </a>
        </div>
        <ul>
          <li><a href="#">Beranda</a></li>
          <li><a href="#about">Tentang</a></li>
          <li><a href="#report">Laporan Pengaduan</a></li>
        </ul>
      </nav>    

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Innovative Infrastructure Solutions</h1>
          <p>Building a better future, one project at a time.</p>
          <a href="#services" className="btn">Discover More</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="service-grid">
            <div className="service-item">
              <h3>Consulting</h3>
              <p>Expert consultation on infrastructure development.</p>
            </div>
            <div className="service-item">
              <h3>Planning</h3>
              <p>Professional planning for sustainable projects.</p>
            </div>
            <div className="service-item">
              <h3>Construction</h3>
              <p>Reliable and efficient construction services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <h2>Tentang Kami</h2>
          <div className="about-grid">
            <div className="about-item">
              <i className="fas fa-building"></i>
              <h3>Siapa Kami</h3>
              <p>Website pengaduan infrastruktur untuk melaporkan setiap kerusakan fasilitas umum di wilayah Jawa Timur. Laporan pengaduan akan diproses dalam waktu kurang dari 24 jam.</p>
            </div>
            <div className="about-item">
              <i className="fas fa-bullseye"></i>
              <h3>Visi</h3>
              <p>Menjadi pemimpin dalam industri infrastruktur dengan komitmen terhadap kualitas, keselamatan, dan keberlanjutan.</p>
            </div>
            <div className="about-item">
              <i className="fas fa-handshake"></i>
              <h3>Misi</h3>
              <p>Membangun kemitraan jangka panjang dengan klien melalui layanan andal dan solusi yang disesuaikan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Laporan Pengaduan */}
      <section id="report">
        <div className="container">
          <h2>Laporan Pengaduan</h2>
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-group">
              <label htmlFor="name">Nama Anda:</label>
              <input name="Nama" value={newForm.Nama} onChange={handleChange} placeholder="Nama lengkap Anda" required />
            </div>
            <div className="form-group">
              <label htmlFor="tanggal">Tanggal:</label>
              <input name="Tanggal" value={newForm.Tanggal} onChange={handleChange} placeholder="Masukkan tanggal" required type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="kategori">Kategori:</label>
              <textarea name="Kategori" value={newForm.Kategori} onChange={handleChange} placeholder="Masukan kategori" required />
            </div>
            <div className="form-group">
              <label htmlFor="lokasi">Lokasi:</label>
              <textarea name="Lokasi" value={newForm.Lokasi} onChange={handleChange} placeholder="Masukan lokasi kerusakan" required />
            </div>
            <div className="form-group">
              <label htmlFor="issue">Detail Kerusakan:</label>
              <textarea name="DetailKerusakan" value={newForm.DetailKerusakan} onChange={handleChange} rows="5" placeholder="Jelaskan masalah yang Anda temui" required />
            </div>
            <div className="form-group">
              <label htmlFor="file">Unggah Gambar (opsional):</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn">Kirim Laporan</button>
          </form>
        </div>
      </section>

      {error && <p>Error: {error}</p>}
      {!formlaporan.length ? (
        <p>Loading...</p>
      ) : (
        formlaporan.map((laporan) => (
          <div key={laporan.id} className="laporan-card">
            <p><strong>Nama:</strong> {laporan.Nama}</p>
            <p><strong>Tanggal:</strong> {laporan.Tanggal}</p>
            <p><strong>Kategori:</strong> {laporan.Kategori}</p>
            <p><strong>Lokasi:</strong> {laporan.Lokasi}</p>
            <p><strong>Detail Kerusakan:</strong> {laporan.DetailKerusakan}</p>
            {laporan.Gambar && <img src={`http://localhost:3002/uploads/${laporan.Gambar}`} alt={`Gambar ${laporan.Nama}`} width="200" />}
          </div>
        ))
      )}

      <footer>
        <p>&copy; 2024 Modern Infrastructure. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
