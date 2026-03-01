import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Network, Mail, Lock, ArrowRight } from 'lucide-react';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(formData.email, formData.password);
    setIsLoading(false);
    if (success) navigate('/dashboard');
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
          <h2>Selamat Datang Kembali</h2>
          <p>Masuk untuk melanjutkan pembelajaranmu</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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

          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Memuat...' : (
              <>
                Masuk <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Belum punya akun? <Link to="/register">Daftar sekarang</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
