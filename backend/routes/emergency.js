const express = require('express');
const { dataStore } = require('../dataStore');

const router = express.Router();

// GET /api/emergency - Get emergency contacts
router.get('/', (req, res) => {
  console.log('=== EMERGENCY CONTACTS REQUESTED ===');
  res.json({
    success: true,
    contacts: dataStore.emergencyContacts,
    message: 'If this is a life-threatening emergency, call 911 immediately.'
  });
});

// POST /api/emergency/sos - Log SOS alert (for demo)
router.post('/sos', (req, res) => {
  const { patientName, location, emergencyType, contactNumber } = req.body;

  console.log('🚨 === EMERGENCY SOS ALERT === 🚨');
  console.log('Patient:', patientName);
  console.log('Location:', location);
  console.log('Emergency Type:', emergencyType);
  console.log('Contact:', contactNumber);
  console.log('Time:', new Date().toISOString());
  console.log('🚨 ========================== 🚨');

  // In production: Send SMS, notify emergency services, alert nearby hospitals
  
  res.status(200).json({
    success: true,
    message: 'Emergency alert sent. Help is on the way.',
    alertId: Date.now(),
    estimatedResponse: '5-10 minutes',
    instructions: [
      'Stay calm and remain in a safe location',
      'Keep your phone line open',
      'If possible, have someone meet the emergency responders',
      'Gather any medications you are currently taking'
    ]
  });
});

module.exports = router;
