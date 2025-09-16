const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Create or update user profile
router.post('/profile', async (req, res) => {
  try {
    const {
      full_name,
      contact_number,
      linkedin_url,
      github_url,
      why_hire_me,
      ai_skill_summary,
      domainsOfInterest,
      othersDomain
    } = req.body;

    // Server-side validation
    if (!full_name || !full_name.trim() || !/^[A-Za-z ]+$/.test(full_name)) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required and should contain only alphabets'
      });
    }

    if (!contact_number || !/^[0-9]{10}$/.test(contact_number)) {
      return res.status(400).json({
        success: false,
        message: 'Contact number is required and should be exactly 10 digits'
      });
    }

    if (linkedin_url && linkedin_url.trim() && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedin_url)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid LinkedIn URL'
      });
    }

    if (github_url && github_url.trim() && !/^https?:\/\/(www\.)?github\.com\/.*$/.test(github_url)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid GitHub URL'
      });
    }

    if (!why_hire_me || !why_hire_me.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide why hire me information'
      });
    }

    if (!ai_skill_summary || !ai_skill_summary.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide AI skill summary'
      });
    }

    if (!domainsOfInterest || !Array.isArray(domainsOfInterest) || domainsOfInterest.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least two domains of interest'
      });
    }

    // Checking if profile already exists for this user
    const checkQuery = 'SELECT id FROM user_details WHERE full_name = $1';
    const checkResult = await pool.query(checkQuery, [full_name]);

    let result;

    if (checkResult.rows.length > 0) {
      // Update existing profile
      const updateQuery = `
        UPDATE user_details
        SET contact_number = $1,
            linkedin_url = $2,
            github_url = $3,
            why_hire_me = $4,
            profile_completed = TRUE,
            ai_skill_summary = $5,
            domains_of_interest = $6,
            others_domain = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE full_name = $8
        RETURNING *
      `;
      result = await pool.query(updateQuery, [
        contact_number,
        linkedin_url,
        github_url,
        why_hire_me,
        ai_skill_summary,
        domainsOfInterest,
        othersDomain,
        full_name
      ]);
    } else {
      // Insert new profile
      const insertQuery = `
        INSERT INTO user_details
        (full_name, contact_number, linkedin_url, github_url, why_hire_me,
         profile_completed, ai_skill_summary, domains_of_interest, others_domain)
        VALUES ($1, $2, $3, $4, $5, TRUE, $6, $7, $8)
        RETURNING *
      `;
      result = await pool.query(insertQuery, [
        full_name,
        contact_number,
        linkedin_url,
        github_url,
        why_hire_me,
        ai_skill_summary,
        domainsOfInterest,
        othersDomain
      ]);
    }

    res.status(200).json({
      success: true,
      message: 'Profile saved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving profile',
      error: error.message
    });
  }
});

  // Get all user profiles
  router.get('/profiles', async (req, res) => {
    try {
      const query = 'SELECT * FROM user_details ORDER BY created_at DESC';
      const result = await pool.query(query);

      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching profiles',
        error: error.message
      });
    }
  });

  // Get profile by name
  router.get('/profile/:name', async (req, res) => {
    try {
      const { name } = req.params;
      const query = 'SELECT * FROM user_details WHERE full_name = $1';
      const result = await pool.query(query, [name]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching profile',
        error: error.message
      });
    }
  });

// Delete student by ID
router.delete('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM user_details WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ success: false, message: 'Error deleting profile', error: error.message });
  }
});

module.exports = router;
