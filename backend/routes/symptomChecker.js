const express = require('express');

const router = express.Router();

// Symptom-condition mapping database (simplified for demo)
const symptomDatabase = {
  // Respiratory symptoms
  'cough': ['Common Cold', 'Flu', 'Bronchitis', 'COVID-19', 'Allergies'],
  'fever': ['Flu', 'COVID-19', 'Infection', 'Common Cold'],
  'shortness of breath': ['Asthma', 'COVID-19', 'Anxiety', 'Heart Condition', 'Bronchitis'],
  'sore throat': ['Common Cold', 'Strep Throat', 'Tonsillitis', 'Flu'],
  'runny nose': ['Common Cold', 'Allergies', 'Sinusitis', 'Flu'],
  
  // Pain-related
  'headache': ['Tension Headache', 'Migraine', 'Dehydration', 'Sinusitis', 'Stress'],
  'chest pain': ['Heartburn', 'Muscle Strain', 'Anxiety', 'Heart Condition'],
  'back pain': ['Muscle Strain', 'Poor Posture', 'Herniated Disc', 'Kidney Issues'],
  'stomach pain': ['Gastritis', 'Food Poisoning', 'Indigestion', 'Appendicitis'],
  'joint pain': ['Arthritis', 'Injury', 'Gout', 'Lupus'],
  
  // Digestive
  'nausea': ['Food Poisoning', 'Gastritis', 'Migraine', 'Pregnancy', 'Motion Sickness'],
  'vomiting': ['Food Poisoning', 'Gastroenteritis', 'Migraine', 'Pregnancy'],
  'diarrhea': ['Food Poisoning', 'Gastroenteritis', 'IBS', 'Food Intolerance'],
  
  // General
  'fatigue': ['Anemia', 'Thyroid Issues', 'Depression', 'Sleep Disorder', 'Diabetes'],
  'dizziness': ['Low Blood Pressure', 'Dehydration', 'Anemia', 'Inner Ear Issue', 'Anxiety'],
  'weight loss': ['Thyroid Issues', 'Diabetes', 'Depression', 'Cancer'],
  'rash': ['Allergic Reaction', 'Eczema', 'Contact Dermatitis', 'Psoriasis'],
  'swelling': ['Injury', 'Allergic Reaction', 'Infection', 'Heart Condition']
};

// Severity recommendations
const severityAdvice = {
  mild: {
    urgency: 'low',
    recommendation: 'Monitor symptoms at home. If symptoms persist beyond 3-5 days, consider scheduling a routine appointment.',
    emoji: '🟢'
  },
  moderate: {
    urgency: 'medium',
    recommendation: 'Schedule an appointment within the next 1-2 days. Rest and stay hydrated.',
    emoji: '🟡'
  },
  severe: {
    urgency: 'high',
    recommendation: 'Seek medical attention today. If symptoms worsen rapidly, visit the emergency room.',
    emoji: '🔴'
  }
};

// Specialist recommendations
const specialistMapping = {
  'Common Cold': 'General Practitioner',
  'Flu': 'General Practitioner',
  'COVID-19': 'General Practitioner',
  'Bronchitis': 'Pulmonologist',
  'Asthma': 'Pulmonologist',
  'Heart Condition': 'Cardiologist',
  'Migraine': 'Neurologist',
  'Arthritis': 'Rheumatologist',
  'Diabetes': 'Endocrinologist',
  'Depression': 'Psychiatrist',
  'Anxiety': 'Psychiatrist',
  'Gastritis': 'Gastroenterologist',
  'Thyroid Issues': 'Endocrinologist',
  'Allergies': 'Allergist',
  'Eczema': 'Dermatologist',
  'Psoriasis': 'Dermatologist'
};

// POST /api/symptom-checker - AI Symptom Analysis
router.post('/', (req, res) => {
  const { symptoms, severity, durationDays, age, additionalInfo } = req.body;

  console.log('=== AI SYMPTOM CHECKER ===');
  console.log('Symptoms:', symptoms);
  console.log('Severity:', severity);
  console.log('Duration:', durationDays, 'days');
  console.log('==========================');

  // Parse symptoms (comma-separated or space-separated)
  const symptomList = symptoms.toLowerCase()
    .split(/[,\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Find matching conditions
  const conditionScores = {};
  const matchedSymptoms = [];

  symptomList.forEach(symptom => {
    // Check for partial matches
    Object.keys(symptomDatabase).forEach(knownSymptom => {
      if (symptom.includes(knownSymptom) || knownSymptom.includes(symptom)) {
        matchedSymptoms.push(knownSymptom);
        symptomDatabase[knownSymptom].forEach(condition => {
          conditionScores[condition] = (conditionScores[condition] || 0) + 1;
        });
      }
    });
  });

  // Sort conditions by score
  const possibleConditions = Object.entries(conditionScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([condition, score]) => ({
      condition,
      likelihood: score >= 3 ? 'High' : score >= 2 ? 'Medium' : 'Low',
      specialist: specialistMapping[condition] || 'General Practitioner'
    }));

  // Get severity advice
  const advice = severityAdvice[severity] || severityAdvice.moderate;

  // Build response
  const analysis = {
    success: true,
    analysis: {
      inputSymptoms: symptomList,
      matchedSymptoms: [...new Set(matchedSymptoms)],
      possibleConditions: possibleConditions.length > 0 ? possibleConditions : [
        { condition: 'Unable to determine', likelihood: 'N/A', specialist: 'General Practitioner' }
      ],
      severityAssessment: {
        level: severity,
        ...advice
      },
      recommendations: [
        advice.recommendation,
        durationDays > 7 ? 'Symptoms lasting more than a week should be evaluated by a healthcare professional.' : null,
        possibleConditions.length > 0 ? `Consider consulting a ${possibleConditions[0].specialist}.` : null
      ].filter(Boolean),
      disclaimer: 'This is an AI-powered preliminary assessment and should not replace professional medical advice. Always consult a healthcare provider for accurate diagnosis and treatment.'
    },
    timestamp: new Date().toISOString()
  };

  console.log('Analysis result:', JSON.stringify(analysis.analysis.possibleConditions, null, 2));
  
  res.status(200).json(analysis);
});

module.exports = router;
