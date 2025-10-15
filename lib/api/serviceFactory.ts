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
  // MockLicenseService,
  // MockCertificateService,
  // MockInstallationService,
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
    return new MockProductService();
  }

  public getCartService(): ICartService {
    return new MockCartService();
  }

  public getOrderService(): IOrderService {
    return new MockOrderService();
  }

  // public getLicenseService(): ILicenseService {
  //   return new MockLicenseService();
  // }

  // public getCertificateService(): ICertificateService {
  //   return new MockCertificateService();
  // }

  // public getInstallationService(): IInstallationService {
  //   return new MockInstallationService();
  // }

  // Add other services as needed
  public getAuthService(): any { throw new Error('Not implemented'); }
  public getBlogService(): any { throw new Error('Not implemented'); }
  public getNotificationService(): any { throw new Error('Not implemented'); }
}

export const ServiceFactory = ServiceFactoryImpl.getInstance();