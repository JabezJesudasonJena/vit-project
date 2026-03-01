'use client';

import React, { useState } from 'react';
import { MessageSquare, AlertCircle, Clock, Stethoscope } from 'lucide-react';

type QuerySubmission = {
  patientName: string;
  email: string;
  phone: string;
  queryType: 'symptom_report' | 'appointment_request' | 'general_inquiry';
  symptoms: string;
  durationDays: string;
  severity: 'mild' | 'moderate' | 'severe';
  preferredSpecialty: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
};

export default function QueryPage() {
  const [formData, setFormData] = useState<QuerySubmission>({
    patientName: '',
    email: '',
    phone: '',
    queryType: 'symptom_report',
    symptoms: '',
    durationDays: '',
    severity: 'moderate',
    preferredSpecialty: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Query Submission:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Query submitted successfully:', result);
        alert('Query submitted successfully! Check backend console for logged data.');
      } else {
        console.error('Submission failed:', result);
        alert('Submission failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to connect to backend:', error);
      alert('Failed to connect to server. Make sure backend is running on port 5000.');
    }
  };

  const severityColors = {
    mild: 'from-blue-600 to-cyan-600',
    moderate: 'from-amber-600 to-orange-600',
    severe: 'from-red-600 to-pink-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      {/* Background animation */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-blue-600/5" />
      </div>

      <div className="relative py-12 px-4">
        <div className="mx-auto max-w-4xl space-y-10 animate-fadeInUp">
          {/* Header */}
          <div className="text-center">
            <div className="inline-block mb-4 p-3 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-full border border-violet-500/30">
              <MessageSquare size={24} className="text-violet-300" />
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Healthcare Query & Appointment
            </h1>
            <p className="text-slate-400 text-lg">Submit your health concerns and request an appointment with our specialists.</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Patient Information Section */}
            <div className="card-glass p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg">
                  <Stethoscope size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Your Information</h2>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="input-focus"
                  placeholder="Full Name *"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-focus"
                  placeholder="Email Address *"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-focus"
                  placeholder="Phone Number *"
                  required
                />
                <select
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  className="input-focus"
                  required
                >
                  <option value="symptom_report">Symptom Report</option>
                  <option value="appointment_request">Appointment Request</option>
                  <option value="general_inquiry">General Inquiry</option>
                </select>
              </div>
            </div>

            {/* Health Details Section */}
            <div className="card-glass p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-amber-600 to-red-600 rounded-lg">
                  <AlertCircle size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Health Details</h2>
              </div>

              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows={4}
                className="input-focus w-full"
                placeholder="Describe your symptoms (e.g., persistent cough, fever, body aches...)"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="number"
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleChange}
                  className="input-focus"
                  placeholder="Duration (Days) *"
                  min="1"
                  required
                />
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="input-focus"
                  required
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
                <select
                  name="preferredSpecialty"
                  value={formData.preferredSpecialty}
                  onChange={handleChange}
                  className="input-focus"
                  required
                >
                  <option value="">Select Specialty</option>
                  <option value="general">General Practitioner</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="pulmonology">Pulmonology</option>
                  <option value="dermatology">Dermatology</option>
                </select>
              </div>
            </div>

            {/* Appointment Preferences Section */}
            <div className="card-glass p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-lg">
                  <Clock size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Appointment Preference</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="input-focus"
                  required
                />
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="input-focus"
                  required
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="card-glass p-8 space-y-6">
              <h2 className="text-xl font-bold">Additional Information</h2>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={3}
                className="input-focus w-full"
                placeholder="Any additional information..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full py-4 text-lg font-semibold"
            >
              Submit Query & Request Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
