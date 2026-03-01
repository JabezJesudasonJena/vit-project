'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Users, Settings, ArrowLeft, Monitor, Hand } from 'lucide-react';

type Appointment = {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
};

export default function VideoConsultationPage() {
  const router = useRouter();
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    // Mock upcoming teleconsultation appointments
    setUpcomingAppointments([
      {
        id: 1,
        doctorName: 'Dr. Emily Carter',
        specialty: 'Cardiologist',
        date: '2026-03-01',
        time: '10:00 AM',
        status: 'Ready'
      },
      {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'General Physician',
        date: '2026-03-03',
        time: '02:30 PM',
        status: 'Scheduled'
      }
    ]);
  }, []);

  const joinCall = async () => {
    setConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnecting(false);
    setInCall(true);
    setConnected(true);
    
    // Add welcome message
    setMessages([
      { sender: 'System', text: 'You have joined the consultation room.', time: new Date().toLocaleTimeString() },
      { sender: 'Dr. Emily Carter', text: 'Hello! I\'ll be with you in just a moment.', time: new Date().toLocaleTimeString() }
    ]);
  };

  const endCall = () => {
    setInCall(false);
    setConnected(false);
    setShowChat(false);
    setMessages([]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, {
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString()
    }]);
    setNewMessage('');

    // Simulate doctor response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'Dr. Emily Carter',
        text: 'Thank you for sharing that. Let me review your symptoms.',
        time: new Date().toLocaleTimeString()
      }]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {!inCall ? (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl border border-blue-500/30 mb-4">
              <Video size={40} className="text-blue-300" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-3">
              Video Consultation
            </h1>
            <p className="text-slate-400">Connect with your doctor from anywhere, anytime</p>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Teleconsultations</h2>
            <div className="grid gap-4">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  className={`card-glass p-6 cursor-pointer transition-all ${
                    selectedAppointment?.id === apt.id ? 'border-blue-500/50' : 'hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                        <Video size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{apt.doctorName}</h3>
                        <p className="text-sm text-slate-400">{apt.specialty}</p>
                        <p className="text-xs text-slate-500 mt-1">📅 {apt.date} at {apt.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'Ready'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-call Setup */}
          <div className="card-glass p-8">
            <h2 className="text-xl font-bold mb-6">Ready to Join?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Preview */}
              <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                {videoOn ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold">
                      You
                    </div>
                    <p className="absolute bottom-4 left-4 text-sm text-slate-400">Camera Preview</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff size={48} className="mx-auto text-slate-600 mb-2" />
                    <p className="text-slate-500">Camera Off</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="font-semibold text-slate-300">Pre-call settings</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-4 rounded-xl transition-all ${
                      micOn
                        ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                        : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    }`}
                  >
                    {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                  </button>
                  <button
                    onClick={() => setVideoOn(!videoOn)}
                    className={`p-4 rounded-xl transition-all ${
                      videoOn
                        ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                        : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    }`}
                  >
                    {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={joinCall}
                    disabled={connecting || !selectedAppointment}
                    className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {connecting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Video size={20} />
                        Join Consultation
                      </>
                    )}
                  </button>
                  {!selectedAppointment && (
                    <p className="text-xs text-slate-500 text-center mt-2">Select an appointment above to join</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h4 className="font-semibold text-blue-300 mb-2">📋 Tips for your consultation</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Ensure you have a stable internet connection</li>
                <li>• Find a quiet, well-lit space</li>
                <li>• Have your ID and any relevant documents ready</li>
                <li>• Test your camera and microphone before joining</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // In-call view
        <div className="fixed inset-0 bg-slate-900 flex">
          {/* Main video area */}
          <div className={`flex-1 flex flex-col ${showChat ? 'mr-80' : ''}`}>
            {/* Remote video (Doctor) */}
            <div className="flex-1 relative">
              <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                    EC
                  </div>
                  <p className="text-xl font-semibold">Dr. Emily Carter</p>
                  <p className="text-slate-400">Cardiologist</p>
                  {connected && (
                    <span className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Connected
                    </span>
                  )}
                </div>
              </div>

              {/* Self view */}
              <div className="absolute bottom-8 right-8 w-48 h-36 bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                {videoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                      You
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <VideoOff className="text-slate-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Controls bar */}
            <div className="h-24 bg-slate-800/50 backdrop-blur-xl flex items-center justify-center gap-4 px-6">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-4 rounded-full transition-all ${
                  micOn
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-red-600 text-white hover:bg-red-500'
                }`}
              >
                {micOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-4 rounded-full transition-all ${
                  videoOn
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-red-600 text-white hover:bg-red-500'
                }`}
              >
                {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
              </button>

              <button className="p-4 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-all">
                <Monitor size={24} />
              </button>

              <button className="p-4 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-all">
                <Hand size={24} />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-4 rounded-full transition-all ${
                  showChat ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                <MessageSquare size={24} />
              </button>

              <button
                onClick={endCall}
                className="p-4 px-8 rounded-full bg-red-600 text-white hover:bg-red-500 transition-all"
              >
                <Phone size={24} className="rotate-[135deg]" />
              </button>
            </div>
          </div>

          {/* Chat sidebar */}
          {showChat && (
            <div className="w-80 border-l border-slate-700 flex flex-col bg-slate-900">
              <div className="p-4 border-b border-slate-700">
                <h3 className="font-semibold">Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${msg.sender === 'You' ? 'ml-auto' : ''} max-w-[85%]`}
                  >
                    <div className={`rounded-lg p-3 ${
                      msg.sender === 'You'
                        ? 'bg-blue-600'
                        : msg.sender === 'System'
                        ? 'bg-slate-800 text-slate-400 text-sm'
                        : 'bg-slate-700'
                    }`}>
                      {msg.sender !== 'You' && msg.sender !== 'System' && (
                        <p className="text-xs text-violet-400 mb-1">{msg.sender}</p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input-focus flex-1 text-sm py-2"
                    placeholder="Type a message..."
                  />
                  <button type="submit" className="btn-primary px-4">
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
