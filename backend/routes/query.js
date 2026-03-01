const express = require('express');
const { dataStore, generateId } = require('../dataStore');

const router = express.Router();

// GET /api/query - Get all queries (for doctors) or patient's queries
router.get('/', (req, res) => {
  const { email, status } = req.query;
  
  let queries = dataStore.queries;
  
  if (email) {
    queries = queries.filter(q => q.email === email);
  }
  if (status) {
    queries = queries.filter(q => q.status === status);
  }

  res.json({
    success: true,
    queries
  });
});

// POST /api/query - Submit healthcare query/appointment request
router.post('/', (req, res) => {
  const { 
    patientName, 
    email, 
    phone,
    queryType,
    symptoms,
    durationDays,
    severity,
    preferredSpecialty,
    preferredDate,
    preferredTime,
    additionalNotes 
  } = req.body;
  
  console.log('=== HEALTHCARE QUERY ===');
  console.log('Patient Name:', patientName);
  console.log('Email:', email);
  console.log('Query Type:', queryType);
  console.log('Symptoms:', symptoms);
  console.log('Severity:', severity);
  console.log('========================');

  // Create new query
  const newQuery = {
    id: generateId(dataStore.queries),
    patientName,
    email,
    phone,
    queryType,
    symptoms,
    durationDays: parseInt(durationDays) || 0,
    severity,
    preferredSpecialty,
    preferredDate,
    preferredTime,
    additionalNotes,
    status: 'pending',
    submittedDate: new Date().toISOString().split('T')[0],
    doctorNotes: null,
    assignedDoctor: null
  };

  dataStore.queries.push(newQuery);

  res.status(201).json({
    success: true,
    message: 'Healthcare query submitted successfully',
    query: newQuery
  });
});

// PATCH /api/query/:id - Update query status (for doctors)
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status, doctorNotes, assignedDoctor, appointmentDate, appointmentTime } = req.body;

  const queryIndex = dataStore.queries.findIndex(q => q.id === parseInt(id));
  
  if (queryIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Query not found'
    });
  }

  // Update query
  if (status) dataStore.queries[queryIndex].status = status;
  if (doctorNotes) dataStore.queries[queryIndex].doctorNotes = doctorNotes;
  if (assignedDoctor) dataStore.queries[queryIndex].assignedDoctor = assignedDoctor;
  if (appointmentDate) dataStore.queries[queryIndex].appointmentDate = appointmentDate;
  if (appointmentTime) dataStore.queries[queryIndex].appointmentTime = appointmentTime;

  console.log('=== QUERY UPDATED ===');
  console.log('Query ID:', id);
  console.log('New Status:', status);
  console.log('=====================');

  res.json({
    success: true,
    message: 'Query updated successfully',
    query: dataStore.queries[queryIndex]
  });
});

module.exports = router;
