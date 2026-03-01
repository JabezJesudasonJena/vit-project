// API configuration
// Uses environment variable if set, otherwise falls back to localhost for development
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  signup: `${API_BASE_URL}/api/signup`,
  login: `${API_BASE_URL}/api/login`,
  apply: `${API_BASE_URL}/api/apply`,
  query: `${API_BASE_URL}/api/query`,
  symptomChecker: `${API_BASE_URL}/api/symptom-checker`,
  doctors: `${API_BASE_URL}/api/doctors`,
  doctorSlots: `${API_BASE_URL}/api/doctors/slots`,
  bookSlot: `${API_BASE_URL}/api/doctors/slots/book`,
  emergency: `${API_BASE_URL}/api/emergency`,
  emergencySOS: `${API_BASE_URL}/api/emergency/sos`,
  ratings: `${API_BASE_URL}/api/ratings`,
  healthTips: `${API_BASE_URL}/api/health-tips`,
  health: `${API_BASE_URL}/api/health`,
};
