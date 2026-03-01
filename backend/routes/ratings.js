const express = require('express');
const { dataStore } = require('../dataStore');

const router = express.Router();

// GET /api/ratings - Get all reviews
router.get('/', (req, res) => {
  const { doctorId } = req.query;
  
  let reviews = dataStore.reviews || [];
  
  if (doctorId) {
    reviews = reviews.filter(r => r.doctorId === parseInt(doctorId));
  }

  console.log('=== FETCHING REVIEWS ===');
  console.log('Total reviews:', reviews.length);
  
  res.json({ success: true, reviews });
});

// POST /api/ratings - Submit a new review
router.post('/', (req, res) => {
  const { doctorId, doctorName, patientName, rating, comment, appointmentType } = req.body;

  console.log('=== NEW REVIEW SUBMITTED ===');
  console.log('Doctor:', doctorName);
  console.log('Patient:', patientName);
  console.log('Rating:', rating, 'stars');
  console.log('Comment:', comment);
  console.log('============================');

  const newReview = {
    id: Date.now(),
    doctorId,
    doctorName,
    patientName,
    rating,
    comment,
    date: new Date().toISOString().split('T')[0],
    appointmentType
  };

  // Add to data store
  if (!dataStore.reviews) {
    dataStore.reviews = [];
  }
  dataStore.reviews.unshift(newReview);

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    review: newReview
  });
});

// GET /api/ratings/doctor/:id - Get doctor's average rating
router.get('/doctor/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const reviews = (dataStore.reviews || []).filter(r => r.doctorId === doctorId);
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  res.json({
    success: true,
    doctorId,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length
  });
});

module.exports = router;
