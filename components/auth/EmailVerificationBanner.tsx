'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, X, RefreshCw } from 'lucide-react';
import { ServiceFactory } from '@/lib/api/serviceFactory';

export default function EmailVerificationBanner() {
  const { user, token } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  // Don't show banner if user is not logged in or email is already verified
  if (!user || user.emailVerifiedAt || !isVisible) {
    return null;
  }

  const handleResendVerification = async () => {
    if (!token) return;

    setIsResending(true);
    setResendError('');
    setResendSuccess(false);

    try {
      const authService = await ServiceFactory.getAuthService();
      await authService.resendVerification(token);
      setResendSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    } catch (error) {
      setResendError(error instanceof Error ? error.message : 'Failed to resend verification email');

      // Hide error message after 5 seconds
      setTimeout(() => {
        setResendError('');
      }, 5000);
    } finally {
      setIsResending(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            <Mail className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Verify your email address</span>
                {' - '}
                Please check your inbox and click the verification link to access all features.
              </p>

              {/* Success Message */}
              {resendSuccess && (
                <p className="text-sm text-green-700 mt-1">
                  Verification email sent! Please check your inbox.
                </p>
              )}

              {/* Error Message */}
              {resendError && (
                <p className="text-sm text-red-700 mt-1">
                  {resendError}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-2 sm:mt-0">
            {/* Resend Button */}
            <button
              onClick={handleResendVerification}
              disabled={isResending || resendSuccess}
              className="flex items-center text-sm font-medium text-yellow-800 hover:text-yellow-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Sending...' : 'Resend'}
            </button>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
