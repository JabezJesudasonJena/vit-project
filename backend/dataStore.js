// In-memory data store for demo purposes
// In production, this would be replaced with SQL database

const dataStore = {
  // Demo users for login
  users: [
    {
      id: 1,
      email: 'patient@demo.com',
      password: 'demo123',
      userRole: 'patient',
      fullName: 'John Patient',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      email: 'doctor@demo.com',
      password: 'demo123',
      userRole: 'doctor',
      fullName: 'Dr. Emily Carter',
      specialty: 'Cardiologist',
      createdAt: new Date().toISOString()
    }
  ],

  // Patient queries
  queries: [
    {
      id: 1,
      patientId: 1,
      patientName: 'John Patient',
      email: 'patient@demo.com',
      queryType: 'symptom_report',
      symptoms: 'Persistent cough and mild fever',
      severity: 'moderate',
      durationDays: 3,
      preferredSpecialty: 'general',
      preferredDate: '2026-03-02',
      preferredTime: '10:00',
      status: 'pending',
      submittedDate: '2026-02-28',
      doctorNotes: null,
      assignedDoctor: null
    }
  ],

  // Appointments
  appointments: [
    {
      id: 1,
      patientId: 1,
      patientName: 'John Patient',
      doctorId: 2,
      doctorName: 'Dr. Emily Carter',
      specialty: 'Cardiologist',
      date: '2026-03-05',
      time: '10:00 AM',
      location: 'HealthSync Main Clinic',
      status: 'Confirmed',
      reason: 'Follow-up checkup'
    }
  ],

  // Doctor availability slots
  doctorSlots: [
    { doctorId: 2, doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2026-03-02', time: '09:00 AM', available: true },
    { doctorId: 2, doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2026-03-02', time: '10:00 AM', available: true },
    { doctorId: 2, doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2026-03-02', time: '11:00 AM', available: false },
    { doctorId: 2, doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2026-03-02', time: '02:00 PM', available: true },
    { doctorId: 2, doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2026-03-03', time: '09:00 AM', available: true },
    { doctorId: 2, doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2026-03-03', time: '10:00 AM', available: true },
  ],

  // Emergency contacts
  emergencyContacts: [
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'HealthSync Helpline', number: '1-800-HEALTH', type: 'helpline' },
    { name: 'Mental Health Crisis', number: '988', type: 'mental_health' },
    { name: 'Poison Control', number: '1-800-222-1222', type: 'poison' }
  ],

  // Health tips
  healthTips: [
    { id: 1, title: 'Stay Hydrated', tip: 'Drink at least 8 glasses of water daily to maintain optimal health.', category: 'wellness' },
    { id: 2, title: 'Regular Exercise', tip: '30 minutes of moderate exercise daily can reduce heart disease risk by 30%.', category: 'fitness' },
    { id: 3, title: 'Sleep Well', tip: 'Adults need 7-9 hours of sleep for optimal cognitive function.', category: 'sleep' },
    { id: 4, title: 'Mental Health', tip: 'Take breaks and practice mindfulness to reduce stress and anxiety.', category: 'mental' },
    { id: 5, title: 'Healthy Diet', tip: 'Include fruits and vegetables in every meal for essential nutrients.', category: 'nutrition' }
  ],

  // Doctor reviews/ratings
  reviews: [
    {
      id: 1,
      doctorId: 2,
      doctorName: 'Dr. Emily Carter',
      patientName: 'John D.',
      rating: 5,
      comment: 'Excellent doctor! Very thorough and caring. Explained everything clearly.',
      date: '2026-02-25',
      appointmentType: 'consultation'
    },
    {
      id: 2,
      doctorId: 2,
      doctorName: 'Dr. Emily Carter',
      patientName: 'Sarah M.',
      rating: 4,
      comment: 'Great experience. Wait time was a bit long but worth it.',
      date: '2026-02-20',
      appointmentType: 'follow-up'
    }
  ]
};

// Helper functions
const generateId = (collection) => {
  return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
};

module.exports = { dataStore, generateId };
