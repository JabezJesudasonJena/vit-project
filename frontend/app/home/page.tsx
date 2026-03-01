"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Stethoscope, 
  HeartPulse, 
  Baby, 
  Microscope, 
  PhoneCall, 
  AlertCircle, 
  Globe, 
  Mail, 
  ThumbsUp, 
  Send,
  PlusSquare
} from 'lucide-react';

// IMPORTANT: This must be a 'default' export for Next.js to recognize it as a page
export default function Page() {
  const router = useRouter();

  const handlePortalLogin = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden font-['Manrope',_sans-serif] bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100">
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Navigation Bar */}
        <header className="flex items-center justify-between border-b border-[#137fec]/10 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-2 text-[#137fec]">
            <PlusSquare size={32} strokeWidth={2.5} />
            <h2 className="text-slate-900 dark:text-white text-xl font-extrabold leading-tight tracking-tight">HealthCare+</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-slate-700 dark:text-slate-200 text-sm font-semibold hover:text-[#137fec] transition-colors" href="#">Home</a>
              <a className="text-slate-700 dark:text-slate-200 text-sm font-semibold hover:text-[#137fec] transition-colors" href="#">Login</a>
              <a className="text-slate-700 dark:text-slate-200 text-sm font-semibold hover:text-[#137fec] transition-colors" href="#">Register</a>
              <a className="text-slate-700 dark:text-slate-200 text-sm font-semibold hover:text-[#137fec] transition-colors" href="#">Contact</a>
            </nav>
            <button 
              onClick={handlePortalLogin}
              className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-[#137fec] text-white text-sm font-bold shadow-lg shadow-[#137fec]/20 hover:bg-[#137fec]/90 transition-all"
            >
              <span>Portal Login</span>
            </button>
          </div>
        </header>

        <main className="flex flex-col flex-1 max-w-[1280px] mx-auto w-full">
          {/* Hero Section */}
          <section className="px-6 py-12 md:py-20">
            <div className="flex flex-col gap-8 lg:flex-row items-center">
              <div 
                className="w-full relative aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-2xl lg:w-1/2" 
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#137fec]/20 to-transparent"></div>
              </div>
              <div className="flex flex-col gap-6 lg:w-1/2 lg:pl-10">
                <div className="flex flex-col gap-4">
                  <span className="bg-[#137fec]/10 text-[#137fec] px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider">World-Class Care</span>
                  <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                    Your Health Is Our <span className="text-[#137fec]">Top Priority</span>
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                    Access expert medical consultation from the comfort of your home. We provide specialized care with a human touch, combining technology with clinical excellence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#137fec] text-white text-base font-bold shadow-xl shadow-[#137fec]/20 hover:scale-[1.02] transition-transform">
                    <span>Book Appointment</span>
                  </button>
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span>Submit Health Query</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Banner */}
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl border border-red-100 bg-red-50 dark:bg-red-900/20 dark:border-red-900/30 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                  <AlertCircle size={28} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-lg font-extrabold">24/7 Emergency Support</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Our trauma center and ambulance services are available round the clock.</p>
                </div>
              </div>
              <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-red-600 text-white text-base font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                <PhoneCall size={20} className="mr-2" />
                <span>Call +1 (800) 555-0199</span>
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <section className="px-6 py-12">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Our Specialized Services</h2>
              <div className="h-1 w-20 bg-[#137fec] rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'General Checkup', icon: <Stethoscope />, desc: 'Comprehensive health screenings and routine preventive medical examinations.' },
                { title: 'Cardiology', icon: <HeartPulse />, desc: 'Advanced heart care services including diagnostics and surgical consultations.' },
                { title: 'Pediatrics', icon: <Baby />, desc: 'Specialized medical care for infants, children, and adolescents with expert care.' },
                { title: 'Diagnostics', icon: <Microscope />, desc: 'Modern laboratory and imaging services for accurate and fast medical reports.' }
              ].map((service, idx) => (
                <div key={idx} className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-[#137fec]/50 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-[#137fec]/10 text-[#137fec] group-hover:bg-[#137fec] group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">{service.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-normal">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Statistics Section */}
          <section className="px-6 py-12 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-2xl bg-slate-900 p-10 text-white">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-[#137fec]">15k+</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Happy Patients</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-[#137fec]">250+</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Expert Doctors</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-[#137fec]">45+</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Specialties</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-[#137fec]">98%</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Satisfaction</span>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white dark:bg-[#101922] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
          {/* Footer content remains the same... */}
          <div className="max-w-[1280px] mx-auto px-6 text-center">
             <p className="text-slate-400 dark:text-slate-500 text-xs">
              © 2024 HealthCare+ Medical System. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}