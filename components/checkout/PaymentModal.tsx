// components/checkout/PaymentModal.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: 'mpesa' | 'card' | 'bank';
  amount: number;
  phoneNumber?: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (error: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  paymentMethod,
  amount,
  phoneNumber,
  onSuccess,
  onFailure
}: PaymentModalProps) {
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (isOpen && paymentMethod === 'mpesa') {
      // Simulate M-PESA prompt
      setStatus('processing');
      setMessage('Please check your phone for the M-PESA prompt...');
      
      // Countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Simulate payment response after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(timer);
        // 90% success rate
        if (Math.random() > 0.1) {
          setStatus('success');
          setMessage('Payment received successfully!');
          onSuccess(`MPESA${Date.now()}`);
        } else {
          setStatus('failed');
          setMessage('Payment was cancelled or timed out. Please try again.');
          onFailure('Payment failed');
        }
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isOpen, paymentMethod, onSuccess, onFailure]);

  const handleClose = () => {
    if (status !== 'processing') {
      setCountdown(60);
      setStatus('processing');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" showCloseButton={status !== 'processing'}>
        <DialogHeader>
          <DialogTitle>
            {paymentMethod === 'mpesa' && 'M-PESA Payment'}
            {paymentMethod === 'card' && 'Card Payment'}
            {paymentMethod === 'bank' && 'Bank Transfer'}
          </DialogTitle>
          <DialogDescription>
            {status === 'processing' && 'Processing your payment...'}
            {status === 'success' && 'Payment completed'}
            {status === 'failed' && 'Payment failed'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8">
          {/* Processing State */}
          {status === 'processing' && (
            <>
              {paymentMethod === 'mpesa' && (
                <div className="mb-6">
                  <div className="relative">
                    <Smartphone className="w-20 h-20 text-green-600 animate-pulse" />
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full animate-ping" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'card' && (
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
              )}

              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                {message}
              </p>

              {paymentMethod === 'mpesa' && (
                <>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4 w-full">
                    <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                      <strong>Amount:</strong> KES {amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Phone:</strong> {phoneNumber}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Time remaining</p>
                    <div className="text-3xl font-bold text-primary">
                      {countdown}s
                    </div>
                  </div>

                  <div className="mt-6 w-full space-y-2 text-xs text-gray-500 text-center">
                    <p>💡 Enter your M-PESA PIN on your phone</p>
                    <p>📱 Check for the notification on your device</p>
                  </div>
                </>
              )}

              {paymentMethod === 'card' && (
                <p className="text-sm text-gray-500">
                  Securely processing your card payment...
                </p>
              )}
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className="mb-6">
                <CheckCircle className="w-20 h-20 text-green-600" />
              </div>
              <p className="text-lg font-semibold mb-2">Payment Successful!</p>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
              <Button onClick={handleClose} className="w-full">
                Continue
              </Button>
            </>
          )}

          {/* Failed State */}
          {status === 'failed' && (
            <>
              <div className="mb-6">
                <XCircle className="w-20 h-20 text-red-600" />
              </div>
              <p className="text-lg font-semibold mb-2">Payment Failed</p>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
              <div className="w-full space-y-2">
                <Button onClick={handleClose} className="w-full">
                  Try Again
                </Button>
                <Button onClick={handleClose} variant="outline" className="w-full">
                  Use Different Method
                </Button>
              </div>
            </>
          )}
        </div>

        {status === 'processing' && paymentMethod === 'mpesa' && (
          <div className="text-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setStatus('failed');
                setMessage('Payment cancelled by user');
                onFailure('Cancelled');
              }}
            >
              Cancel Payment
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}