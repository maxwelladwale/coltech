// lib/api/serviceFactory.ts - FIXED VERSION

import type {
  IProductService,
  ICartService,
  IOrderService,
  ILicenseService,
  ICertificateService,
  IInstallationService,
  IServiceFactory,
} from './interfaces/types';

import {
  MockProductService,
  MockCartService,
  MockOrderService,
  MockLicenseService,
  MockCertificateService,
  MockInstallationService,
} from './implementations/mock/MockServices';

type BackendType = 'mock' | 'odoo';

class ServiceFactoryImpl implements IServiceFactory {
  private static instance: ServiceFactoryImpl;
  private backend: BackendType;

  private constructor() {
    this.backend = (process.env.NEXT_PUBLIC_BACKEND as BackendType) || 'mock';
    console.log(`🚀 COLTECH Backend: ${this.backend}`);
  }

  public static getInstance(): ServiceFactoryImpl {
    if (!ServiceFactoryImpl.instance) {
      ServiceFactoryImpl.instance = new ServiceFactoryImpl();
    }
    return ServiceFactoryImpl.instance;
  }

  public getProductService(): IProductService {
    switch (this.backend) {
      case 'odoo':
        // return new OdooProductService(); // When you implement Odoo
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockProductService();
    }
  }

  public getCartService(): ICartService {
    switch (this.backend) {
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockCartService();
    }
  }

  public getOrderService(): IOrderService {
    switch (this.backend) {
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockOrderService();
    }
  }

  public getLicenseService(): ILicenseService {
    switch (this.backend) {
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockLicenseService();
    }
  }

  public getCertificateService(): ICertificateService {
    switch (this.backend) {
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockCertificateService();
    }
  }

  public getInstallationService(): IInstallationService {
    switch (this.backend) {
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockInstallationService();
    }
  }

  // Placeholder services (not yet implemented)
  public getAuthService(): any { 
    throw new Error('AuthService not yet implemented'); 
  }
  
  public getBlogService(): any { 
    throw new Error('BlogService not yet implemented'); 
  }
  
  public getNotificationService(): any { 
    throw new Error('NotificationService not yet implemented'); 
  }
}

export const ServiceFactory = ServiceFactoryImpl.getInstance();