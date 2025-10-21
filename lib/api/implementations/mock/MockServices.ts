// lib/api/implementations/mock/MockProductService.ts
import { IProductService, IProduct, IMDVRProduct, IPackage, ICartService, ICart, ICartItem, IOrderService, IOrder, OrderStatus, IShippingAddress, IInstallationDetails, ICustomPackage, IInvoice, ICamera, IPartnerGarage, IInstallationService } from '../../interfaces/types';

export class MockProductService implements IProductService {
  async getProducts(): Promise<IProduct[]> {
    // Return fake data
    return [
      {
        id: '1',
        name: 'MDVR 4-Channel AI',
        category: 'mdvr',
        description: 'Advanced 4-channel AI-enabled MDVR',
        imageUrl: '/images/mdvr-4ch.jpg',
        price: 50000,
        inStock: true,
        stockQuantity: 10
      },
      {
        id: '2',
        name: 'HD Camera 1080p',
        category: 'camera',
        description: 'High-definition surveillance camera',
        imageUrl: '/images/mdvr-4ch.jpg',
        price: 5000,
        inStock: true,
        stockQuantity: 50
      }
    ];
  }
  
  async getProductById(id: string): Promise<IProduct> {
    return {
      id,
      name: 'Mock Product',
      category: 'mdvr',
      description: 'This is mock data',
      price: 10000,
      inStock: true
    };
  }
  
  async getMDVRProducts(): Promise<IMDVRProduct[]> {
    return [
      {
        id: '1',
        name: 'MDVR 4-Channel AI',
        category: 'mdvr',
        description: 'Advanced MDVR',
        price: 45000,
        inStock: true,
        imageUrl: '/images/mdvr-4ch.jpg',
        includesFreeLicense: true,
        licenseType: 'ai',
        licenseDurationMonths: 12,
        channels: 4,
        storageOptions: ['hdd', 'sd_card'],
        features: ['GPS', 'AI', 'Real-time alerts']
      }
    ];
  }

  async getCameras(): Promise<ICamera[]> {
    return [
      {
        id: '1',
        name: 'HD Camera 1080p',
        category: 'camera',
        description: 'High-definition surveillance camera',
        imageUrl: '/images/mdvr-4ch.jpg',
        price: 5000,
        inStock: true,
        stockQuantity: 50,
        channels: 4,
        storageOptions: ['hdd', 'sd_card'],
        features: ['GPS', 'AI', 'Real-time alerts']
      }
    ];
  }
  
  // Implement other methods with mock data...
  async searchProducts(query: string): Promise<IProduct[]> {
    return [];
  }
  
  async checkStock(productId: string): Promise<{ available: boolean; quantity: number }> {
    return { available: true, quantity: 10 };
  }

  async getRecommendedPackages(): Promise<IPackage[]> {
    return [];
  }

}

