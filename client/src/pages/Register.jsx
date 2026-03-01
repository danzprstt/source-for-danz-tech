import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Network, User, Mail, Lock, ArrowRight } from 'lucide-react';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    setIsLoading(true);
    const success = await register(formData.username, formData.email, formData.password);
    setIsLoading(false);
    if (success) navigate('/login');
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <Network size={48} className="auth-logo" />
          <h2>Buat Akun Baru</h2>
          <p>Mulai perjalananmu menjadi Network Engineer</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <User size={20} />
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Memuat...' : (
              <>
                Daftar <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Sudah punya akun? <Link to="/login">Masuk sekarang</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
