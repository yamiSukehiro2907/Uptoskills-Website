// ========================================
// auth.js - Authentication Routes
// ========================================
const express = require('express');
const pool = require('../config/database'); // PostgreSQL connection pool
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@uptoskills.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);

// ---------------- CREATE TABLES IF NOT EXIST ----------------
async function createTables() {
  try {
    // Students Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL CHECK (LENGTH(TRIM(full_name)) > 0),
        email VARCHAR(255) UNIQUE NOT NULL CHECK (
          email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
        ),
        phone VARCHAR(15) NOT NULL CHECK (phone ~ '^[0-9]{10,15}$'),
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Companies Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL CHECK (LENGTH(TRIM(company_name)) > 0),
        email VARCHAR(255) UNIQUE NOT NULL CHECK (
          email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
        ),
        phone VARCHAR(15) NOT NULL CHECK (phone ~ '^[0-9]{10,15}$'),
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    
    console.log("✅ Tables checked/created successfully");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
}

// Run table creation at startup
createTables();

// ---------------- HELPERS ----------------

// Validate email format
function validateEmail(email) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
}

// Validate allowed roles
function validateRole(role) {
  const roles = ['admin', 'student', 'company'];
  return roles.includes(role.toLowerCase());
}

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!validateRole(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    if (role.toLowerCase() === 'admin') {
      return res.status(400).json({ success: false, message: 'Admin registration is not allowed' });
    }

    // Select table based on role
    let tableName;
    if (role.toLowerCase() === 'company') {
      tableName = 'companies';
    } else {
      tableName = 'students';
    }

    // Check if user already exists
    const userCheck = await pool.query(
      `SELECT * FROM ${tableName} WHERE email = $1`,
      [email]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    let insertQuery, values;
    if (role.toLowerCase() === 'company') {
      insertQuery = `
        INSERT INTO companies (company_name, email, phone, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, company_name AS name, email
      `;
      values = [name, email, phone, hashedPassword];
    } else {
      insertQuery = `
        INSERT INTO ${tableName} (full_name, email, phone, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, full_name AS name, email
      `;
      values = [name, email, phone, hashedPassword];
    }

    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { ...result.rows[0], role: role.toLowerCase() }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Email, password and role are required' });
    }

    if (!validateRole(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    if (role.toLowerCase() === 'admin') {
      // Check hardcoded admin credentials
      if (email !== ADMIN_EMAIL || !(await bcrypt.compare(password, ADMIN_PASSWORD_HASH))) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // Build JWT payload for admin
      const payload = {
        user: {
          id: 1, // Hardcoded ID for admin
          role: 'admin',
          email: ADMIN_EMAIL,
          name: 'Admin'
        }
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      return res.json({
        success: true,
        token,
        user: {
          id: 1,
          name: 'Admin',
          email: ADMIN_EMAIL,
          role: 'admin'
        }
      });
    }

    // Choose table for student or company
    let tableName;
    if (role.toLowerCase() === 'student') {
      tableName = 'students';
    } else {
      tableName = 'companies';
    }

    // Find user
    const userResult = await pool.query(
      `SELECT * FROM ${tableName} WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Build JWT payload
    const payload = {
      user: {
        id: user.id,
        role: role.toLowerCase(),
        email: user.email,
        name: user.full_name || user.company_name
      }
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.full_name || user.company_name,
        email: user.email,
        role: role.toLowerCase()
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

module.exports = router;
