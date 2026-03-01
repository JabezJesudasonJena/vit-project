const express = require('express');

const router = express.Router();

// POST /api/apply - Patient application/appointment request
router.post('/', (req, res) => {
  const { 
    fullLegalName, 
    dateOfBirth, 
    email, 
    phone,
    reasonForAppointment,
    preferredDateTime,
    preferredDoctorOrSpecialist 
  } = req.body;
  
  console.log('=== PATIENT APPLICATION ===');
  console.log('Patient Name:', fullLegalName);
  console.log('DOB:', dateOfBirth);
  console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Reason:', reasonForAppointment);
  console.log('Preferred Date/Time:', preferredDateTime);
  console.log('Preferred Doctor:', preferredDoctorOrSpecialist);
  console.log('Full Data:', req.body);
  console.log('===========================');

  // TODO: Save to SQL database
  // For now, just log and return success

  res.status(201).json({
    success: true,
    message: 'Patient application submitted successfully',
    data: {
      fullLegalName,
      email,
      reasonForAppointment,
      applicationId: Date.now() // Temporary ID
    }
  });
});

module.exports = router;
