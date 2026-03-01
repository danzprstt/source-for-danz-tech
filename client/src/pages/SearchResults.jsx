import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/materials/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (err) {
      setError('Terjadi kesalahan saat mencari materi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results-page">
      <section className="search-header">
        <div className="search-info">
          <Search size={32} />
          <h2>Hasil Pencarian</h2>
          <p>Menampilkan hasil untuk: <strong>"{query}"</strong></p>
        </div>
      </section>

      <section className="search-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Mencari materi...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <AlertCircle size={48} />
            <p>{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="no-results">
            <BookOpen size={64} />
            <h3>Tidak ada hasil ditemukan</h3>
            <p>Coba gunakan kata kunci lain seperti "Cisco", "Mikrotik", "Linux", atau "Fiber Optic"</p>
          </div>
        ) : (
          <div className="results-grid">
            <p className="results-count">Ditemukan {results.length} materi</p>
            {results.map((material, index) => (
              <motion.div
                key={material.id}
                className="card result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={`result-category ${material.category_color}`}>
                  {material.category_name}
                </div>
                <h3>{material.title}</h3>
                <p>{material.description}</p>
                <div className="result-meta">
                  <span>Oleh: {material.author}</span>
                  <span>•</span>
                  <span>{material.duration}</span>
                </div>
                <Link to={`/materials/${material.id}`} className="btn btn-primary">
                  Lihat Detail <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