export class MockCartService implements ICartService {
  async getCart(): Promise<ICart> {
    return {
      id: '1',
      userId: '1',
      items: [
        {
          productId: '1',
          quantity: 1
        },
        {
          productId: '2',
          quantity: 2
        }
      ],
      totalPrice: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async addToCart(userId: string | undefined, item: ICartItem): Promise<ICart> {
    return {
      id: '1',
      userId,
      items: [
        {
          productId: '1',
          quantity: 1
        },
        {
          productId: '2',
          quantity: 2
        }
      ],
      totalPrice: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async updateCartItem(userId: string | undefined, itemId: string, quantity: number): Promise<ICart> {
    return {
      id: '1',
      userId,
      items: [
        {
          productId: '1',
          quantity: 1
        },
        {
          productId: '2',
          quantity: 2
        }
      ],
      totalPrice: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async removeFromCart(userId: string | undefined, itemId: string): Promise<ICart> {
    return {
      id: '1',
      userId,
      items: [
        {
          productId: '1',
          quantity: 1
        },
        {
          productId: '2',
          quantity: 2
        }
      ],
      totalPrice: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async clearCart(userId: string | undefined): Promise<void> {
    // Do nothing
  }
  async buildCustomPackage(config: {
    mdvrId: string;
    cameraIds: string[];
    accessoryIds: string[];
  }): Promise<ICustomPackage> {
    return {
      mdvr: {
        id: '1',
        name: 'MDVR 4-Channel AI',
        category: 'mdvr',
        description: 'Advanced MDVR',
        price: 45000,
        inStock: true,
        includesFreeLicense: true,
        licenseType: 'ai',
        licenseDurationMonths: 12,
        channels: 4,
        storageOptions: ['hdd', 'sd_card'],
        features: ['GPS', 'AI', 'Real-time alerts']
      },
      cameras: [
        {
          product: {
            id: '2',
            name: 'HD Camera 1080p',
            category: 'camera',
            description: 'High-definition surveillance camera',
            price: 5000,
            inStock: true,
            stockQuantity: 50
          },
          quantity: 2
        }
      ],
      accessories: [
        {
          product: {
            id: '3',
            name: 'HD Camera 1080p',
            category: 'camera',
            description: 'High-definition surveillance camera',
            price: 5000,
            inStock: true,
            stockQuantity: 50
          },
          quantity: 2
        }
      ],
      totalPrice: 10000
    };
  }
}   

export class MockOrderService implements IOrderService {
  async createOrder(data: {
    userId?: string;
    cartId: string;
    shippingAddress: IShippingAddress;
    installationDetails?: IInstallationDetails;
    paymentMethod: string;
  }): Promise<IOrder> {
    return {
      id: '1',
      orderNumber: '123456',
      userId: data.userId,
      items: [
        {
          productId: '1',
          productName: 'MDVR 4-Channel AI',
          quantity: 1,
          unitPrice: 45000,
          totalPrice: 45000,
        },
        {
          productId: '2',
          productName: 'HD Camera 1080p',
          quantity: 2,
          unitPrice: 5000,
          totalPrice: 10000,
        }
      ],
      subtotal: 10000,
      tax: 0,
      shipping: 0,
      total: 10000,
      status: 'pending',
      shippingAddress: data.shippingAddress,
      installationDetails: data.installationDetails,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      invoiceUrl: '',
      invoiceQRCode: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async getOrderById(orderId: string): Promise<IOrder> {
    return {
      id: '1',
      orderNumber: '123456',
      userId: '1',
      items: [
        {
          productId: '1',
          productName: 'MDVR 4-Channel AI',
          quantity: 1,
          unitPrice: 45000,
          totalPrice: 45000,
        },
        {
          productId: '2',
          productName: 'HD Camera 1080p',
          quantity: 2,
          unitPrice: 5000,
          totalPrice: 10000,
        }
      ],
      subtotal: 10000,
      tax: 0,
      shipping: 0,
      total: 10000,
      status: 'pending',
      shippingAddress: {
        fullName: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
        city: 'Anytown',
        county: 'County',
        postalCode: '12345'
      },
      installationDetails: {
        method: 'self',
        garageId: '1',
        appointmentDate: new Date(),
        appointmentTime: '12:00 PM',
        vehicleRegistration: 'ABC123',
        vehicleMake: 'Ford',
        vehicleModel: 'Mustang'
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'pending',
      invoiceUrl: 'https://example.com/invoice.pdf',
      invoiceQRCode: 'https://example.com/invoice.png',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async getOrdersByUser(userId: string): Promise<IOrder[]> {
    return [
      {
        id: '1',
        orderNumber: '123456',
        userId: '1',
        items: [
          {
            productId: '1',
            productName: 'MDVR 4-Channel AI',
            quantity: 1,
            unitPrice: 45000,
            totalPrice: 45000,
          },
          {
            productId: '2',
            productName: 'HD Camera 1080p',
            quantity: 2,
            unitPrice: 5000,
            totalPrice: 10000,
          }
        ],
        subtotal: 10000,
        tax: 0,
        shipping: 0,
        total: 10000,
        status: 'pending',
        shippingAddress: {
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john.doe@example.com',
          address: '123 Main St',
          city: 'Anytown',
          county: 'County',
          postalCode: '12345'
        },
        installationDetails: {
          method: 'self',
          garageId: '1',
          appointmentDate: new Date(),
          appointmentTime: '12:00 PM',
          vehicleRegistration: 'ABC123',
          vehicleMake: 'Ford',
          vehicleModel: 'Mustang'
        },
        paymentMethod: 'credit_card',
        paymentStatus: 'pending',
        invoiceUrl: 'https://example.com/invoice.pdf',
        invoiceQRCode: 'https://example.com/invoice.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
  
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<IOrder> {
    return {
      id: '1',
      orderNumber: '123456',
      userId: '1',
      items: [
        {
          productId: '1',
          productName: 'MDVR 4-Channel AI',
          quantity: 1,
          unitPrice: 45000,
          totalPrice: 45000,
        },
        {
          productId: '2',
          productName: 'HD Camera 1080p',
          quantity: 2,
          unitPrice: 5000,
          totalPrice: 10000,
        }
      ],
      subtotal: 10000,
      tax: 0,
      shipping: 0,
      total: 10000,
      status: 'pending',
      shippingAddress: {
        fullName: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
        city: 'Anytown',
        county: 'County',
        postalCode: '12345'
      },
      installationDetails: {
        method: 'self',
        garageId: '1',
        appointmentDate: new Date(),
        appointmentTime: '12:00 PM',
        vehicleRegistration: 'ABC123',
        vehicleMake: 'Ford',
        vehicleModel: 'Mustang'
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'pending',
      invoiceUrl: 'https://example.com/invoice.pdf',
      invoiceQRCode: 'https://example.com/invoice.png',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  async generateInvoice(orderId: string): Promise<IInvoice> {
    return {
      id: '1',
      invoiceNumber: '123456',
      orderId: '1',
      qrCode: 'https://example.com/invoice.png',
      downloadUrl: 'https://example.com/invoice.pdf',
      issueDate: new Date(),
      dueDate: new Date(),
      total: 10000
    };
  }
}

export class MockInstallationService implements IInstallationService {
  async getPartnerGarages(filters?: { county?: string }): Promise<IPartnerGarage[]> {
    return [
      {
        id: '1',
        name: 'Garage 1',
        location: '123 Main St',
        county: 'Anytown',
        phone: '1234567890',
        email: 'garage1@example.com',
        rating: 4.5,
        availableSlots: new Date()
      },
      {
        id: '2',
        name: 'Garage 2',
        location: '456 Elm St',
        county: 'Anytown',
        phone: '1234567890',
        email: 'garage2@example.com',
        rating: 4.5,
        availableSlots: new Date(),
      }
    ];
  }
  async getGarageById(garageId: string): Promise<IPartnerGarage> {
    return {
      id: '1',
      name: 'Garage 1',
      location: '123 Main St',
      county: 'Anytown',
      phone: '1234567890',
      email: 'garage1@example.com',
      rating: 4.5,
      availableSlots: new Date(),
    };
  }
  async getAvailableSlots(garageId: string, date: Date): Promise<Date[]> {
    return [
      new Date(),
      new Date(),
      new Date(),
      new Date()
    ];
  }
  async scheduleAppointment(data: {
    orderId: string;
    garageId: string;
    appointmentDate: Date;
    appointmentTime: string;
    vehicleDetails: {
      registration: string;
      make: string;
      model: string;
    };
  }): Promise<{ appointmentId: string; confirmed: boolean }> {
    return {
      appointmentId: '1',
      confirmed: true
    };
  }
}

