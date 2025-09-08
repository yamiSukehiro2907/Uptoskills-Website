const express = require('express');
const pool = require('../config/database');
const router = express.Router();
router.post("/projects", async (req, res) => {
  const { student_id, title, description, tech_stack, contributions, is_open_source, github_pr_link } = req.body;
    // Basic validation
     if (github_pr_link && github_pr_link.trim() && !/^https?:\/\/(www\.)?github\.com\/.*$/.test(github_pr_link)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid GitHub URL'
      });
    }
  try {
    const result = await pool.query(
      `INSERT INTO projects (student_id, title, description, tech_stack, contributions, is_open_source, github_pr_link)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [student_id, title, description, tech_stack, contributions, is_open_source, github_pr_link]
    );
    
    console.log('Form submitted successfully!',result.rows[0])
  

    res.status(201).json({ message: "Project submitted successfully!", project: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit project" });
  }
});
module.exports = router;
