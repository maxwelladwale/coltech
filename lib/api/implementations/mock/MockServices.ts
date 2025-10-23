// lib/api/implementations/mock/MockServices.ts - COMPLETE VERSION
import { 
  IProductService, IProduct, IMDVRProduct, IPackage, 
  ICartService, ICart, ICartItem, 
  IOrderService, IOrder, OrderStatus, IShippingAddress, IInstallationDetails, 
  ICustomPackage, IInvoice, ICamera, 
  IPartnerGarage, IInstallationService,
  ILicenseService, ILicense, LicenseType,
  ICertificateService, ICertificate, IVerificationRequest, IVerificationResult
} from '../../interfaces/types';

// ============================================================================
// EXPANDED MOCK DATA
// ============================================================================

export const mockMDVRs: IMDVRProduct[] = [
  {
    id: 'mdvr-1',
    name: 'MDVR 4-Channel AI Pro',
    category: 'mdvr',
    description: 'Professional 4-channel MDVR with advanced AI features including ADAS, DMS, and real-time driver behavior monitoring. Perfect for fleet management.',
    shortDescription: 'AI-powered 4-channel MDVR with ADAS & DMS',
    price: 45000,
    inStock: true,
    stockQuantity: 15,
    imageUrl: '/images/mdvr-4ch-ai.avif',
    includesFreeLicense: true,
    licenseType: 'ai',
    licenseDurationMonths: 12,
    channels: 4,
    storageOptions: ['hdd', 'sd_card'],
    features: [
      'GPS Tracking',
      'AI Driver Monitoring',
      'ADAS (Advanced Driver Assistance)',
      'Real-time Alerts',
      '4G Connectivity',
      'Cloud Storage'
    ],
    specifications: {
      'Resolution': '1080P',
      'Storage': 'Up to 2TB HDD / 256GB SD',
      'GPS': 'Built-in',
      'Network': '4G LTE',
      'Operating Temp': '-20°C to 70°C'
    }
  },
  {
    id: 'mdvr-2',
    name: 'MDVR 8-Channel AI Elite',
    category: 'mdvr',
    description: 'Enterprise-grade 8-channel MDVR system with full AI suite. Supports up to 8 cameras with advanced analytics and cloud integration.',
    shortDescription: 'Premium 8-channel MDVR for large vehicles',
    price: 75000,
    inStock: true,
    stockQuantity: 8,
    imageUrl: '/images/mdvr-8ch-ai.webp',
    includesFreeLicense: true,
    licenseType: 'ai',
    licenseDurationMonths: 12,
    channels: 8,
    storageOptions: ['hdd'],
    features: [
      'GPS Tracking',
      'AI Driver Monitoring',
      'ADAS (Advanced Driver Assistance)',
      'Blind Spot Detection',
      'Fatigue Detection',
      '4G/5G Connectivity',
      'Cloud Storage',
      'Panic Button'
    ],
    specifications: {
      'Resolution': '1080P',
      'Storage': 'Up to 4TB HDD',
      'GPS': 'Built-in',
      'Network': '4G/5G LTE',
      'Operating Temp': '-30°C to 80°C'
    }
  },
  {
    id: 'mdvr-3',
    name: 'MDVR 4-Channel Standard',
    category: 'mdvr',
    description: 'Reliable 4-channel MDVR for basic fleet monitoring. No AI features, but includes GPS tracking and HD recording.',
    shortDescription: 'Affordable 4-channel MDVR without AI',
    price: 28000,
    inStock: true,
    stockQuantity: 25,
    imageUrl: '/images/mdvr-4ch-ai.avif',
    includesFreeLicense: true,
    licenseType: 'non-ai',
    licenseDurationMonths: 12,
    channels: 4,
    storageOptions: ['sd_card'],
    features: [
      'GPS Tracking',
      'HD Recording',
      '3G Connectivity',
      'Basic Alerts'
    ],
    specifications: {
      'Resolution': '720P',
      'Storage': 'Up to 128GB SD',
      'GPS': 'Built-in',
      'Network': '3G',
      'Operating Temp': '-10°C to 60°C'
    }
  }
];

