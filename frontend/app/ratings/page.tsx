'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star, ArrowLeft, Send, User, MessageSquare } from 'lucide-react';

type Review = {
  id: number;
  doctorId: number;
  doctorName: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  appointmentType: string;
};

type Doctor = {
  id: number;
  fullName: string;
  specialty: string;
  averageRating: number;
  totalReviews: number;
};

export default function RatingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorIdParam = searchParams.get('doctorId');

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    appointmentType: 'consultation'
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDoctors();
    fetchReviews();
  }, []);

  useEffect(() => {
    if (doctorIdParam && doctors.length > 0) {
      const doc = doctors.find(d => d.id === parseInt(doctorIdParam));
      if (doc) {
        setSelectedDoctor(doc);
        setShowReviewForm(true);
      }
    }
  }, [doctorIdParam, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      if (data.success) {
        // Add mock rating data
        const doctorsWithRatings = data.doctors.map((doc: any) => ({
          ...doc,
          averageRating: 4.5 + Math.random() * 0.5,
          totalReviews: Math.floor(Math.random() * 50) + 10
        }));
        setDoctors(doctorsWithRatings);
      }
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ratings');
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      // Load mock reviews
      setReviews([
        {
          id: 1,
          doctorId: 2,
          doctorName: 'Dr. Emily Carter',
          patientName: 'John D.',
          rating: 5,
          comment: 'Excellent doctor! Very thorough and caring. Explained everything clearly.',
          date: '2026-02-25',
          appointmentType: 'consultation'
        },
        {
          id: 2,
          doctorId: 2,
          doctorName: 'Dr. Emily Carter',
          patientName: 'Sarah M.',
          rating: 4,
          comment: 'Great experience. Wait time was a bit long but worth it.',
          date: '2026-02-20',
          appointmentType: 'follow-up'
        }
      ]);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    setSubmitting(true);
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const newReview: Review = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.fullName,
      patientName: user.fullName || 'Anonymous',
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0],
      appointmentType: formData.appointmentType
    };

    try {
      await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
    } catch (err) {
      console.log('Backend not available, saving locally');
    }

    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
    setFormData({ rating: 5, comment: '', appointmentType: 'consultation' });
    setSubmitting(false);
  };

  const StarRating = ({ rating, interactive = false, size = 20 }: { rating: number; interactive?: boolean; size?: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && setFormData(prev => ({ ...prev, rating: star }))}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
          >
            <Star
              size={size}
              className={`${
                star <= (interactive ? (hoveredStar || formData.rating) : rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-slate-600'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-orange-600/5" />
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent mb-2">
              Doctor Ratings & Reviews
            </h1>
            <p className="text-slate-400">See what other patients think and share your experience</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctors List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Our Doctors</h2>
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`card-glass p-4 cursor-pointer transition-all ${
                    selectedDoctor?.id === doctor.id ? 'border-amber-500/50 bg-amber-500/5' : 'hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{doctor.fullName}</h3>
                      <p className="text-sm text-slate-400">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={doctor.averageRating} size={14} />
                        <span className="text-xs text-slate-500">({doctor.totalReviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-2">
            {selectedDoctor ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Reviews for {selectedDoctor.fullName}</h2>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <MessageSquare size={18} />
                    Write Review
                  </button>
                </div>

                {/* Review Form Modal */}
                {showReviewForm && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="card-glass p-8 w-full max-w-lg">
                      <h2 className="text-2xl font-bold mb-2">Rate Your Experience</h2>
                      <p className="text-slate-400 mb-6">with {selectedDoctor.fullName}</p>

                      <form onSubmit={handleSubmitReview} className="space-y-6">
                        <div className="text-center py-4">
                          <p className="text-sm text-slate-400 mb-3">Your Rating</p>
                          <div className="flex justify-center">
                            <StarRating rating={formData.rating} interactive size={32} />
                          </div>
                          <p className="text-lg font-semibold mt-2 text-amber-400">
                            {formData.rating === 5 ? 'Excellent!' :
                             formData.rating === 4 ? 'Very Good' :
                             formData.rating === 3 ? 'Good' :
                             formData.rating === 2 ? 'Fair' : 'Poor'}
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-slate-300 mb-2 block">Appointment Type</label>
                          <select
                            value={formData.appointmentType}
                            onChange={(e) => setFormData(prev => ({ ...prev, appointmentType: e.target.value }))}
                            className="input-focus w-full"
                          >
                            <option value="consultation">Consultation</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="checkup">Routine Checkup</option>
                            <option value="emergency">Emergency Visit</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-slate-300 mb-2 block">Your Review</label>
                          <textarea
                            value={formData.comment}
                            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                            className="input-focus w-full resize-none"
                            rows={4}
                            placeholder="Share your experience..."
                            required
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="flex-1 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                          >
                            {submitting ? 'Submitting...' : <><Send size={18} /> Submit</>}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews
                    .filter(r => r.doctorId === selectedDoctor.id)
                    .map((review) => (
                      <div key={review.id} className="card-glass p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{review.patientName}</p>
                            <p className="text-xs text-slate-500">{review.date} • {review.appointmentType}</p>
                          </div>
                          <StarRating rating={review.rating} size={16} />
                        </div>
                        <p className="text-slate-300">{review.comment}</p>
                      </div>
                    ))}
                  {reviews.filter(r => r.doctorId === selectedDoctor.id).length === 0 && (
                    <div className="card-glass p-8 text-center">
                      <MessageSquare size={40} className="mx-auto text-slate-600 mb-3" />
                      <p className="text-slate-400">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="card-glass p-12 text-center">
                <Star size={48} className="mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">Select a Doctor</h3>
                <p className="text-slate-500">Choose a doctor from the list to see their reviews</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
