'use client';

import React, { useState } from 'react';

type PatientQueryTrack = {
  id: number;
  queryType: 'symptom_report' | 'appointment_request' | 'general_inquiry';
  symptoms: string;
  submittedDate: string;
  status: 'pending' | 'reviewed' | 'scheduled' | 'completed';
  doctorAssigned?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  doctorNotes?: string;
};

const myQueries: PatientQueryTrack[] = [
  {
    id: 1,
    queryType: 'symptom_report',
    symptoms: 'Persistent cough and fever',
    submittedDate: '2026-02-28',
    status: 'pending',
    doctorNotes: 'Waiting for doctor review'
  },
  {
    id: 2,
    queryType: 'appointment_request',
    symptoms: 'Annual health checkup',
    submittedDate: '2026-02-27',
    status: 'scheduled',
    doctorAssigned: 'Dr. Emily Carter (Cardiologist)',
    appointmentDate: '2026-03-05',
    appointmentTime: '10:00 AM',
    doctorNotes:
      'Your appointment has been confirmed. Please arrive 10 minutes early with your ID.'
  },
  {
    id: 3,
    queryType: 'general_inquiry',
    symptoms: 'Questions about blood pressure management',
    submittedDate: '2026-02-26',
    status: 'reviewed',
    doctorAssigned: 'Dr. Michael Brown',
    doctorNotes:
      'Dr. Brown has reviewed your inquiry. You will receive a detailed response via email.'
  },
  {
    id: 4,
    queryType: 'symptom_report',
    symptoms: 'Follow-up on previous treatment',
    submittedDate: '2026-02-20',
    status: 'completed',
    doctorAssigned: 'Dr. Sophia Nguyen',
    appointmentDate: '2026-02-25',
    appointmentTime: '02:00 PM',
    doctorNotes: 'Appointment completed. Prescription has been sent to your pharmacy.'
  }
];

const statusColors: Record<string, string> = {
  pending: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  reviewed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  scheduled: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  completed: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300'
};

const queryTypeLabel: Record<string, string> = {
  symptom_report: 'Symptom Report',
  appointment_request: 'Appointment Request',
  general_inquiry: 'General Inquiry'
};

const statusSteps = ['pending', 'reviewed', 'scheduled', 'completed'];

export default function PatientQueryTrackingPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl animate-fadeInUp">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            My Queries & Appointments
          </h1>
          <p className="text-slate-400 text-lg">
            Track the status of your submitted healthcare queries and appointment requests.
          </p>
        </div>

        <div className="space-y-5">
          {myQueries.map((query) => {
            const currentStatusIndex = statusSteps.indexOf(query.status);

            return (
              <div
                key={query.id}
                className="card-glass rounded-xl overflow-hidden"
              >
                {/* Query Header */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === query.id ? null : query.id)
                  }
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">
                        {queryTypeLabel[query.queryType]}
                      </h3>
                      <span className={`badge-${query.status === 'pending' ? 'warning' : query.status === 'reviewed' ? 'info' : query.status === 'scheduled' ? 'success' : 'info'} text-xs`}>
                        {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">
                      {query.symptoms}
                    </p>
                    <p className="text-xs text-slate-500">Submitted: {query.submittedDate}</p>
                  </div>

                  <div className="text-slate-400 flex-shrink-0">
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        expandedId === query.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedId === query.id && (
                  <div className="border-t border-slate-700/50 px-6 py-5 bg-slate-900/50 space-y-6">
                    {/* Status Timeline */}
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Status Timeline
                      </p>
                      <div className="flex items-center gap-2">
                        {statusSteps.map((step, index) => (
                          <React.Fragment key={step}>
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                                index <= currentStatusIndex
                                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                                  : 'bg-slate-700 text-slate-400'
                              }`}
                            >
                              {index + 1}
                            </div>
                            {index < statusSteps.length - 1 && (
                              <div
                                className={`flex-1 h-1 transition-colors ${
                                  index < currentStatusIndex
                                    ? 'bg-gradient-to-r from-violet-600 to-blue-600'
                                    : 'bg-slate-700'
                                }`}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Pending</span>
                        <span>Reviewed</span>
                        <span>Scheduled</span>
                        <span>Completed</span>
                      </div>
                    </div>

                    {/* Doctor Assignment */}
                    {query.doctorAssigned && (
                      <div className="p-4 rounded-lg bg-gradient-to-r from-violet-600/10 to-blue-600/10 border border-violet-500/30">
                        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Doctor Assigned
                        </p>
                        <p className="text-sm font-medium">{query.doctorAssigned}</p>
                      </div>
                    )}

                    {/* Appointment Details */}
                    {query.appointmentDate && (
                      <div className="p-4 rounded-lg bg-emerald-600/10 border border-emerald-500/30">
                        <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                          Appointment Scheduled
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">📅 {query.appointmentDate}</p>
                          <p className="text-sm font-medium">⏰ {query.appointmentTime}</p>
                        </div>
                      </div>
                    )}

                    {/* Doctor Notes */}
                    {query.doctorNotes && (
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Doctor's Notes
                        </p>
                        <p className="text-sm text-slate-300">
                          {query.doctorNotes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit New Query CTA */}
        <div className="mt-10 rounded-xl border-2 border-dashed border-violet-500/30 bg-gradient-to-r from-violet-600/5 to-blue-600/5 p-8 text-center">
          <p className="text-slate-400 mb-4">
            Don't see what you're looking for?
          </p>
          <a
            href="/query"
            className="btn-primary inline-block"
          >
            Submit New Query
          </a>
        </div>
      </div>
    </div>
  );
}
