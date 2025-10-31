import type {
    ICertificateService,
    ICertificate,
    IVerificationRequest,
    IVerificationResult
} from '../../interfaces/types';

export class LaravelCertificateService implements ICertificateService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  }

  async sendOTP(phone: string, email?: string): Promise<{ sent: boolean; expiresIn: number }> {
    const response = await fetch(`${this.baseUrl}/certificates/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, email })
    });

    if (!response.ok) throw new Error('Failed to send OTP');
    
    return response.json();
  }

  async verifyOTP(phone: string, otp: string): Promise<{ valid: boolean }> {
    const response = await fetch(`${this.baseUrl}/certificates/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, otp })
    });

    if (!response.ok) {
      return { valid: false };
    }
    
    return response.json();
  }

  async verifyQRCode(request: IVerificationRequest): Promise<IVerificationResult> {
    const response = await fetch(`${this.baseUrl}/certificates/verify-qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        isValid: false,
        verified: false,
        message: error.message || 'Verification failed'
      };
    }
    
    return response.json();
  }

  async generateCertificate(data: {
    type: 'installation' | 'license' | 'product';
    orderId: string;
    details: Record<string, any>;
  }): Promise<ICertificate> {
    const response = await fetch(`${this.baseUrl}/certificates/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to generate certificate');
    
    return response.json();
  }
}
