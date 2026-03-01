-- Create database
CREATE DATABASE IF NOT EXISTS tkj_education CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tkj_education;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
) ENGINE=InnoDB;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(20) DEFAULT 'cyan',
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Materials table
CREATE TABLE IF NOT EXISTS materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  content LONGTEXT,
  category_id INT,
  duration VARCHAR(50),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  FULLTEXT INDEX idx_search (title, description, content)
) ENGINE=InnoDB;

-- Insert sample categories
INSERT INTO categories (name, description, color, icon) VALUES
('Cisco Networking', 'Routing, Switching, CCNA Preparation', 'cyan', 'network'),
('Mikrotik', 'RouterOS, Wireless, Hotspot', 'purple', 'wifi'),
('Linux Server', 'Ubuntu, CentOS, Server Admin', 'pink', 'server'),
('Fiber Optic', 'FO Cable, OTDR, Splicing', 'blue', 'cable'),
('Cyber Security', 'Firewall, VPN, Security Basics', 'cyan', 'shield'),
('IoT & Embedded', 'Arduino, Raspberry Pi', 'purple', 'cpu');

-- Insert sample materials (optional)
INSERT INTO materials (title, description, content, category_id, duration, created_by) VALUES
('Pengenalan Cisco IOS', 'Dasar-dasar command line interface Cisco', 'Konten lengkap tentang Cisco IOS...', 1, '45 menit', 1),
('Konfigurasi VLAN', 'Cara membuat dan mengelola VLAN', 'VLAN (Virtual LAN) adalah...', 1, '60 menit', 1),
('Mikrotik Basic Setup', 'Setting dasar router Mikrotik', 'Langkah-langkah setup...', 2, '30 menit', 1);

-- Create search procedure for extra security
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS SearchMaterials(IN search_query VARCHAR(255))
BEGIN
  SET @safe_query = CONCAT('%', search_query, '%');
  
  PREPARE stmt FROM '
    SELECT m.*, c.name as category_name, c.color as category_color 
    FROM materials m
    LEFT JOIN categories c ON m.category_id = c.id
    WHERE m.title LIKE ? OR m.description LIKE ?
    ORDER BY m.created_at DESC
  ';
  
  EXECUTE stmt USING @safe_query, @safe_query;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;
