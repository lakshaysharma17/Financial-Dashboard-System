const express = require('express');
const indexRoutes = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const recordRoutes = require('./recordRoutes');
const dashboardRoutes = require('./dashboardRoutes');


indexRoutes.use('/auth', authRoutes);
indexRoutes.use('/users', userRoutes);
indexRoutes.use('/records', recordRoutes);
indexRoutes.use('/dashboard', dashboardRoutes);

module.exports = indexRoutes;