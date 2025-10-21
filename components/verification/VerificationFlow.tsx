// components/verification/VerificationFlow.tsx
"use client";

import { useState } from 'react';

type Step = 1 | 2 | 3 | 4;
type VerificationStatus = 'idle' | 'success' | 'failure';

export default function VerificationFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to send OTP
    console.log('Sending OTP to:', formData);
    setCurrentStep(2);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to verify OTP
    console.log('Verifying OTP:', otp.join(''));
    setCurrentStep(3);
  };

  const showVerificationResult = (status: 'success' | 'failure') => {
    setVerificationStatus(status);
    setCurrentStep(4);
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setVerificationStatus('idle');
    setFormData({ fullName: '', email: '', phone: '' });
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-800">
      {/* Step 1: User Details */}
      {currentStep === 1 && (
        <div>
          <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-6">
            Step 1: Your Details
          </h3>
          <form onSubmit={sendOtp}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label 
                  htmlFor="fullName" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary sm:text-sm text-slate-900 dark:text-slate-200 py-3 px-4"
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary sm:text-sm text-slate-900 dark:text-slate-200 py-3 px-4"
                />
              </div>

              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 712 345 678"
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary sm:text-sm text-slate-900 dark:text-slate-200 py-3 px-4"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-colors"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Verify OTP */}
      {currentStep === 2 && (
        <div>
          <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-6">
            Step 2: Verify OTP
          </h3>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Enter the One-Time Password sent to your email and phone.
          </p>

          <form onSubmit={verifyOtp}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-2xl font-bold rounded-md border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-200"
                  />
                ))}
              </div>
              <button 
                type="button"
                onClick={sendOtp}
                className="text-sm text-primary hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-colors"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Scan QR Code */}
      {currentStep === 3 && (
        <div>
          <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-6">
            Step 3: Scan QR Code
          </h3>
          <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-500 dark:text-slate-400">
              <svg 
                className="w-16 h-16 mx-auto mb-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3z"/>
              </svg>
              <p>Position the QR code within the frame</p>
            </div>
          </div>

          {/* Simulation buttons for testing */}
          <div className="mt-6 text-center space-x-4">
            <button
              onClick={() => showVerificationResult('success')}
              className="text-sm text-primary hover:underline"
            >
              Simulate Success
            </button>
            <button
              onClick={() => showVerificationResult('failure')}
              className="text-sm text-primary hover:underline"
            >
              Simulate Failure
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && (
        <div>
          {verificationStatus === 'success' && (
            <div className="text-center">
              <svg 
                className="w-24 h-24 mx-auto text-green-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h3 className="text-2xl font-bold text-green-500 mt-4">
                Genuine Certificate/License
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                This document has been successfully verified.
              </p>
            </div>
          )}

          {verificationStatus === 'failure' && (
            <div className="text-center">
              <svg 
                className="w-24 h-24 mx-auto text-red-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <h3 className="text-2xl font-bold text-red-500 mt-4">
                Verification Failed
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                This document could not be verified. Please try again or contact support.
              </p>
            </div>
          )}

          <div className="mt-8 text-center space-x-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-colors"
            >
              Scan Another
            </button>
            <button
              onClick={resetFlow}
              className="min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white text-base font-bold shadow-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}