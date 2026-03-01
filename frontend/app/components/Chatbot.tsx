'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Pre-defined FAQ responses
const faqResponses: Record<string, string> = {
  'appointment': 'To book an appointment, go to the "Book Appointment" page or submit a query through our Query form. You can select your preferred doctor and time slot.',
  'book': 'To book an appointment, go to the "Book Appointment" page or submit a query through our Query form. You can select your preferred doctor and time slot.',
  'cancel': 'To cancel an appointment, visit your Patient Dashboard and click on the appointment you wish to cancel. Cancellations should be made at least 24 hours in advance.',
  'reschedule': 'To reschedule, go to your Patient Dashboard, find the appointment, and click "Reschedule". Select a new available time slot.',
  'emergency': 'For medical emergencies, call 911 immediately or visit our Emergency page for quick access to emergency services. If symptoms are severe, do not wait.',
  'symptom': 'Use our AI Symptom Checker to get preliminary health insights. Describe your symptoms and get recommendations. Remember, this is not a replacement for professional medical advice.',
  'doctor': 'Our doctors are available Monday-Friday, 9 AM - 5 PM. Specialties include Cardiology, Pulmonology, Dermatology, and General Practice.',
  'hours': 'Our clinic is open Monday-Friday 8 AM - 6 PM, Saturday 9 AM - 1 PM. Emergency services are available 24/7.',
  'insurance': 'We accept most major insurance providers. Please bring your insurance card to your appointment. Contact our billing department for specific coverage questions.',
  'cost': 'Consultation fees vary by specialty. General consultations start at $50. We offer payment plans and accept most insurance.',
  'prescription': 'Prescriptions can be sent directly to your preferred pharmacy. You can update your pharmacy details in your patient profile.',
  'test': 'Lab test results are usually available within 24-48 hours. You can view them in your Patient Dashboard or we will contact you directly.',
  'results': 'Lab test results are usually available within 24-48 hours. You can view them in your Patient Dashboard or we will contact you directly.',
  'register': 'Click on "Sign Up" to create an account. You will need to provide your personal information, contact details, and create a password.',
  'login': 'Use your registered email and password to log in. If you forgot your password, click "Forgot Password" on the login page.',
  'hello': 'Hello! 👋 How can I help you today? You can ask about appointments, symptoms, doctors, or our services.',
  'hi': 'Hi there! 👋 How can I assist you today?',
  'help': 'I can help you with: \n• Booking appointments\n• Symptom information\n• Doctor availability\n• Emergency contacts\n• Insurance questions\n\nWhat would you like to know?',
  'thanks': 'You\'re welcome! Is there anything else I can help you with?',
  'thank you': 'You\'re welcome! Is there anything else I can help you with?',
};

const findResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const [keyword, response] of Object.entries(faqResponses)) {
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }
  
  return "I'm not sure I understand. You can ask me about:\n• Booking appointments\n• Symptoms and health concerns\n• Doctor availability\n• Emergency services\n• Insurance and billing\n\nOr type 'help' for more options.";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm HealthBot, your virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: findResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Book Appointment', query: 'How do I book an appointment?' },
    { label: 'Emergency', query: 'emergency' },
    { label: 'Symptom Check', query: 'symptom checker' },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
          isOpen 
            ? 'bg-slate-700 rotate-90' 
            : 'bg-gradient-to-r from-violet-600 to-blue-600 shadow-violet-500/30'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] 
                        bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden
                        animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">HealthBot</h3>
              <p className="text-xs text-white/70">Online • Instant replies</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-1.5 rounded-full ${
                    message.sender === 'bot' ? 'bg-violet-500/20' : 'bg-blue-500/20'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot size={16} className="text-violet-400" />
                    ) : (
                      <User size={16} className="text-blue-400" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-tr-sm'
                      : 'bg-slate-800 text-slate-200 rounded-tl-sm'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-violet-500/20">
                  <Bot size={16} className="text-violet-400" />
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-slate-500 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(action.query);
                      setTimeout(handleSend, 100);
                    }}
                    className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white 
                         placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg disabled:opacity-50 
                         hover:opacity-90 transition-opacity"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
