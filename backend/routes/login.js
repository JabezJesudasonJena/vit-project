const express = require('express');
const { dataStore } = require('../dataStore');

const router = express.Router();

// POST /api/login - User login
router.post('/', (req, res) => {
  const { email, password, userRole } = req.body;
  
  console.log('=== LOGIN ATTEMPT ===');
  console.log('Email:', email);
  console.log('Role:', userRole);

  // Find user by email and role
  const user = dataStore.users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && 
         u.userRole === userRole &&
         u.password === password
  );

  if (user) {
    console.log('Login successful for:', user.fullName);
    console.log('=====================');
    
    // Don't send password back
    const { password: _, ...safeUser } = user;
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: safeUser
    });
  } else {
    console.log('Login failed - invalid credentials');
    console.log('=====================');
    
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

module.exports = router;
