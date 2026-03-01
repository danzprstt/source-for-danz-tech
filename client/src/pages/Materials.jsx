import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';
import '../styles/Materials.css';

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchMaterials();
    fetchCategories();
  }, [selectedCategory]);

  const fetchMaterials = async () => {
    try {
      const url = selectedCategory && selectedCategory !== 'all' 
        ? `/api/materials?category=${selectedCategory}`
        : '/api/materials';
      const response = await axios.get(url);
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching materials:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Memuat materi...</p>
      </div>
    );
  }

  return (
    <div className="materials-page">
      <section className="materials-hero">
        <div className="section-title">
          <h2>Daftar Materi Pembelajaran</h2>
          <p>Pilih materi sesuai kategori yang ingin kamu pelajari</p>
        </div>
      </section>

      <section className="materials-content">
        <div className="category-filter">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => handleCategoryChange('all')}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={selectedCategory === cat.name ? 'active' : ''}
              onClick={() => handleCategoryChange(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="materials-grid">
          {materials.length === 0 ? (
            <div className="no-results">
              <BookOpen size={64} />
              <p>Belum ada materi untuk kategori ini</p>
            </div>
          ) : (
            materials.map((material, index) => (
              <motion.div
                key={material.id}
                className="card material-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`material-header bg-${material.category_color || 'cyan'}`}>
                  <span className="category-badge">{material.category_name}</span>
                </div>
                <div className="material-content">
                  <h3>{material.title}</h3>
                  <p>{material.description}</p>
                  
                  <div className="material-meta">
                    <span><User size={16} /> {material.author}</span>
                    <span><Clock size={16} /> {material.duration}</span>
                  </div>
                  
                  <Link to={`/materials/${material.id}`} className="card-btn">
                    Baca Materi <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Materials;
