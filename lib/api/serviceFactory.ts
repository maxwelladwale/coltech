// lib/api/serviceFactory.ts - FIXED VERSION

import type {
  IProductService,
  ICartService,
  IOrderService,
  ILicenseService,
  ICertificateService,
  IInstallationService,
  IAuthService,
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

// Laravel Services
import { LaravelProductService } from './implementations/laravel/LaravelProductService';
import { LaravelOrderService } from './implementations/laravel/LaravelOrderService';
import { LaravelGarageService } from './implementations/laravel/LaravelGarageService';
import { LaravelLicenseService } from './implementations/laravel/LaravelLicenseService';
import { LaravelCertificateService } from './implementations/laravel/LaravelCertificateService';
import { LaravelAuthService } from './implementations/laravel/LaravelAuthService';

import { MockPaymentService, IPaymentService } from './implementations/mock/MockPaymentService';

type BackendType = 'mock' | 'odoo' | 'laravel';

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
      case 'laravel':
        return new LaravelProductService();
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
    console.log("ORDER SERVICE", this.backend);
    switch (this.backend) {
      case 'laravel':
        return new LaravelOrderService();
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockOrderService();
    }
  }

  public getLicenseService(): ILicenseService {
    switch (this.backend) {
      case 'laravel':
        return new LaravelLicenseService();
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockLicenseService();
    }
  }

  public getCertificateService(): ICertificateService {
    switch (this.backend) {
      case 'laravel':
        return new LaravelCertificateService();
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockCertificateService();
    }
  }

  public getInstallationService(): IInstallationService {
    switch (this.backend) {
      case 'laravel':
        return new LaravelGarageService();
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        return new MockInstallationService();
    }
  }

  public getAuthService(): IAuthService {
    switch (this.backend) {
      case 'laravel':
        return new LaravelAuthService();
      case 'odoo':
        throw new Error('Odoo backend not yet implemented');
      case 'mock':
      default:
        throw new Error('Mock auth service not yet implemented');
    }
  }
  
  public getBlogService(): any { 
    throw new Error('BlogService not yet implemented'); 
  }
  
  public getNotificationService(): any { 
    throw new Error('NotificationService not yet implemented'); 
  }
}

export const ServiceFactory = ServiceFactoryImpl.getInstance();