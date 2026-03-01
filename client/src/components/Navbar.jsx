import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, X, Network, User, LogOut } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/materials', label: 'Materi' },
    { path: '/dashboard', label: 'Dashboard', private: true },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        <Network className="logo-icon" />
        <span>TKJ</span>Education
      </Link>

      <div className="nav-center">
        <form onSubmit={handleSearch} className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari materi (Cisco, Mikrotik, Linux...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <ul className={`menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          (!link.private || user) && (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          )
        ))}
        
        {user ? (
          <>
            <li className="user-info">
              <User size={16} />
              <span>{user.username}</span>
            </li>
            <li>
              <button onClick={logout} className="btn-logout">
                <LogOut size={16} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="btn-login">Login</Link>
            </li>
            <li>
              <Link to="/register" className="btn-register">Daftar</Link>
            </li>
          </>
        )}
      </ul>

      <button 
        className="hamburger" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
};

export default Navbar;
