import express from 'express';
import pool from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all materials with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT m.*, c.name as category_name, c.color as category_color, u.username as author 
      FROM materials m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN users u ON m.created_by = u.id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'all') {
      query += ' AND c.name = ?';
      params.push(category);
    }

    query += ' ORDER BY m.created_at DESC';

    // Use prepared statement
    const [materials] = await pool.execute(query, params);
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search materials with SQL Injection protection
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }

    // Sanitize input - remove special characters that could be used for injection
    const sanitizedQuery = q.trim().replace(/[%_\\]/g, '\\$&');
    
    // Use prepared statement with parameterized query
    // MySQL2 automatically escapes parameters
    const searchPattern = `%${sanitizedQuery}%`;
    
    const [results] = await pool.execute(`
      SELECT m.*, c.name as category_name, c.color as category_color, u.username as author 
      FROM materials m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN users u ON m.created_by = u.id
      WHERE m.title LIKE ? 
         OR m.description LIKE ? 
         OR m.content LIKE ?
         OR c.name LIKE ?
      ORDER BY 
        CASE 
          WHEN m.title LIKE ? THEN 1
          WHEN m.description LIKE ? THEN 2
          ELSE 3
        END,
        m.created_at DESC
    `, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern]);

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single material
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [materials] = await pool.execute(`
      SELECT m.*, c.name as category_name, c.color as category_color, u.username as author 
      FROM materials m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN users u ON m.created_by = u.id
      WHERE m.id = ?
    `, [id]);

    if (materials.length === 0) {
      return res.status(404).json({ message: 'Material not found' });
    }

    res.json(materials[0]);
  } catch (error) {
    console.error('Error fetching material:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create material (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, content, category_id, duration } = req.body;

    if (!title || !category_id) {
      return res.status(400).json({ message: 'Title and category are required' });
    }

    const [result] = await pool.execute(`
      INSERT INTO materials (title, description, content, category_id, duration, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [title, description, content, category_id, duration, req.userId]);

    res.status(201).json({
      message: 'Material created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating material:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update material (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category_id, duration } = req.body;

    // Check ownership
    const [existing] = await pool.execute(
      'SELECT created_by FROM materials WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Material not found' });
    }

    await pool.execute(`
      UPDATE materials 
      SET title = ?, description = ?, content = ?, category_id = ?, duration = ?, updated_at = NOW()
      WHERE id = ?
    `, [title, description, content, category_id, duration, id]);

    res.json({ message: 'Material updated successfully' });
  } catch (error) {
    console.error('Error updating material:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete material (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.execute('DELETE FROM materials WHERE id = ?', [id]);
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
