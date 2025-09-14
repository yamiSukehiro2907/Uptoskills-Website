const express = require('express');
const router = express.Router();

router.get("/", require("../controllers/companies.controller.js"));

module.exports = router;