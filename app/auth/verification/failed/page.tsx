'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { XCircle, Mail } from 'lucide-react';
import { ServiceFactory } from '@/lib/api/serviceFactory';

export default function VerificationFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  const reason = searchParams.get('reason');

  const getErrorMessage = () => {
    switch (reason) {
      case 'invalid':
        return 'The verification link is invalid or has expired.';
      case 'expired':
        return 'The verification link has expired.';
      default:
        return 'We could not verify your email address.';
    }
  };

  const handleResendVerification = async () => {
    if (!token) {
      router.push('/login');
      return;
    }

    setIsResending(true);
    setResendError('');

    try {
      const authService = await ServiceFactory.getAuthService();
      await authService.resendVerification(token);
      setResendSuccess(true);
    } catch (error) {
      setResendError(error instanceof Error ? error.message : 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 mb-8">
            {getErrorMessage()}
          </p>

          {/* Success Message for Resend */}
          {resendSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  Verification email sent! Please check your inbox.
                </p>
              </div>
            </div>
          )}

          {/* Error Message for Resend */}
          {resendError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{resendError}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {user && !resendSuccess && (
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0066CC] hover:bg-[#0052A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </button>
            )}

            <button
              onClick={handleGoHome}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] transition-colors"
            >
              Go to Home
            </button>
          </div>

          {/* Additional Info */}
          {!user && (
            <p className="mt-6 text-sm text-gray-500">
              Please{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-[#0066CC] hover:text-[#0052A3] font-medium"
              >
                log in
              </button>{' '}
              to resend the verification email.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
