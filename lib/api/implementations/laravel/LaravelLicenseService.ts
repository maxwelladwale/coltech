import type { ILicenseService, ILicense, LicenseType } from '../../interfaces/types';

export class LaravelLicenseService implements ILicenseService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  }

  async getLicenseByVehicle(vehicleRegistration: string): Promise<ILicense> {
    const response = await fetch(`${this.baseUrl}/licenses/vehicle/${vehicleRegistration}`);
    if (!response.ok) throw new Error('License not found');
    
    return response.json();
  }

  async getLicensesByUser(userId: string): Promise<ILicense[]> {
    const response = await fetch(`${this.baseUrl}/my-licenses`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch licenses');
    
    return response.json();
  }

  async activateLicense(data: {
    orderId: string;
    mdvrSerialNumber: string;
    vehicleRegistration: string;
  }): Promise<ILicense> {
    const response = await fetch(`${this.baseUrl}/licenses/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to activate license');
    
    return response.json();
  }

  async renewLicense(licenseId: string, duration: number): Promise<ILicense> {
    const response = await fetch(`${this.baseUrl}/licenses/${licenseId}/renew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ duration })
    });

    if (!response.ok) throw new Error('Failed to renew license');
    
    return response.json();
  }

  async checkLicenseStatus(vehicleRegistration: string): Promise<{
    isActive: boolean;
    expiryDate?: Date;
    daysRemaining?: number;
  }> {
    const response = await fetch(`${this.baseUrl}/licenses/check/${vehicleRegistration}`);
    if (!response.ok) throw new Error('Failed to check license status');
    
    return response.json();
  }

  async getRenewalPrice(licenseType: LicenseType): Promise<number> {
    const response = await fetch(`${this.baseUrl}/licenses/renewal-price?type=${licenseType}`);
    if (!response.ok) throw new Error('Failed to get renewal price');
    
    const data = await response.json();
    return data.price;
  }
}
