import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, User, LogOut } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Selamat datang kembali, <strong>{user?.username}</strong>!</p>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-cards">
          <div className="card dashboard-card">
            <BookOpen size={48} />
            <h3>Materi Saya</h3>
            <p>Akses semua materi pembelajaran TKJ</p>
            <Link to="/materials" className="btn btn-primary">
              Lihat Materi
            </Link>
          </div>

          <div className="card dashboard-card">
            <User size={48} />
            <h3>Profil</h3>
            <p>Kelola informasi akun Anda</p>
            <button className="btn btn-secondary" disabled>
              Coming Soon
            </button>
          </div>

          <div className="card dashboard-card">
            <LogOut size={48} />
            <h3>Logout</h3>
            <p>Keluar dari akun</p>
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

