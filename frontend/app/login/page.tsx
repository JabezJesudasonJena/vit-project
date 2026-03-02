'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userRole: 'patient'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(api.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store user info in localStorage for demo
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.userRole === 'doctor') {
          router.push('/doctor');
        } else {
          router.push('/patient');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md animate-fadeInUp">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl">
                <Heart size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                Surakshadwaar
              </h1>
            </div>
            <p className="text-slate-400">Welcome back! Please sign in to continue.</p>
          </div>

          {/* Login Card */}
          <div className="card-glass p-8 space-y-6">
            {/* Role Toggle */}
            <div className="flex rounded-lg bg-slate-800/50 p-1">
              {['patient', 'doctor'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userRole: role }))}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    formData.userRole === role
                      ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {role === 'patient' ? '👤 Patient' : '👨‍⚕️ Doctor'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-focus pl-12 w-full"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-focus pl-12 w-full"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Forgot Password */}
              <div className="text-right">
                <button type="button" className="text-sm text-violet-400 hover:text-violet-300">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-violet-400 font-semibold hover:text-violet-300"
              >
                Register now
              </button>
            </p>

            {/* Demo Credentials */}
            <div className="pt-4 border-t border-slate-700/50">
              <p className="text-xs text-slate-500 text-center mb-2">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-slate-800/50 text-slate-400">
                  <p className="font-medium text-slate-300">Patient</p>
                  <p>patient@demo.com</p>
                  <p>demo123</p>
                </div>
                <div className="p-2 rounded bg-slate-800/50 text-slate-400">
                  <p className="font-medium text-slate-300">Doctor</p>
                  <p>doctor@demo.com</p>
                  <p>demo123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
