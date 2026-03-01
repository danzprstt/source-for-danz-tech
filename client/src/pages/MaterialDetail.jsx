import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';
import '../styles/MaterialDetail.css';

const MaterialDetail = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  const fetchMaterial = async () => {
    try {
      const response = await axios.get(`/api/materials/${id}`);
      setMaterial(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Memuat...</div>;
  if (!material) return <div className="error">Materi tidak ditemukan</div>;

  return (
    <div className="material-detail-page">
      <section className="material-header">
        <Link to="/materials" className="back-link">
          <ArrowLeft size={20} /> Kembali
        </Link>
        <span className={`category-badge ${material.category_color}`}>
          {material.category_name}
        </span>
        <h1>{material.title}</h1>
        <div className="meta">
          <span><User size={16} /> {material.author}</span>
          <span><Clock size={16} /> {material.duration}</span>
        </div>
      </section>

      <section className="material-content">
        <div className="content-card">
          <h2>Deskripsi</h2>
          <p>{material.description}</p>
          
          <h2>Konten</h2>
          <div className="content-text">
            {material.content || 'Konten sedang dalam pengembangan...'}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaterialDetail;

