import type { IAuthService, IUser } from '../../interfaces/types';

export class LaravelAuthService implements IAuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();

    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return {
      user: this.transformUser(data.user),
      token: data.access_token
    };
  }

  async register(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }): Promise<{ user: IUser; token: string }> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        password_confirmation: data.password, // Laravel requires this
        full_name: data.fullName,
        phone: data.phone
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const responseData = await response.json();

    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', responseData.access_token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
    }

    return {
      user: this.transformUser(responseData.user),
      token: responseData.access_token
    };
  }

  async logout(token: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage, even if API call fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
  }

  async getCurrentUser(token: string): Promise<IUser> {
    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return this.transformUser(data.user);
  }

  async resetPassword(email: string): Promise<{ sent: boolean }> {
    // TODO: Implement password reset functionality
    // This will require adding a password reset endpoint to your Laravel backend
    const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Failed to send reset email');
    }

    return { sent: true };
  }

  async resendVerification(token: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to resend verification email');
    }

    const data = await response.json();
    return { message: data.message };
  }

  private transformUser(data: any): IUser {
    return {
      id: String(data.id),
      email: data.email,
      phone: data.phone,
      fullName: data.full_name,
      role: data.role,
      emailVerifiedAt: data.email_verified_at ? new Date(data.email_verified_at) : null,
      createdAt: new Date(data.created_at)
    };
  }

  // Helper method to get stored token
  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  // Helper method to get stored user
  getStoredUser(): IUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      const data = JSON.parse(userStr);
      return this.transformUser(data);
    } catch {
      return null;
    }
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }
}
