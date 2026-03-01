'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, AlertTriangle, Stethoscope, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

type ConditionResult = {
  condition: string;
  likelihood: string;
  specialist: string;
};

type AnalysisResult = {
  inputSymptoms: string[];
  matchedSymptoms: string[];
  possibleConditions: ConditionResult[];
  severityAssessment: {
    level: string;
    urgency: string;
    recommendation: string;
    emoji: string;
  };
  recommendations: string[];
  disclaimer: string;
};

export default function SymptomCheckerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    symptoms: '',
    severity: 'moderate',
    durationDays: '',
    age: '',
    additionalInfo: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.analysis);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const likelihoodColors: Record<string, string> = {
    High: 'bg-red-500/20 text-red-300 border-red-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Low: 'bg-green-500/20 text-green-300 border-green-500/30'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-blue-600/5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-2xl border border-violet-500/30 mb-4">
            <Brain size={40} className="text-violet-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            AI Symptom Checker
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Describe your symptoms and get AI-powered preliminary health insights. 
            This is not a replacement for professional medical advice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card-glass p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Symptoms */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Describe Your Symptoms *
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows={4}
                  className="input-focus w-full"
                  placeholder="e.g., headache, fever, cough, fatigue, sore throat..."
                  required
                />
                <p className="text-xs text-slate-500">Separate multiple symptoms with commas</p>
              </div>

              {/* Severity & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Severity</label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="input-focus w-full"
                  >
                    <option value="mild">🟢 Mild</option>
                    <option value="moderate">🟡 Moderate</option>
                    <option value="severe">🔴 Severe</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Duration (days)</label>
                  <input
                    type="number"
                    name="durationDays"
                    value={formData.durationDays}
                    onChange={handleChange}
                    className="input-focus w-full"
                    placeholder="e.g., 3"
                    min="1"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Age (optional)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-focus w-full"
                  placeholder="Your age"
                  min="1"
                  max="120"
                />
              </div>

              {/* Additional Info */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={2}
                  className="input-focus w-full"
                  placeholder="Any other relevant details (medications, pre-existing conditions...)"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Brain size={20} />
                    Analyze Symptoms
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {!result && !isAnalyzing && (
              <div className="card-glass p-8 text-center">
                <div className="p-4 bg-slate-800/50 rounded-full inline-block mb-4">
                  <Stethoscope size={40} className="text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No Analysis Yet</h3>
                <p className="text-slate-500">Fill in your symptoms and click analyze to get AI-powered health insights.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="card-glass p-8 text-center">
                <Loader2 size={40} className="text-violet-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Analyzing Your Symptoms</h3>
                <p className="text-slate-500">Our AI is processing your health information...</p>
              </div>
            )}

            {result && (
              <>
                {/* Severity Alert */}
                <div className={`card-glass p-6 border-l-4 ${
                  result.severityAssessment.level === 'severe' ? 'border-l-red-500' :
                  result.severityAssessment.level === 'moderate' ? 'border-l-yellow-500' :
                  'border-l-green-500'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{result.severityAssessment.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg capitalize">{result.severityAssessment.level} Severity</h3>
                      <p className="text-slate-400 text-sm">{result.severityAssessment.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Possible Conditions */}
                <div className="card-glass p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-yellow-400" />
                    Possible Conditions
                  </h3>
                  <div className="space-y-3">
                    {result.possibleConditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="font-medium">{condition.condition}</p>
                          <p className="text-xs text-slate-500">Consult: {condition.specialist}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs border ${likelihoodColors[condition.likelihood] || 'bg-slate-500/20'}`}>
                          {condition.likelihood}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="card-glass p-6">
                  <h3 className="font-bold text-lg mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <ArrowRight size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <p className="text-xs text-amber-300/80">
                    ⚠️ {result.disclaimer}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push('/query')}
                    className="btn-primary flex-1 py-3"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="px-6 py-3 rounded-lg border border-slate-600 hover:bg-slate-800 transition-colors"
                  >
                    New Analysis
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