export const mockCameras: ICamera[] = [
  {
    id: 'cam-1',
    name: 'HD Front Camera 1080P',
    category: 'camera',
    description: 'High-definition front-facing camera with night vision and wide-angle lens. Perfect for road monitoring.',
    shortDescription: 'Full HD front camera with night vision',
    price: 5000,
    inStock: true,
    stockQuantity: 50,
    imageUrl: '/images/camera-front.jpg',
    channels: 1,
    storageOptions: ['sd_card'],
    features: [
      'Night Vision',
      'Wide Angle (140°)',
      'Waterproof (IP67)',
      'Auto Adjust'
    ],
    specifications: {
      'Resolution': '1080P',
      'Lens': '140° Wide Angle',
      'Night Vision': 'Yes',
      'Waterproof': 'IP67'
    }
  },
  {
    id: 'cam-2',
    name: 'Interior Cabin Camera',
    category: 'camera',
    description: 'Interior camera for driver and passenger monitoring. Features infrared night vision and audio recording.',
    shortDescription: 'Cabin monitoring camera with audio',
    price: 6500,
    inStock: true,
    stockQuantity: 40,
    imageUrl: '/images/camera-interior.webp',
    channels: 1,
    storageOptions: ['sd_card'],
    features: [
      'Infrared Night Vision',
      'Audio Recording',
      'Privacy Mode',
      'Wide Angle (130°)'
    ],
    specifications: {
      'Resolution': '720P',
      'Lens': '130° Wide Angle',
      'Audio': 'Built-in Microphone',
      'Night Vision': 'Infrared'
    }
  },
  {
    id: 'cam-3',
    name: 'Side/Rear Camera Kit',
    category: 'camera',
    description: 'Dual camera kit for side and rear monitoring. Waterproof and shock-resistant design.',
    shortDescription: 'Side & rear monitoring camera set',
    price: 8000,
    inStock: true,
    stockQuantity: 30,
    imageUrl: '/images/camera-interior.webp',
    channels: 2,
    storageOptions: ['sd_card'],
    features: [
      'Waterproof (IP68)',
      'Shock Resistant',
      'Night Vision',
      'Auto Parking Lines'
    ],
    specifications: {
      'Resolution': '720P',
      'Lens': '120° Wide Angle',
      'Waterproof': 'IP68',
      'Operating Temp': '-20°C to 70°C'
    }
  }
];

export const mockAccessories: IProduct[] = [
  {
    id: 'acc-1',
    name: 'Extension Cable 10M',
    category: 'cable',
    description: '10-meter extension cable for camera connections',
    price: 1500,
    imageUrl: '/images/cable-10m.jpg',
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 'acc-2',
    name: 'Hard Disk 2TB',
    imageUrl: '/images/hdd-2tb.jpg',
    category: 'accessory',
    description: '2TB enterprise-grade hard disk for MDVR storage',
    price: 8500,
    inStock: true,
    stockQuantity: 20
  },
  {
    id: 'acc-3',
    name: 'GPS Antenna',
    category: 'accessory',
    imageUrl: '/images/gps-antenna.webp',
    description: 'External GPS antenna for improved signal reception',
    price: 2000,
    inStock: true,
    stockQuantity: 50
  },
  {
    id: 'acc-4',
    name: 'SD Card 128GB',
    imageUrl: '/images/sd-card-128gb.webp',
    category: 'accessory',
    description: 'High-speed 128GB SD card for continuous recording',
    price: 3500,
    inStock: true,
    stockQuantity: 75
  }
];

export const mockProducts: IProduct[] = [
  ...mockMDVRs,
  ...mockCameras,
  ...mockAccessories
];

// ============================================================================
// PRODUCT SERVICE
// ============================================================================

