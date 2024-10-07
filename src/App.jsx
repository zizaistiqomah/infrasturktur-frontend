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
      <h1>Form Laporan Infrastruktur</h1>
      
      {/* Form input */}
      <form onSubmit={handleSubmit}>
        <input name="Nama" value={newForm.Nama} onChange={handleChange} placeholder="Nama" required />
        <input name="Tanggal" value={newForm.Tanggal} onChange={handleChange} placeholder="Tanggal" required type="date" />
        <input name="Kategori" value={newForm.Kategori} onChange={handleChange} placeholder="Kategori" required />
        <input name="Lokasi" value={newForm.Lokasi} onChange={handleChange} placeholder="Lokasi" required />
        <input name="DetailKerusakan" value={newForm.DetailKerusakan} onChange={handleChange} placeholder="Detail Kerusakan" required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Kirim</button>
      </form>

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
    </div>
  );
}

export default App;
