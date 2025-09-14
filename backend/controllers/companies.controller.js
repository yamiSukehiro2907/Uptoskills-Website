const express = require('express');
const pool = require('../config/database');

const getCompanies = async (req, res) => {
    const companies = await pool.query(
        `SELECT *
         FROM companies`
    );

    if (!companies) {
        return res.status(404).send('No companies found');
    }

    return res.status(200).json(companies.rows);
}

module.exports = getCompanies;