'use client';

import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Brain, 
  Calendar, 
  MessageSquare, 
  AlertTriangle, 
  Stethoscope,
  UserPlus,
  LogIn,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { useEffect, useState } from 'react';

type HealthTip = {
  id: number;
  title: string;
  tip: string;
  category: string;
};

export default function Home() {
  const router = useRouter();
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [tipOfTheDay, setTipOfTheDay] = useState<HealthTip | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/health-tips')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHealthTips(data.tips);
          setTipOfTheDay(data.tipOfTheDay);
        }
      })
      .catch(() => {
        // Fallback tips if backend not running
        setTipOfTheDay({
          id: 1,
          title: 'Stay Hydrated',
          tip: 'Drink at least 8 glasses of water daily to maintain optimal health.',
          category: 'wellness'
        });
      });
  }, []);

  const features = [
    {
      title: 'AI Symptom Checker',
      description: 'Get AI-powered health insights based on your symptoms',
      icon: <Brain size={28} />,
      href: '/symptom-checker',
      color: 'from-violet-600 to-purple-600',
      badge: 'AI Powered'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule appointments with available doctors',
      icon: <Calendar size={28} />,
      href: '/book',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Submit Query',
      description: 'Submit healthcare queries and appointment requests',
      icon: <MessageSquare size={28} />,
      href: '/query',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Emergency SOS',
      description: 'Quick access to emergency services and contacts',
      icon: <AlertTriangle size={28} />,
      href: '/emergency',
      color: 'from-red-600 to-orange-600',
      badge: '24/7'
    },
    {
      title: 'Patient Application',
      description: 'Complete registration with medical details',
      icon: <Stethoscope size={28} />,
      href: '/apply',
      color: 'from-pink-600 to-rose-600'
    },
    {
      title: 'Track Queries',
      description: 'Monitor the status of your submitted queries',
      icon: <MessageSquare size={28} />,
      href: '/patient-queries',
      color: 'from-amber-600 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-xl px-6 md:px-20 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="p-2 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg">
              <Heart size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              HealthSync
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <LogIn size={18} />
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <UserPlus size={18} />
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Patient Query & Appointment System
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Submit healthcare queries, book appointments, and get AI-powered symptom analysis - all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push('/query')}
              className="btn-primary px-8 py-4 text-lg flex items-center gap-2 group"
            >
              Submit a Query
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/symptom-checker')}
              className="px-8 py-4 text-lg rounded-lg border border-violet-500/50 hover:bg-violet-500/10 transition-colors flex items-center gap-2"
            >
              <Brain size={20} />
              Try AI Symptom Checker
            </button>
          </div>
        </div>

        {/* Health Tip of the Day */}
        {tipOfTheDay && (
          <div className="mb-16">
            <div className="card-glass p-6 border-l-4 border-l-emerald-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Lightbulb size={24} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">Health Tip of the Day</p>
                  <h3 className="text-lg font-bold text-white mb-1">{tipOfTheDay.title}</h3>
                  <p className="text-slate-400">{tipOfTheDay.tip}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">What would you like to do?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => router.push(feature.href)}
                className="card-glass p-6 text-left group hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg text-white`}>
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className="px-2 py-1 text-xs font-semibold bg-violet-500/20 text-violet-300 rounded-full">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
                <div className="mt-4 text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Get Started <ArrowRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Doctors Available', value: '250+', icon: '👨‍⚕️' },
            { label: 'Patients Served', value: '15,000+', icon: '👥' },
            { label: 'Specialties', value: '45+', icon: '🏥' },
            { label: 'Satisfaction Rate', value: '98%', icon: '⭐' }
          ].map((stat, idx) => (
            <div key={idx} className="card-glass p-6 text-center">
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-violet-300">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Portal Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <div 
            onClick={() => router.push('/patient')}
            className="card-glass p-8 cursor-pointer hover:border-blue-500/50 transition-all group"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
              Patient Portal
            </h3>
            <p className="text-slate-400 mb-4">View your appointments, track queries, and manage your health records.</p>
            <span className="text-blue-400 flex items-center gap-1">
              Access Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
          <div 
            onClick={() => router.push('/doctor')}
            className="card-glass p-8 cursor-pointer hover:border-emerald-500/50 transition-all group"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">
              Doctor Portal
            </h3>
            <p className="text-slate-400 mb-4">Manage patient queries, appointments, and provide medical consultations.</p>
            <span className="text-emerald-400 flex items-center gap-1">
              Access Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 HealthSync Medical Systems. All rights reserved.</p>
          <p className="mt-2">Built for Healthcare Hackathon - Patient Query & Appointment Interface</p>
        </div>
      </footer>
    </div>
  );
}
