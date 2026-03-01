'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Download, 
  Eye, 
  ArrowLeft, 
  Calendar, 
  User, 
  Pill,
  Clock,
  AlertCircle,
  CheckCircle,
  Printer
} from 'lucide-react';

type Prescription = {
  id: number;
  date: string;
  doctorName: string;
  specialty: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  notes: string;
  status: 'active' | 'completed' | 'expired';
  nextVisit?: string;
};

export default function PrescriptionsPage() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    // Mock prescriptions data
    setPrescriptions([
      {
        id: 1,
        date: '2026-02-28',
        doctorName: 'Dr. Emily Carter',
        specialty: 'Cardiologist',
        diagnosis: 'Mild Hypertension (Stage 1)',
        medications: [
          {
            name: 'Amlodipine',
            dosage: '5mg',
            frequency: 'Once daily',
            duration: '30 days',
            instructions: 'Take in the morning with or without food'
          },
          {
            name: 'Aspirin',
            dosage: '81mg',
            frequency: 'Once daily',
            duration: '30 days',
            instructions: 'Take with food to reduce stomach irritation'
          }
        ],
        notes: 'Monitor blood pressure daily. Reduce sodium intake. Follow up in 30 days.',
        status: 'active',
        nextVisit: '2026-03-30'
      },
      {
        id: 2,
        date: '2026-02-15',
        doctorName: 'Dr. Michael Brown',
        specialty: 'General Physician',
        diagnosis: 'Upper Respiratory Infection',
        medications: [
          {
            name: 'Amoxicillin',
            dosage: '500mg',
            frequency: 'Three times daily',
            duration: '7 days',
            instructions: 'Complete the full course even if symptoms improve'
          },
          {
            name: 'Acetaminophen',
            dosage: '500mg',
            frequency: 'As needed',
            duration: '5 days',
            instructions: 'Take for fever or pain. Do not exceed 4g per day.'
          }
        ],
        notes: 'Rest and stay hydrated. Return if symptoms worsen.',
        status: 'completed'
      },
      {
        id: 3,
        date: '2026-01-10',
        doctorName: 'Dr. Sophia Nguyen',
        specialty: 'Pulmonologist',
        diagnosis: 'Seasonal Allergies',
        medications: [
          {
            name: 'Cetirizine',
            dosage: '10mg',
            frequency: 'Once daily',
            duration: '30 days',
            instructions: 'May cause drowsiness'
          }
        ],
        notes: 'Avoid known allergens. Consider air purifier at home.',
        status: 'expired'
      }
    ]);
  }, []);

  const filteredPrescriptions = prescriptions.filter(p => 
    filter === 'all' || p.status === filter
  );

  const statusColors = {
    active: 'bg-green-500/20 text-green-300 border-green-500/30',
    completed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-blue-600/5" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl">
                <FileText size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                My Prescriptions
              </h1>
            </div>
            <p className="text-slate-400">View and manage your medical prescriptions</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === tab
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prescriptions List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredPrescriptions.length === 0 ? (
              <div className="card-glass p-8 text-center">
                <FileText size={40} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400">No prescriptions found</p>
              </div>
            ) : (
              filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  onClick={() => setSelectedPrescription(prescription)}
                  className={`card-glass p-5 cursor-pointer transition-all ${
                    selectedPrescription?.id === prescription.id
                      ? 'border-cyan-500/50 bg-cyan-500/5'
                      : 'hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{prescription.diagnosis}</h3>
                      <p className="text-sm text-slate-400">{prescription.doctorName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[prescription.status]}`}>
                      {prescription.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {prescription.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Pill size={12} />
                      {prescription.medications.length} meds
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Prescription Detail */}
          <div className="lg:col-span-2">
            {selectedPrescription ? (
              <div className="card-glass p-8 print:shadow-none print:border-none" id="prescription-detail">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 print:mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold">{selectedPrescription.diagnosis}</h2>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[selectedPrescription.status]}`}>
                        {selectedPrescription.status}
                      </span>
                    </div>
                    <p className="text-slate-400">{selectedPrescription.specialty}</p>
                  </div>
                  <div className="flex gap-2 print:hidden">
                    <button
                      onClick={handlePrint}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <Printer size={20} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                {/* Doctor & Date Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-cyan-400" />
                    <div>
                      <p className="text-xs text-slate-500">Prescribed by</p>
                      <p className="font-medium">{selectedPrescription.doctorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-cyan-400" />
                    <div>
                      <p className="text-xs text-slate-500">Date</p>
                      <p className="font-medium">{selectedPrescription.date}</p>
                    </div>
                  </div>
                </div>

                {/* Medications */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Pill size={20} className="text-cyan-400" />
                    Medications
                  </h3>
                  <div className="space-y-4">
                    {selectedPrescription.medications.map((med, index) => (
                      <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{med.name}</h4>
                            <p className="text-sm text-cyan-400">{med.dosage} • {med.frequency}</p>
                          </div>
                          <span className="px-2 py-1 rounded bg-slate-700 text-xs text-slate-300">
                            {med.duration}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 mt-3 text-sm text-slate-400">
                          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                          <p>{med.instructions}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Doctor's Notes</h3>
                  <p className="text-slate-300 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    {selectedPrescription.notes}
                  </p>
                </div>

                {/* Next Visit */}
                {selectedPrescription.nextVisit && (
                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3">
                    <Clock size={20} className="text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Next Follow-up</p>
                      <p className="font-semibold text-cyan-300">{selectedPrescription.nextVisit}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700/50 print:hidden">
                  <button
                    onClick={() => router.push('/medicine-reminder')}
                    className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                  >
                    <Clock size={18} />
                    Set Reminders
                  </button>
                  <button
                    onClick={() => router.push('/book')}
                    className="flex-1 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Book Follow-up
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-glass p-12 text-center">
                <Eye size={48} className="mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">Select a Prescription</h3>
                <p className="text-slate-500">Choose a prescription from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #prescription-detail, #prescription-detail * {
            visibility: visible;
          }
          #prescription-detail {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