export class MockProductService implements IProductService {
  async getProducts(filters?: {
    category?: string;
    search?: string;
    inStock?: boolean;
  }): Promise<IProduct[]> {
    let products = [...mockProducts];
    
    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    if (filters?.inStock !== undefined) {
      products = products.filter(p => p.inStock === filters.inStock);
    }
    
    return products;
  }
  
  async getProductById(id: string): Promise<IProduct> {
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
  
  async getMDVRProducts(): Promise<IMDVRProduct[]> {
    return mockMDVRs;
  }

  async getCameras(): Promise<ICamera[]> {
    return mockCameras;
  }
  
  async searchProducts(query: string): Promise<IProduct[]> {
    return this.getProducts({ search: query });
  }
  
  async checkStock(productId: string): Promise<{ available: boolean; quantity: number }> {
    const product = await this.getProductById(productId);
    return { 
      available: product.inStock, 
      quantity: product.stockQuantity || 0 
    };
  }

  async getRecommendedPackages(): Promise<IPackage[]> {
    return [
      {
        id: 'pkg-1',
        name: 'Fleet Safety Package',
        description: 'Complete safety solution with AI monitoring',
        recommendedFor: 'Commercial fleets',
        totalPrice: 65000,
        discountedPrice: 58500,
        items: [
          { productId: 'mdvr-1', quantity: 1 },
          { productId: 'cam-1', quantity: 2 },
          { productId: 'cam-2', quantity: 1 }
        ]
      }
    ];
  }
}

// ============================================================================
// CART SERVICE
// ============================================================================

export class MockCartService implements ICartService {
  private cart: ICart = {
    id: 'cart-1',
    userId: undefined,
    items: [],
    totalPrice: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  async getCart(_userId?: string): Promise<ICart> {
    return { ...this.cart, userId:_userId };
  }
  
  async addToCart(userId: string | undefined, item: ICartItem): Promise<ICart> {
    this.cart.items.push(item);
    this.cart.updatedAt = new Date();
    await this.recalculateTotal();
    return this.getCart(userId);
  }
  
  async updateCartItem(userId: string | undefined, itemId: string, quantity: number): Promise<ICart> {
    const item = this.cart.items.find(i => i.productId === itemId);
    if (item) {
      item.quantity = quantity;
      this.cart.updatedAt = new Date();
      await this.recalculateTotal();
    }
    return this.getCart(userId);
  }
  
  async removeFromCart(userId: string | undefined, itemId: string): Promise<ICart> {
    this.cart.items = this.cart.items.filter(i => i.productId !== itemId);
    this.cart.updatedAt = new Date();
    await this.recalculateTotal();
    return this.getCart(userId);
  }
  
  async clearCart(userId: string | undefined): Promise<void> {
    this.cart.items = [];
    this.cart.totalPrice = 0;
    this.cart.updatedAt = new Date();
  }

  private async recalculateTotal(): Promise<void> {
    let total = 0;
    for (const item of this.cart.items) {
      const product = mockProducts.find(p => p.id === item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }
    this.cart.totalPrice = total;
  }

  async buildCustomPackage(config: {
    mdvrId: string;
    cameraIds: string[];
    accessoryIds: string[];
  }): Promise<ICustomPackage> {
    const mdvr = mockMDVRs.find(m => m.id === config.mdvrId);
    if (!mdvr) throw new Error('MDVR not found');

    const cameras = config.cameraIds.map(id => ({
      product: mockCameras.find(c => c.id === id)!,
      quantity: 1
    }));

    const accessories = config.accessoryIds.map(id => ({
      product: mockAccessories.find(a => a.id === id)!,
      quantity: 1
    }));

    const totalPrice = mdvr.price + 
      cameras.reduce((sum, c) => sum + c.product.price * c.quantity, 0) +
      accessories.reduce((sum, a) => sum + a.product.price * a.quantity, 0);

    return { mdvr, cameras, accessories, totalPrice };
  }
}

// ============================================================================
// ORDER SERVICE
// ============================================================================

export class MockOrderService implements IOrderService {
  private orders: IOrder[] = [];
  private orderCounter = 1000;

  async createOrder(data: {
    userId?: string;
    cartId: string;
    shippingAddress: IShippingAddress;
    installationDetails?: IInstallationDetails;
    paymentMethod: string;
  }): Promise<IOrder> {
    const order: IOrder = {
      id: `order-${Date.now()}`,
      orderNumber: `ORD-${this.orderCounter++}`,
      userId: data.userId,
      items: [], // Would populate from cart
      subtotal: 50000,
      tax: 0,
      shipping: 0,
      total: 50000,
      status: 'pending',
      shippingAddress: data.shippingAddress,
      installationDetails: data.installationDetails,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.push(order);
    return order;
  }
  
  async getOrderById(orderId: string): Promise<IOrder> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    return order;
  }
  
  async getOrdersByUser(userId: string): Promise<IOrder[]> {
    return this.orders.filter(o => o.userId === userId);
  }
  
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<IOrder> {
    const order = await this.getOrderById(orderId);
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }
  
  async generateInvoice(orderId: string): Promise<IInvoice> {
    const order = await this.getOrderById(orderId);
    return {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${order.orderNumber}`,
      orderId: order.id,
      qrCode: `qr-${orderId}`,
      downloadUrl: `/invoices/${orderId}.pdf`,
      issueDate: new Date(),
      total: order.total
    };
  }
}

// ============================================================================
// INSTALLATION SERVICE
// ============================================================================

export class MockInstallationService implements IInstallationService {
  private garages: IPartnerGarage[] = [
    {
      id: 'garage-1',
      name: 'TechFit Auto Services',
      location: 'Westlands, Nairobi',
      county: 'Nairobi',
      phone: '+254 712 345 678',
      email: 'info@techfit.co.ke',
      rating: 4.8
    },
    {
      id: 'garage-2',
      name: 'FleetPro Installation Center',
      location: 'Industrial Area, Nairobi',
      county: 'Nairobi',
      phone: '+254 723 456 789',
      email: 'install@fleetpro.co.ke',
      rating: 4.6
    },
    {
      id: 'garage-3',
      name: 'SafeDrive Installations',
      location: 'Mombasa Road',
      county: 'Nairobi',
      phone: '+254 734 567 890',
      email: 'info@safedrive.co.ke',
      rating: 4.9
    }
  ];

  async getPartnerGarages(filters?: { county?: string }): Promise<IPartnerGarage[]> {
    if (filters?.county) {
      return this.garages.filter(g => g.county === filters.county);
    }
    return this.garages;
  }

  async getGarageById(garageId: string): Promise<IPartnerGarage> {
    const garage = this.garages.find(g => g.id === garageId);
    if (!garage) throw new Error('Garage not found');
    return garage;
  }

  async getAvailableSlots(garageId: string, date: Date): Promise<Date[]> {
    // Mock available slots
    const slots: Date[] = [];
    const baseDate = new Date(date);
    for (let i = 9; i <= 16; i++) {
      const slot = new Date(baseDate);
      slot.setHours(i, 0, 0, 0);
      slots.push(slot);
    }
    return slots;
  }

  async scheduleAppointment(_data: {
    orderId: string;
    garageId: string;
    appointmentDate: Date;
    appointmentTime: string;
    vehicleDetails: { registration: string; make: string; model: string };
  }): Promise<{ appointmentId: string; confirmed: boolean }> {
    return {
      appointmentId: `apt-${Date.now()}`,
      confirmed: true
    };
  }
}

// ============================================================================
// LICENSE SERVICE (NEW)
// ============================================================================

export class MockLicenseService implements ILicenseService {
  private licenses: ILicense[] = [];

  async getLicenseByVehicle(vehicleRegistration: string): Promise<ILicense> {
    const license = this.licenses.find(l => l.vehicleRegistration === vehicleRegistration);
    if (!license) throw new Error('License not found');
    return license;
  }

  async getLicensesByUser(_userId: string): Promise<ILicense[]> {
    return []; // Mock empty for now
  }

  async activateLicense(data: {
    orderId: string;
    mdvrSerialNumber: string;
    vehicleRegistration: string;
  }): Promise<ILicense> {
    const license: ILicense = {
      id: `lic-${Date.now()}`,
      licenseKey: `LIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      mdvrSerialNumber: data.mdvrSerialNumber,
      vehicleRegistration: data.vehicleRegistration,
      type: 'ai',
      status: 'active',
      activationDate: new Date(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      renewalPrice: 12000,
      orderId: data.orderId
    };
    this.licenses.push(license);
    return license;
  }

  async renewLicense(licenseId: string, duration: number): Promise<ILicense> {
    const license = this.licenses.find(l => l.id === licenseId);
    if (!license) throw new Error('License not found');
    
    license.expiryDate = new Date(license.expiryDate.getTime() + duration * 30 * 24 * 60 * 60 * 1000);
    license.status = 'active';
    return license;
  }

  async checkLicenseStatus(vehicleRegistration: string): Promise<{
    isActive: boolean;
    expiryDate?: Date;
    daysRemaining?: number;
  }> {
    try {
      const license = await this.getLicenseByVehicle(vehicleRegistration);
      const now = new Date();
      const daysRemaining = Math.floor((license.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        isActive: license.status === 'active' && daysRemaining > 0,
        expiryDate: license.expiryDate,
        daysRemaining: Math.max(0, daysRemaining)
      };
    } catch {
      return { isActive: false };
    }
  }

  async getRenewalPrice(licenseType: LicenseType): Promise<number> {
    return licenseType === 'ai' ? 12000 : 6000;
  }
}

// ============================================================================
// CERTIFICATE SERVICE (NEW)
// ============================================================================

export class MockCertificateService implements ICertificateService {
  private otpStore: Map<string, { otp: string; expiresAt: Date }> = new Map();
  private certificates: ICertificate[] = [];

  async sendOTP(phone: string, _email?: string): Promise<{ sent: boolean; expiresIn: number }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    this.otpStore.set(phone, { otp, expiresAt });
    
    console.log(`📱 OTP sent to ${phone}: ${otp}`); // Mock - would send SMS in production
    
    return { sent: true, expiresIn: 300 };
  }

  async verifyOTP(phone: string, otp: string): Promise<{ valid: boolean }> {
    const stored = this.otpStore.get(phone);
    
    if (!stored) return { valid: false };
    if (new Date() > stored.expiresAt) return { valid: false };
    if (stored.otp !== otp) return { valid: false };
    
    this.otpStore.delete(phone);
    return { valid: true };
  }

  async verifyQRCode(request: IVerificationRequest): Promise<IVerificationResult> {
    // Verify OTP first
    const otpValid = await this.verifyOTP(request.personalDetails.phone, request.otp);
    
    if (!otpValid.valid) {
      return {
        isValid: false,
        verified: false,
        message: 'Invalid or expired OTP'
      };
    }

    // Find certificate
    const certificate = this.certificates.find(c => c.qrCode === request.qrCode);
    
    if (!certificate) {
      return {
        isValid: false,
        verified: false,
        message: 'Certificate not found'
      };
    }

    return {
      isValid: true,
      verified: true,
      message: 'Certificate verified successfully',
      certificate
    };
  }

  async generateCertificate(data: {
    type: 'installation' | 'license' | 'product';
    orderId: string;
    details: Record<string, any>;
  }): Promise<ICertificate> {
    const certificate: ICertificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      type: data.type,
      qrCode: `qr-${Date.now()}`,
      issuedTo: data.details.issuedTo || 'Customer',
      issuedDate: new Date(),
      details: data.details
    };

    this.certificates.push(certificate);
    return certificate;
  }
}