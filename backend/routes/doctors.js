const express = require('express');
const { dataStore } = require('../dataStore');

const router = express.Router();

// GET /api/doctors - Get all doctors
router.get('/', (req, res) => {
  const doctors = dataStore.users
    .filter(u => u.userRole === 'doctor')
    .map(({ password, ...doc }) => doc);
  
  res.json({ success: true, doctors });
});

// GET /api/doctors/slots - Get available appointment slots
router.get('/slots', (req, res) => {
  const { doctorId, date, specialty } = req.query;
  
  let slots = dataStore.doctorSlots;
  
  if (doctorId) {
    slots = slots.filter(s => s.doctorId === parseInt(doctorId));
  }
  if (date) {
    slots = slots.filter(s => s.date === date);
  }
  if (specialty) {
    slots = slots.filter(s => s.specialty.toLowerCase() === specialty.toLowerCase());
  }

  console.log('=== SLOT QUERY ===');
  console.log('Filters:', { doctorId, date, specialty });
  console.log('Available slots:', slots.filter(s => s.available).length);
  console.log('==================');

  res.json({ 
    success: true, 
    slots: slots.filter(s => s.available),
    allSlots: slots
  });
});

// POST /api/doctors/slots/book - Book an appointment slot
router.post('/slots/book', (req, res) => {
  const { doctorId, date, time, patientName, patientEmail, reason } = req.body;

  console.log('=== BOOKING SLOT ===');
  console.log('Doctor:', doctorId);
  console.log('Date:', date, 'Time:', time);
  console.log('Patient:', patientName);
  console.log('====================');

  // Find and mark slot as unavailable
  const slotIndex = dataStore.doctorSlots.findIndex(
    s => s.doctorId === doctorId && s.date === date && s.time === time && s.available
  );

  if (slotIndex === -1) {
    return res.status(400).json({
      success: false,
      message: 'Slot not available or already booked'
    });
  }

  // Mark slot as booked
  dataStore.doctorSlots[slotIndex].available = false;

  // Create appointment
  const slot = dataStore.doctorSlots[slotIndex];
  const appointment = {
    id: dataStore.appointments.length + 1,
    patientName,
    patientEmail,
    doctorId: slot.doctorId,
    doctorName: slot.doctorName,
    specialty: slot.specialty,
    date: slot.date,
    time: slot.time,
    location: 'Surakshadwaar Main Clinic',
    status: 'Confirmed',
    reason,
    createdAt: new Date().toISOString()
  };

  dataStore.appointments.push(appointment);

  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully',
    appointment
  });
});

module.exports = router;
