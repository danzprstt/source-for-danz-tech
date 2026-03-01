import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Network, 
  Server, 
  Shield, 
  Wifi, 
  Cable, 
  Cpu,
  ArrowRight,
  BookOpen,
  Users,
  Award
} from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const categories = [
    { icon: <Network size={40} />, title: 'Cisco Networking', desc: 'Routing & Switching, CCNA, Network Security', color: 'cyan' },
    { icon: <Wifi size={40} />, title: 'Mikrotik', desc: 'RouterOS, Wireless, Hotspot Management', color: 'purple' },
    { icon: <Server size={40} />, title: 'Linux Server', desc: 'Ubuntu, CentOS, Server Administration', color: 'pink' },
    { icon: <Cable size={40} />, title: 'Fiber Optic', desc: 'FO Cable, OTDR, Splicing, Network Cabling', color: 'blue' },
    { icon: <Shield size={40} />, title: 'Cyber Security', desc: 'Firewall, VPN, Ethical Hacking Basics', color: 'cyan' },
    { icon: <Cpu size={40} />, title: 'IoT & Embedded', desc: 'Arduino, Raspberry Pi, Sensor Networks', color: 'purple' },
  ];

  const stats = [
    { number: '50+', label: 'Materi Pembelajaran' },
    { number: '1000+', label: 'Siswa Aktif' },
    { number: '20+', label: 'Instruktur' },
    { number: '98%', label: 'Tingkat Kepuasan' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge"
          >
            <span className="pulse-dot"></span>
            Platform Edukasi TKJ #1
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pelajari <span className="highlight">Teknik Komputer</span> & Jaringan
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Platform pembelajaran lengkap untuk siswa SMK TKJ. Mulai dari Cisco, Mikrotik, 
            Linux Server, hingga Fiber Optic. Siapkan dirimu untuk sertifikasi internasional!
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/materials" className="btn btn-primary">
              <BookOpen size={20} />
              Mulai Belajar
              <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-outline">
              <Users size={20} />
              Gabung Sekarang
            </Link>
          </motion.div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-card card-1">
            <Network size={32} />
            <span>CCNA Ready</span>
          </div>
          <div className="floating-card card-2">
            <Shield size={32} />
            <span>Security+</span>
          </div>
          <div className="hero-graphic">
            <div className="network-grid"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Mengapa Memilih Kami?</h2>
            <p>
              TKJ Education adalah platform pembelajaran yang dirancang khusus untuk siswa 
              SMK jurusan Teknik Komputer dan Jaringan. Kami menyediakan materi yang 
              terstruktur, praktik langsung, dan simulasi real-world scenarios.
            </p>
            <p>
              Dengan instruktur berpengalaman dan kurikulum yang selalu diupdate, 
              kamu akan siap menghadapi dunia kerja di bidang networking dan IT infrastructure.
            </p>
            
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-box-number">24/7</span>
                <span className="stat-box-label">Akses Materi</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">100%</span>
                <span className="stat-box-label">Praktik Online</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">Free</span>
                <span className="stat-box-label">Sertifikat</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image">
              <div className="code-overlay">
                <pre>{`interface Gig0/0/0
ip address 192.168.1.1 255.255.255.0
no shutdown
!
router ospf 1
network 192.168.1.0 0.0.0.255 area 0`}</pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="section-title">
          <h2>Kategori Pembelajaran</h2>
          <p>Pilih bidang yang ingin kamu kuasai. Dari dasar hingga advanced level.</p>
        </div>
        
        <div className="cards">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="card category-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`card-icon bg-${cat.color}`}>
                {cat.icon}
              </div>
              <div className="card-content">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <Link to={`/materials?category=${cat.title}`} className="card-btn">
                  Lihat Materi →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <Award size={64} className="cta-icon" />
          <h2>Siap Untuk Menjadi Network Engineer?</h2>
          <p>
            Bergabunglah dengan ribuan siswa TKJ lainnya. Mulai perjalananmu 
            menuju sertifikasi Cisco CCNA, Mikrotik MTCNA, dan kompetensi IT lainnya.
          </p>
          <Link to="/register" className="btn btn-primary btn-large">
            Daftar Gratis Sekarang
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
