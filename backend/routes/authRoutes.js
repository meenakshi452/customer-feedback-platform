// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const { logoutUser } = require('../controllers/authController');

const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: '/auth/fail'
}));

// Auth failure route
router.get('/fail', (req, res) => res.send("Login failed"));

// Logout route
router.get('/logout', logoutUser);

module.exports = router;
