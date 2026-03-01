'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

type DoctorSlot = {
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  available: boolean;
};

export default function BookAppointmentPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<DoctorSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<DoctorSlot | null>(null);
  const [filter, setFilter] = useState({ specialty: '', date: '' });
  const [bookingData, setBookingData] = useState({
    patientName: '',
    patientEmail: '',
    reason: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchSlots();
    // Load user info
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setBookingData(prev => ({
        ...prev,
        patientName: userData.fullName || '',
        patientEmail: userData.email || ''
      }));
    }
  }, []);

  const fetchSlots = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.specialty) params.append('specialty', filter.specialty);
      if (filter.date) params.append('date', filter.date);

      const response = await fetch(`${api.doctorSlots}?${params}`);
      const data = await response.json();
      if (data.success) {
        setSlots(data.slots);
      }
    } catch (err) {
      console.error('Failed to fetch slots:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot || !bookingData.patientName || !bookingData.reason) return;

    setBooking(true);
    try {
      const response = await fetch(api.bookSlot, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedSlot.doctorId,
          date: selectedSlot.date,
          time: selectedSlot.time,
          ...bookingData
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBookingSuccess(true);
        // Refresh slots
        fetchSlots();
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (err) {
      alert('Failed to book appointment');
    } finally {
      setBooking(false);
    }
  };

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, DoctorSlot[]>);

  const specialties = [...new Set(slots.map(s => s.specialty))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-blue-600/5" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            Book an Appointment
          </h1>
          <p className="text-slate-400">Select an available time slot with your preferred doctor</p>
        </div>

        {/* Success Modal */}
        {bookingSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card-glass p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Appointment Booked!</h3>
              <p className="text-slate-400 mb-2">
                Your appointment with {selectedSlot?.doctorName} has been confirmed.
              </p>
              <p className="text-violet-300 font-semibold mb-6">
                {selectedSlot?.date} at {selectedSlot?.time}
              </p>
              <button
                onClick={() => router.push('/patient')}
                className="btn-primary w-full py-3"
              >
                View My Appointments
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters */}
          <div className="lg:col-span-2">
            <div className="card-glass p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <select
                  value={filter.specialty}
                  onChange={(e) => setFilter(prev => ({ ...prev, specialty: e.target.value }))}
                  className="input-focus flex-1 min-w-[200px]"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={filter.date}
                  onChange={(e) => setFilter(prev => ({ ...prev, date: e.target.value }))}
                  className="input-focus flex-1 min-w-[200px]"
                />
                <button
                  onClick={fetchSlots}
                  className="btn-primary px-6"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Available Slots */}
            {loading ? (
              <div className="card-glass p-12 text-center">
                <Loader2 size={40} className="animate-spin text-violet-400 mx-auto" />
              </div>
            ) : Object.keys(slotsByDate).length === 0 ? (
              <div className="card-glass p-12 text-center">
                <Calendar size={40} className="text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No available slots found. Try different filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(slotsByDate).map(([date, dateSlots]) => (
                  <div key={date}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar size={18} className="text-violet-400" />
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {dateSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            selectedSlot === slot
                              ? 'border-violet-500 bg-violet-500/20'
                              : 'border-slate-700 hover:border-violet-500/50 bg-slate-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-violet-400" />
                            <span className="font-semibold">{slot.time}</span>
                          </div>
                          <p className="text-sm text-slate-300">{slot.doctorName}</p>
                          <p className="text-xs text-slate-500">{slot.specialty}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="card-glass p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Booking Details</h3>

              {selectedSlot ? (
                <div className="space-y-4">
                  {/* Selected Slot Info */}
                  <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                    <p className="font-semibold">{selectedSlot.doctorName}</p>
                    <p className="text-sm text-slate-400">{selectedSlot.specialty}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {selectedSlot.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {selectedSlot.time}
                      </span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={bookingData.patientName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, patientName: e.target.value }))}
                      className="input-focus w-full"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={bookingData.patientEmail}
                      onChange={(e) => setBookingData(prev => ({ ...prev, patientEmail: e.target.value }))}
                      className="input-focus w-full"
                      required
                    />
                    <textarea
                      placeholder="Reason for visit *"
                      value={bookingData.reason}
                      onChange={(e) => setBookingData(prev => ({ ...prev, reason: e.target.value }))}
                      className="input-focus w-full"
                      rows={3}
                      required
                    />
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={booking || !bookingData.patientName || !bookingData.reason}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                  >
                    {booking ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Check size={20} />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User size={40} className="text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">Select a time slot to book</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
