import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000,  // TiDB pakai port 4000
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true  // TiDB butuh SSL strict
  }
});

// Test connection
pool.getConnection()
  .then(conn => {
    console.log('✅ TiDB connected');
    conn.release();
  })
  .catch(err => {
    console.error('❌ TiDB error:', err.message);
  });

export default pool;
