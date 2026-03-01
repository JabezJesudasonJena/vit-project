'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pill, Plus, Clock, Bell, Trash2, Check, ArrowLeft } from 'lucide-react';

type Reminder = {
  id: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  notes: string;
  active: boolean;
};

export default function MedicineReminderPage() {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    frequency: 'daily',
    times: ['09:00'],
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    // Load reminders from localStorage
    const saved = localStorage.getItem('medicineReminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage when reminders change
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTime = () => {
    setFormData(prev => ({ ...prev, times: [...prev.times, '12:00'] }));
  };

  const updateTime = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      times: prev.times.map((t, i) => i === index ? value : t)
    }));
  };

  const removeTime = (index: number) => {
    if (formData.times.length > 1) {
      setFormData(prev => ({
        ...prev,
        times: prev.times.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReminder: Reminder = {
      id: Date.now(),
      ...formData,
      active: true
    };
    setReminders(prev => [...prev, newReminder]);
    setFormData({
      medicineName: '',
      dosage: '',
      frequency: 'daily',
      times: ['09:00'],
      startDate: '',
      endDate: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const toggleReminder = (id: number) => {
    setReminders(prev =>
      prev.map(r => r.id === id ? { ...r, active: !r.active } : r)
    );
  };

  const deleteReminder = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const frequencyLabels: Record<string, string> = {
    daily: 'Every day',
    'twice-daily': 'Twice daily',
    weekly: 'Once a week',
    'as-needed': 'As needed'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-blue-600/5" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
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
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl">
                <Pill size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Medicine Reminders
              </h1>
            </div>
            <p className="text-slate-400">Never miss a dose. Set up your medication schedule.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Reminder
          </button>
        </div>

        {/* Add Reminder Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card-glass p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Add New Reminder</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Medicine Name</label>
                    <input
                      name="medicineName"
                      value={formData.medicineName}
                      onChange={handleChange}
                      className="input-focus w-full"
                      placeholder="e.g., Aspirin"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Dosage</label>
                    <input
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleChange}
                      className="input-focus w-full"
                      placeholder="e.g., 500mg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Frequency</label>
                    <select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      className="input-focus w-full"
                    >
                      <option value="daily">Daily</option>
                      <option value="twice-daily">Twice Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="as-needed">As Needed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">Reminder Times</label>
                  <div className="space-y-2">
                    {formData.times.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock size={18} className="text-slate-500" />
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => updateTime(index, e.target.value)}
                          className="input-focus flex-1"
                        />
                        {formData.times.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTime(index)}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTime}
                      className="text-sm text-violet-400 hover:text-violet-300"
                    >
                      + Add another time
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="input-focus w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">End Date (Optional)</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="input-focus w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="input-focus w-full resize-none"
                    rows={2}
                    placeholder="e.g., Take with food"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1 py-3">
                    Save Reminder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <div className="card-glass p-12 text-center">
            <Bell size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No reminders yet</h3>
            <p className="text-slate-500">Add your first medicine reminder to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`card-glass p-6 transition-all ${!reminder.active ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${reminder.active ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
                      <Pill size={24} className={reminder.active ? 'text-emerald-400' : 'text-slate-500'} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{reminder.medicineName}</h3>
                      <p className="text-sm text-slate-400">{reminder.dosage} • {frequencyLabels[reminder.frequency]}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {reminder.times.map((time, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">
                            🕐 {time}
                          </span>
                        ))}
                      </div>
                      {reminder.notes && (
                        <p className="text-xs text-slate-500 mt-2">📝 {reminder.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        reminder.active
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
