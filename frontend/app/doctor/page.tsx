'use client';

import React from 'react';

type DoctorBooking = {
  id: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  contact: string;
  status: 'Confirmed' | 'Pending' | 'Rescheduled';
};

const doctorBookings: DoctorBooking[] = [
  {
    id: 1,
    patientName: 'Aarav Sharma',
    date: '2026-03-02',
    time: '10:00 AM',
    reason: 'Persistent cough',
    contact: '+1 (555) 101-2098',
    status: 'Confirmed'
  },
  {
    id: 2,
    patientName: 'Maya Johnson',
    date: '2026-03-02',
    time: '11:30 AM',
    reason: 'Routine blood pressure check',
    contact: '+1 (555) 883-1188',
    status: 'Pending'
  },
  {
    id: 3,
    patientName: 'Noah Wilson',
    date: '2026-03-03',
    time: '02:15 PM',
    reason: 'Follow-up for chest pain',
    contact: '+1 (555) 994-2245',
    status: 'Rescheduled'
  }
];

const statusClassMap: Record<DoctorBooking['status'], string> = {
  Confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  Rescheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
};

export default function DoctorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto w-full max-w-6xl animate-fadeInUp">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            Doctor Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Patients who have booked your appointments are shown below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorBookings.map((booking) => (
            <article
              key={booking.id}
              className="card-glass p-6 hover:border-violet-500/50 group"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold group-hover:text-violet-300 transition-colors">{booking.patientName}</h2>
                <span className={`badge-${booking.status === 'Confirmed' ? 'success' : booking.status === 'Pending' ? 'warning' : 'info'} text-xs`}>
                  {booking.status}
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📅</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">⏰</span>
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">🏥</span>
                  <span>{booking.reason}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📞</span>
                  <span>{booking.contact}</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4 py-2 text-sm">
                View Details
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
