'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, AlertTriangle, MapPin, Heart, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

type EmergencyContact = {
  name: string;
  number: string;
  type: string;
};

export default function EmergencyPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showSOS, setShowSOS] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sosData, setSosData] = useState({
    patientName: '',
    location: '',
    emergencyType: 'medical',
    contactNumber: ''
  });
  const [sosResult, setSosResult] = useState<any>(null);

  useEffect(() => {
    // Fetch emergency contacts
    fetch(api.emergency)
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(data.contacts);
      })
      .catch(console.error);

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSosData(prev => ({
            ...prev,
            location: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
          }));
        },
        () => {
          setSosData(prev => ({ ...prev, location: 'Location unavailable' }));
        }
      );
    }

    // Load user info if logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setSosData(prev => ({ ...prev, patientName: userData.fullName || '' }));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSOS && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showSOS && countdown === 0) {
      triggerSOS();
    }
    return () => clearTimeout(timer);
  }, [showSOS, countdown]);

  const triggerSOS = async () => {
    setSosTriggered(true);
    try {
      const response = await fetch(api.emergencySOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sosData),
      });
      const data = await response.json();
      setSosResult(data);
    } catch (err) {
      setSosResult({ success: false, message: 'Failed to send SOS. Call 911 directly.' });
    }
  };

  const cancelSOS = () => {
    setShowSOS(false);
    setCountdown(5);
  };

  const emergencyTypeIcons: Record<string, string> = {
    medical: '🏥',
    cardiac: '❤️',
    accident: '🚗',
    breathing: '💨',
    other: '🆘'
  };

  const contactIcons: Record<string, React.ReactNode> = {
    emergency: <Phone className="text-red-400" />,
    helpline: <Heart className="text-violet-400" />,
    mental_health: <Shield className="text-blue-400" />,
    poison: <AlertTriangle className="text-yellow-400" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl border border-red-500/30 mb-4">
            <AlertTriangle size={40} className="text-red-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-red-400">Emergency Services</h1>
          <p className="text-slate-400">Quick access to emergency contacts and SOS alerts</p>
        </div>

        {/* SOS Button */}
        {!showSOS && !sosTriggered && (
          <div className="mb-10">
            <button
              onClick={() => setShowSOS(true)}
              className="w-full py-8 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 
                         text-white text-2xl font-bold shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02]
                         flex flex-col items-center gap-2"
            >
              <span className="text-5xl">🆘</span>
              <span>EMERGENCY SOS</span>
              <span className="text-sm font-normal opacity-80">Press and hold for 5 seconds</span>
            </button>
          </div>
        )}

        {/* SOS Countdown */}
        {showSOS && !sosTriggered && (
          <div className="mb-10 card-glass p-8 text-center border-2 border-red-500/50">
            <h3 className="text-2xl font-bold text-red-400 mb-4">SOS Alert Activating</h3>
            <div className="text-7xl font-bold text-red-500 mb-4">{countdown}</div>
            <p className="text-slate-400 mb-6">Emergency services will be notified</p>
            
            {/* Emergency Type */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {Object.entries(emergencyTypeIcons).map(([type, icon]) => (
                <button
                  key={type}
                  onClick={() => setSosData(prev => ({ ...prev, emergencyType: type }))}
                  className={`p-3 rounded-lg text-center transition-all ${
                    sosData.emergencyType === type 
                      ? 'bg-red-500/30 border-2 border-red-500' 
                      : 'bg-slate-800/50 border border-slate-700 hover:border-red-500/50'
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <p className="text-xs mt-1 capitalize">{type}</p>
                </button>
              ))}
            </div>

            <button
              onClick={cancelSOS}
              className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* SOS Result */}
        {sosTriggered && (
          <div className="mb-10 card-glass p-8 text-center border-2 border-green-500/50">
            {sosResult ? (
              <>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Help is on the way!</h3>
                <p className="text-slate-400 mb-4">Estimated response: {sosResult.estimatedResponse}</p>
                
                <div className="text-left bg-slate-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2 text-slate-300">Instructions:</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {sosResult.instructions?.map((inst: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSosTriggered(false);
                    setShowSOS(false);
                    setCountdown(5);
                    setSosResult(null);
                  }}
                  className="btn-primary w-full py-3"
                >
                  Done
                </button>
              </>
            ) : (
              <Loader2 size={40} className="animate-spin text-red-400 mx-auto" />
            )}
          </div>
        )}

        {/* Emergency Contacts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-300 mb-4">Emergency Contacts</h2>
          
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={`tel:${contact.number}`}
              className="card-glass p-4 flex items-center justify-between hover:border-red-500/50 transition-colors block"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  {contactIcons[contact.type] || <Phone className="text-slate-400" />}
                </div>
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-slate-400">{contact.number}</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-semibold text-sm">
                Call
              </div>
            </a>
          ))}
        </div>

        {/* Location Info */}
        <div className="mt-8 card-glass p-4">
          <div className="flex items-center gap-3 text-slate-400">
            <MapPin size={20} />
            <div>
              <p className="text-sm font-medium text-slate-300">Your Location</p>
              <p className="text-xs">{sosData.location || 'Detecting...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
