'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle } from 'lucide-react';

export default function VerificationSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const alreadyVerified = searchParams.get('already_verified') === 'true';

  useEffect(() => {
    // Refresh user data to update verification status
    const updateUserData = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    };

    updateUserData();
  }, [refreshUser]);

  const handleContinue = () => {
    setIsRedirecting(true);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {alreadyVerified ? 'Already Verified!' : 'Email Verified!'}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8">
            {alreadyVerified
              ? 'Your email address was already verified. You can continue using your account.'
              : 'Your email address has been successfully verified. You can now access all features of your account.'}
          </p>

          {/* Action Button */}
          <button
            onClick={handleContinue}
            disabled={isRedirecting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0066CC] hover:bg-[#0052A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRedirecting ? 'Redirecting...' : 'Continue to Home'}
          </button>

          {/* Additional Info */}
          <p className="mt-6 text-sm text-gray-500">
            You will be redirected to the home page shortly.
          </p>
        </div>
      </div>
    </div>
  );
}
