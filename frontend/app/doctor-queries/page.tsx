'use client';

import React, { useState } from 'react';

type PatientQuery = {
  id: number;
  patientName: string;
  queryType: 'symptom_report' | 'appointment_request' | 'general_inquiry';
  symptoms: string;
  severity: 'mild' | 'moderate' | 'severe';
  durationDays: number;
  preferredDate: string;
  preferredTime: string;
  submittedDate: string;
  status: 'pending' | 'reviewed' | 'scheduled';
  email: string;
  phone: string;
};

const incomingQueries: PatientQuery[] = [
  {
    id: 101,
    patientName: 'Aarav Sharma',
    queryType: 'symptom_report',
    symptoms: 'Persistent cough and fever for the last 5 days',
    severity: 'moderate',
    durationDays: 5,
    preferredDate: '2026-03-02',
    preferredTime: '10:00 AM',
    submittedDate: '2026-02-28',
    status: 'pending',
    email: 'aarav@email.com',
    phone: '+1 (555) 101-2098'
  },
  {
    id: 102,
    patientName: 'Maya Johnson',
    queryType: 'appointment_request',
    symptoms: 'Annual health checkup and blood pressure monitoring',
    severity: 'mild',
    durationDays: 0,
    preferredDate: '2026-03-03',
    preferredTime: '02:00 PM',
    submittedDate: '2026-02-28',
    status: 'reviewed',
    email: 'maya@email.com',
    phone: '+1 (555) 883-1188'
  },
  {
    id: 103,
    patientName: 'Noah Wilson',
    queryType: 'general_inquiry',
    symptoms: 'Questions about chest pain and when to seek emergency care',
    severity: 'severe',
    durationDays: 2,
    preferredDate: '2026-03-01',
    preferredTime: '09:00 AM',
    submittedDate: '2026-02-27',
    status: 'scheduled',
    email: 'noah@email.com',
    phone: '+1 (555) 994-2245'
  }
];

const severityColors: Record<string, string> = {
  mild: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  severe: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
};

const statusColors: Record<string, string> = {
  pending: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  reviewed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  scheduled: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
};

const queryTypeLabel: Record<string, string> = {
  symptom_report: 'Symptom Report',
  appointment_request: 'Appointment Request',
  general_inquiry: 'General Inquiry'
};

export default function DoctorQueryPage() {
  const [selectedQuery, setSelectedQuery] = useState<PatientQuery | null>(null);
  const [queryStatus, setQueryStatus] = useState<Record<number, PatientQuery['status']>>(
    Object.fromEntries(incomingQueries.map((q) => [q.id, q.status]))
  );

  const handleStatusChange = (queryId: number, newStatus: PatientQuery['status']) => {
    setQueryStatus((prev) => ({ ...prev, [queryId]: newStatus }));
    console.log(`Query ${queryId} status updated to:`, newStatus);
  };

  const handleContact = (query: PatientQuery) => {
    console.log(`Contacting patient: ${query.patientName}`, {
      email: query.email,
      phone: query.phone
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 animate-fadeInUp">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            Patient Queries Management
          </h1>
          <p className="text-slate-400 text-lg">
            Manage incoming patient queries and appointment requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queries List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {incomingQueries.map((query) => (
              <div
                key={query.id}
                onClick={() => setSelectedQuery(query)}
                className={`rounded-xl border-2 cursor-pointer p-5 transition-all ${
                  selectedQuery?.id === query.id
                    ? 'card-glass border-violet-500 bg-violet-500/10'
                    : 'card-glass border-slate-700/50 hover:border-violet-500/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{query.patientName}</h3>
                      <span className="badge-info text-xs">
                        {queryTypeLabel[query.queryType]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {query.symptoms}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>📅 {query.preferredDate}</span>
                      <span>⏰ {query.preferredTime}</span>
                      <span>📨 {query.submittedDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <span className={`badge-${query.severity === 'mild' ? 'info' : query.severity === 'moderate' ? 'warning' : 'error'} text-xs`}>
                      {query.severity.charAt(0).toUpperCase() + query.severity.slice(1)}
                    </span>
                    <span className={`badge-success text-xs`}>
                      {queryStatus[query.id].charAt(0).toUpperCase() + queryStatus[query.id].slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Query Details Panel */}
          <div className="lg:col-span-1">
            {selectedQuery ? (
              <div className="card-glass p-6 sticky top-4 space-y-4">
                <h2 className="text-xl font-bold">Query Details</h2>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Patient Name
                    </p>
                    <p className="text-sm font-medium">{selectedQuery.patientName}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Contact
                    </p>
                    <p className="text-sm font-medium break-all">{selectedQuery.email}</p>
                    <p className="text-sm font-medium">{selectedQuery.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Symptoms
                    </p>
                    <p className="text-sm text-slate-300">{selectedQuery.symptoms}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Severity
                      </p>
                      <p className="text-sm font-medium capitalize">{selectedQuery.severity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Duration
                      </p>
                      <p className="text-sm font-medium">{selectedQuery.durationDays} days</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Status
                    </p>
                    <select
                      value={queryStatus[selectedQuery.id]}
                      onChange={(e) =>
                        handleStatusChange(selectedQuery.id, e.target.value as PatientQuery['status'])
                      }
                      className="input-focus w-full text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleContact(selectedQuery)}
                    className="btn-primary w-full py-2 text-sm font-semibold"
                  >
                    Contact Patient
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-glass p-6 flex items-center justify-center h-64 sticky top-4">
                <p className="text-slate-400 text-center">
                  Select a query to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
