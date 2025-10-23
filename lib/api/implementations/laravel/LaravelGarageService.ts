import type { IInstallationService, IPartnerGarage } from '../../interfaces/types';

export class LaravelGarageService implements IInstallationService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  }

  async getPartnerGarages(filters?: { county?: string }): Promise<IPartnerGarage[]> {
    const params = new URLSearchParams();
    if (filters?.county) params.append('county', filters.county);

    const response = await fetch(`${this.baseUrl}/garages?${params}`);
    if (!response.ok) throw new Error('Failed to fetch garages');
    
    return response.json();
  }

  async getGarageById(garageId: string): Promise<IPartnerGarage> {
    const response = await fetch(`${this.baseUrl}/garages/${garageId}`);
    if (!response.ok) throw new Error('Garage not found');
    
    return response.json();
  }

  async getAvailableSlots(garageId: string, date: Date): Promise<Date[]> {
    // TODO: Implement on backend
    // For now return mock slots
    const slots: Date[] = [];
    const baseDate = new Date(date);
    for (let i = 9; i <= 16; i++) {
      const slot = new Date(baseDate);
      slot.setHours(i, 0, 0, 0);
      slots.push(slot);
    }
    return slots;
  }

  async scheduleAppointment(data: {
    orderId: string;
    garageId: string;
    appointmentDate: Date;
    appointmentTime: string;
    vehicleDetails: { registration: string; make: string; model: string };
  }): Promise<{ appointmentId: string; confirmed: boolean }> {
    // TODO: Implement on backend
    return {
      appointmentId: `apt-${Date.now()}`,
      confirmed: true
    };
  }
}