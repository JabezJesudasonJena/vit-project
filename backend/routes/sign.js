const express = require('express');

const router = express.Router();

// POST /api/signup - User registration (patient or doctor)
router.post('/', (req, res) => {
  const { userRole, fullName, email, password } = req.body;
  
  console.log('=== SIGNUP REQUEST ===');
  console.log('User Role:', userRole);
  console.log('Full Name:', fullName);
  console.log('Email:', email);
  console.log('Full Data:', req.body);
  console.log('======================');

  // TODO: Save to SQL database
  // For now, just log and return success

  res.status(201).json({
    success: true,
    message: `${userRole === 'doctor' ? 'Doctor' : 'Patient'} registered successfully`,
    data: {
      userRole,
      fullName,
      email
    }
  });
});

module.exports = router;
