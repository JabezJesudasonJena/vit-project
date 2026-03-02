'use client';

import React from 'react';

type PatientAppointment = {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

const patientAppointments: PatientAppointment[] = [
  {
    id: 1,
    doctorName: 'Dr. Emily Carter',
    specialty: 'Cardiologist',
    date: '2026-03-02',
    time: '10:00 AM',
    location: 'Surakshadwaar Main Clinic',
    status: 'Confirmed'
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Brown',
    specialty: 'General Physician',
    date: '2026-03-05',
    time: '04:30 PM',
    location: 'Surakshadwaar Downtown Center',
    status: 'Pending'
  },
  {
    id: 3,
    doctorName: 'Dr. Sophia Nguyen',
    specialty: 'Pulmonologist',
    date: '2026-03-08',
    time: '09:15 AM',
    location: 'Teleconsultation',
    status: 'Cancelled'
  }
];

const statusClassMap: Record<PatientAppointment['status'], string> = {
  Confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
};

export default function PatientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto w-full max-w-6xl animate-fadeInUp">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            My Appointments
          </h1>
          <p className="text-slate-400 text-lg">
            Your booked appointments are listed below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientAppointments.map((appointment) => (
            <article
              key={appointment.id}
              className="card-glass p-6 hover:border-violet-500/50 group"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold group-hover:text-violet-300 transition-colors">{appointment.doctorName}</h2>
                <span className={`badge-${appointment.status === 'Confirmed' ? 'success' : appointment.status === 'Pending' ? 'warning' : 'error'} text-xs`}>
                  {appointment.status}
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">🏥</span>
                  <span className="font-medium text-violet-300">{appointment.specialty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📅</span>
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">⏰</span>
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📍</span>
                  <span>{appointment.location}</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4 py-2 text-sm">
                Reschedule
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
