'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Phone, MapPin, Lock, User, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

export default function RegistrationPage() {
  const router = useRouter();

  // 1. State management for all form fields
  const [formData, setFormData] = useState({
    userRole: 'patient',
    fullName: '',
    dob: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const element = e.target as HTMLInputElement;
    
    let val: any;
    if (type === 'checkbox') {
      val = element.checked;
    } else if (type === 'radio') {
      val = element.value;
    } else {
      val = value;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(api.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful:', data);
        alert('Registration successful! Check backend console for logged data.');
        // Optionally redirect: router.push('/login');
      } else {
        setSubmitError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('Failed to connect to server. Make sure backend is running on port 5000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
      </div>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-xl px-6 md:px-20 py-4 sticky top-0 z-50 animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg group-hover:shadow-lg group-hover:shadow-violet-500/50 transition-all">
                <Heart size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">Surakshadwaar</h1>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="btn-primary text-sm"
            >
              Login
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
          <div className="max-w-2xl w-full animate-fadeInUp">
            <div className="mb-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Create Your Account
              </h2>
              <p className="text-slate-400 text-lg">Join our healthcare community for seamless appointment management</p>
            </div>

            {/* Card Container */}
            <div className="card-glass p-8 md:p-12 space-y-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Account Type Selection */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-violet-600/10 to-blue-600/10 border border-violet-500/30">
                  <label className="block text-sm font-semibold text-slate-200 mb-4">Account Type</label>
                  <div className="flex gap-8">
                    {['patient', 'doctor'].map((role) => (
                      <label key={role} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="radio"
                            name="userRole"
                            value={role}
                            checked={formData.userRole === role}
                            onChange={handleChange}
                            className="w-5 h-5 accent-violet-500 cursor-pointer"
                          />
                        </div>
                        <span className="text-base font-medium capitalize group-hover:text-violet-300 transition-colors">
                          {role === 'patient' ? '👤 Patient' : '👨‍⚕️ Doctor'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input-focus pl-12 w-full"
                        placeholder="John Doe"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Date of Birth</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <input
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="input-focus pl-12 w-full"
                        type="date"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="input-focus w-full"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Mobile Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <input
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="input-focus pl-12 w-full"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-focus pl-12 w-full"
                        placeholder="example@email.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Residential Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-4 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-focus pl-12 w-full resize-none"
                        placeholder="Street address, City, State, Zip code"
                        rows={2}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-focus pl-12 w-full"
                        placeholder="••••••••"
                        type="password"
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-300">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400" size={18} />
                      <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'input-focus-error pl-12 w-full' : 'input-focus pl-12 w-full'}
                        placeholder="••••••••"
                        type="password"
                        required
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-400 font-medium">Passwords must match</p>
                    )}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-violet-500 cursor-pointer"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-slate-400 leading-snug cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 group">
                  Complete Registration
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                {/* Login Link */}
                <p className="text-center text-slate-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
                  >
                    Log in
                  </button>
                </p>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-xl py-6 px-6 md:px-20 text-center text-slate-400 text-sm">
          <p>© 2024 Surakshadwaar Medical Systems. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}