'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  Activity,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Heart,
  Stethoscope,
  FileText
} from 'lucide-react';

type StatsData = {
  totalPatients: number;
  totalAppointments: number;
  completedToday: number;
  pendingQueries: number;
  averageWaitTime: string;
  satisfactionRate: number;
};

type ChartData = {
  label: string;
  value: number;
  color: string;
};

export default function DashboardAnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsData>({
    totalPatients: 0,
    totalAppointments: 0,
    completedToday: 0,
    pendingQueries: 0,
    averageWaitTime: '0 min',
    satisfactionRate: 0
  });
  const [loading, setLoading] = useState(true);

  const weeklyAppointments: ChartData[] = [
    { label: 'Mon', value: 12, color: 'bg-violet-500' },
    { label: 'Tue', value: 19, color: 'bg-violet-500' },
    { label: 'Wed', value: 15, color: 'bg-violet-500' },
    { label: 'Thu', value: 22, color: 'bg-violet-500' },
    { label: 'Fri', value: 18, color: 'bg-violet-500' },
    { label: 'Sat', value: 8, color: 'bg-violet-500' },
    { label: 'Sun', value: 5, color: 'bg-violet-500' }
  ];

  const queryTypes: ChartData[] = [
    { label: 'Symptom Reports', value: 45, color: 'bg-blue-500' },
    { label: 'Appointment Requests', value: 32, color: 'bg-emerald-500' },
    { label: 'General Inquiries', value: 23, color: 'bg-amber-500' }
  ];

  const specialtyDistribution: ChartData[] = [
    { label: 'General', value: 35, color: 'bg-violet-500' },
    { label: 'Cardiology', value: 25, color: 'bg-red-500' },
    { label: 'Pulmonology', value: 20, color: 'bg-blue-500' },
    { label: 'Dermatology', value: 12, color: 'bg-pink-500' },
    { label: 'Others', value: 8, color: 'bg-slate-500' }
  ];

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setStats({
        totalPatients: 1247,
        totalAppointments: 3892,
        completedToday: 18,
        pendingQueries: 24,
        averageWaitTime: '12 min',
        satisfactionRate: 94.5
      });
      setLoading(false);
    }, 500);
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue, 
    color 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    trend?: 'up' | 'down'; 
    trendValue?: string;
    color: string;
  }) => (
    <div className="card-glass p-6 hover:border-violet-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );

  const maxWeeklyValue = Math.max(...weeklyAppointments.map(d => d.value));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-blue-600/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent mb-2">
              Dashboard Analytics
            </h1>
            <p className="text-slate-400">Overview of your healthcare system performance</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
            <Calendar size={18} className="text-slate-400" />
            <span className="text-sm">Last 30 days</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="+12%"
            color="bg-gradient-to-br from-violet-600 to-purple-600"
          />
          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments.toLocaleString()}
            icon={Calendar}
            trend="up"
            trendValue="+8%"
            color="bg-gradient-to-br from-blue-600 to-cyan-600"
          />
          <StatCard
            title="Completed Today"
            value={stats.completedToday}
            icon={Activity}
            color="bg-gradient-to-br from-emerald-600 to-teal-600"
          />
          <StatCard
            title="Pending Queries"
            value={stats.pendingQueries}
            icon={FileText}
            trend="down"
            trendValue="-5%"
            color="bg-gradient-to-br from-amber-600 to-orange-600"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Appointments Chart */}
          <div className="lg:col-span-2 card-glass p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Weekly Appointments</h2>
                <p className="text-sm text-slate-400">Appointments per day this week</p>
              </div>
              <BarChart3 size={24} className="text-violet-400" />
            </div>
            
            <div className="flex items-end justify-between h-48 gap-4 px-4">
              {weeklyAppointments.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-slate-400 mb-2">{day.value}</span>
                    <div
                      className={`w-full ${day.color} rounded-t-md transition-all hover:opacity-80`}
                      style={{ height: `${(day.value / maxWeeklyValue) * 140}px` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Satisfaction Rate */}
          <div className="card-glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Patient Satisfaction</h2>
              <Heart size={24} className="text-red-400" />
            </div>
            
            <div className="flex items-center justify-center py-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${stats.satisfactionRate * 4.4} 440`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{stats.satisfactionRate}%</span>
                  <span className="text-xs text-slate-400">Satisfied</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-slate-400">
              Based on {Math.floor(stats.totalPatients * 0.7)} patient reviews
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Query Types Distribution */}
          <div className="card-glass p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Query Distribution</h2>
                <p className="text-sm text-slate-400">Types of patient queries</p>
              </div>
              <TrendingUp size={24} className="text-blue-400" />
            </div>

            <div className="space-y-4">
              {queryTypes.map((type, index) => {
                const total = queryTypes.reduce((acc, t) => acc + t.value, 0);
                const percentage = Math.round((type.value / total) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{type.label}</span>
                      <span className="text-slate-400">{percentage}%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${type.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specialty Distribution */}
          <div className="card-glass p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Appointments by Specialty</h2>
                <p className="text-sm text-slate-400">Distribution this month</p>
              </div>
              <Stethoscope size={24} className="text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {specialtyDistribution.map((spec, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                  <div className={`w-3 h-3 rounded-full ${spec.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{spec.label}</p>
                    <p className="text-xs text-slate-400">{spec.value}%</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-slate-800/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium">Avg. Wait Time</p>
                  <p className="text-xs text-slate-400">For appointments</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-emerald-400">{stats.averageWaitTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
