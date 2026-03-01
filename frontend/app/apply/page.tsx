'use client';

import React, { useState } from 'react';

type PatientFormData = {
  fullLegalName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  reasonForAppointment: string;
  preferredDateTime: string;
  preferredDoctorOrSpecialist: string;
  patientStatus: string;
  photoIdType: string;
  photoIdNumber: string;
  photoIdFile: File | null;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  insuranceCardFile: File | null;
  referralNeeded: string;
  referralFormFile: File | null;
  preferredPharmacyDetails: string;
  currentMedications: string;
  allergyInformation: string;
  previousMedicalRecordsNotes: string;
  previousMedicalRecordsFile: File | null;
};

export default function ApplyPage() {
  const [formData, setFormData] = useState<PatientFormData>({
    fullLegalName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    reasonForAppointment: '',
    preferredDateTime: '',
    preferredDoctorOrSpecialist: '',
    patientStatus: '',
    photoIdType: '',
    photoIdNumber: '',
    photoIdFile: null,
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    insuranceCardFile: null,
    referralNeeded: '',
    referralFormFile: null,
    preferredPharmacyDetails: '',
    currentMedications: '',
    allergyInformation: '',
    previousMedicalRecordsNotes: '',
    previousMedicalRecordsFile: null
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files && files.length > 0 ? files[0] : null;
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const createLogPayload = (data: PatientFormData) => ({
    ...data,
    photoIdFile: data.photoIdFile?.name ?? null,
    insuranceCardFile: data.insuranceCardFile?.name ?? null,
    referralFormFile: data.referralFormFile?.name ?? null,
    previousMedicalRecordsFile: data.previousMedicalRecordsFile?.name ?? null
  });

  const logFormResults = (data: PatientFormData) => {
    console.log('Patient form results:', createLogPayload(data));
  };

  const sendToBackend = async (data: PatientFormData) => {
    const payload = createLogPayload(data);
    console.log('Sending to backend:', payload);

    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Application submitted successfully:', result);
        alert('Application submitted successfully! Check backend console for logged data.');
      } else {
        console.error('Submission failed:', result);
        alert('Submission failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to connect to backend:', error);
      alert('Failed to connect to server. Make sure backend is running on port 5000.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logFormResults(formData);
    await sendToBackend(formData);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] px-4 py-10 text-slate-900 dark:text-slate-100">
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl shadow-[#137fec]/5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Patient Application Form</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Fill all required details for registration, appointment scheduling, and verification.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold">1. Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Full Legal Name</label>
              <input
                type="text"
                name="fullLegalName"
                value={formData.fullLegalName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
              placeholder="patient@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Residential Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] resize-none"
              placeholder="Street, city, state, zip code"
              required
            />
          </div>

          <h2 className="text-lg font-bold pt-2">2. Appointment Details</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Reason for Appointment</label>
            <textarea
              name="reasonForAppointment"
              value={formData.reasonForAppointment}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] resize-none"
              placeholder="Example: fever, persistent cough"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Preferred Time / Date</label>
              <input
                type="datetime-local"
                name="preferredDateTime"
                value={formData.preferredDateTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Preferred Doctor / Specialist</label>
              <input
                type="text"
                name="preferredDoctorOrSpecialist"
                value={formData.preferredDoctorOrSpecialist}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                placeholder="Dr. Smith or Cardiologist"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">New / Existing Patient Status</label>
            <select
              name="patientStatus"
              value={formData.patientStatus}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="new">New Patient</option>
              <option value="existing">Existing Patient</option>
            </select>
          </div>

          <h2 className="text-lg font-bold pt-2">3. Documentation & Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Government ID Type</label>
              <select
                name="photoIdType"
                value={formData.photoIdType}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              >
                <option value="" disabled>
                  Select ID type
                </option>
                <option value="drivers-license">Driver's License</option>
                <option value="passport">Passport</option>
                <option value="national-id">National ID</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Government ID Number</label>
              <input
                type="text"
                name="photoIdNumber"
                value={formData.photoIdNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                placeholder="ID number"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Upload Government Photo ID</label>
            <input
              type="file"
              name="photoIdFile"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3"
              accept="image/*,.pdf"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Insurance Provider</label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Policy Number</label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Group Number</label>
              <input
                type="text"
                name="groupNumber"
                value={formData.groupNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Upload Insurance Card</label>
            <input
              type="file"
              name="insuranceCardFile"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3"
              accept="image/*,.pdf"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Is Referral Form Required?</label>
              <select
                name="referralNeeded"
                value={formData.referralNeeded}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
                required
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Upload Referral Form (If Required)</label>
              <input
                type="file"
                name="referralFormFile"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3"
                accept="image/*,.pdf"
                required={formData.referralNeeded === 'yes'}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Preferred Pharmacy Details</label>
            <textarea
              name="preferredPharmacyDetails"
              value={formData.preferredPharmacyDetails}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] resize-none"
              placeholder="Pharmacy name, address, and contact"
              required
            />
          </div>

          <h2 className="text-lg font-bold pt-2">4. Optional But Helpful Information</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Current Medications (Optional)</label>
            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] resize-none"
              placeholder="Medication names and dosages"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Allergy Information (Optional)</label>
            <textarea
              name="allergyInformation"
              value={formData.allergyInformation}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] resize-none"
              placeholder="Medication, food, or environmental allergies"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Previous Medical Records Notes (Optional)</label>
            <textarea
              name="previousMedicalRecordsNotes"
              value={formData.previousMedicalRecordsNotes}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] resize-none"
              placeholder="Mention relevant lab reports or scans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Upload Previous Medical Records (Optional)</label>
            <input
              type="file"
              name="previousMedicalRecordsFile"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3"
              accept="image/*,.pdf"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#137fec] text-white font-bold py-3 hover:bg-[#137fec]/90 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
