// ============================================================================
// COLTECH PORTABLE API INTERFACES
// Backend-agnostic TypeScript interfaces for vehicle telematics e-commerce
// ============================================================================

// ============================================================================
// DOMAIN MODELS (Your Business Logic - Never Changes)
// ============================================================================

export type ProductCategory = 'mdvr' | 'camera' | 'cable' | 'accessory' | 'installation' | 'license';

export type LicenseType = 'ai' | 'non-ai';

export type InstallationMethod = 'self' | 'technician';

export interface IProduct {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription?: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  specifications?: Record<string, string | number | boolean>;
  inStock: boolean;
  stockQuantity?: number;
}

export interface IMDVRProduct extends IProduct {
  category: 'mdvr';
  includesFreeLicense: boolean;
  licenseType: LicenseType;
  licenseDurationMonths: number;
  channels: number; // Number of camera inputs
  storageOptions: Array<'hdd' | 'sd_card'>;
  features: string[];
}

export interface ICamera extends IProduct {
  category: 'camera';
  channels: number; // Number of camera inputs
  storageOptions: Array<'hdd' | 'sd_card'>;
  features: string[];
}

export interface ILicenseProduct extends IProduct {
  category: 'license';
  licenseType: LicenseType;
  durationMonths: number;
  annualRenewalPrice: number;
  isRenewal: boolean;
}

export interface IPackage {
  id: string;
  name: string;
  description: string;
  recommendedFor?: string;
  totalPrice: number;
  discountedPrice?: number;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface ICustomPackage {
  mdvr: IMDVRProduct;
  cameras: Array<{ product: IProduct; quantity: number }>;
  storage?: { type: 'hdd' | 'sd_card'; capacity: string };
  accessories: Array<{ product: IProduct; quantity: number }>;
  totalPrice: number;
}

export interface ICartItem {
  productId: string;
  quantity: number;
  customizations?: Record<string, string | number | boolean>;
}

export interface ICart {
  id: string;
  userId?: string;
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  county: string;
  postalCode?: string;
}

export interface IInstallationDetails {
  method: InstallationMethod;
  garageId?: string;
  appointmentDate?: Date;
  appointmentTime?: string;
  vehicleRegistration?: string;
  vehicleMake?: string;
  vehicleModel?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  status: OrderStatus;
  shippingAddress: IShippingAddress;
  installationDetails?: IInstallationDetails;
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  invoiceUrl?: string;
  invoiceQRCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  qrCode: string; // For verification
  downloadUrl: string;
  issueDate: Date;
  dueDate?: Date;
  total: number;
}

export interface IPartnerGarage {
  id: string;
  name: string;
  location: string;
  county: string;
  phone: string;
  email?: string;
  rating?: number;
  availableSlots?: Date[];
}

export interface ILicense {
  id: string;
  licenseKey: string;
  mdvrSerialNumber?: string;
  vehicleRegistration: string;
  type: LicenseType;
  status: 'active' | 'expired' | 'suspended';
  activationDate: Date;
  expiryDate: Date;
  renewalPrice: number;
  orderId?: string;
}

export interface ICertificate {
  id: string;
  certificateNumber: string;
  type: 'installation' | 'license' | 'product';
  qrCode: string;
  issuedTo: string;
  issuedDate: Date;
  expiryDate?: Date;
  details: Record<string, string | number | boolean>;
}

export interface IVerificationRequest {
  qrCode: string;
  personalDetails: {
    fullName: string;
    idNumber: string;
    phone: string;
    email?: string;
  };
  otp: string;
}

export interface IVerificationResult {
  isValid: boolean;
  message: string;
  certificate?: ICertificate;
  verified: boolean;
}

export interface IUser {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  createdAt: Date;
}

export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishedAt: Date;
  tags?: string[];
}

// ============================================================================
// SERVICE INTERFACES (Backend Contract - Never Changes)
// ============================================================================

export interface IProductService {
  // Product retrieval
  getProducts(filters?: {
    category?: ProductCategory;
    search?: string;
    inStock?: boolean;
  }): Promise<IProduct[]>;
  
  getProductById(id: string): Promise<IProduct>;
  
  getRecommendedPackages(): Promise<IPackage[]>;
  
  getMDVRProducts(): Promise<IMDVRProduct[]>;

  getCameras(): Promise<ICamera[]>;
  
  // Product search
  searchProducts(query: string): Promise<IProduct[]>;
  
  // Product availability
  checkStock(productId: string): Promise<{ available: boolean; quantity: number }>;
}

export interface ICartService {
  // Cart management
  getCart(userId?: string): Promise<ICart>;
  
  addToCart(userId: string | undefined, item: ICartItem): Promise<ICart>;
  
  updateCartItem(userId: string | undefined, itemId: string, quantity: number): Promise<ICart>;
  
  removeFromCart(userId: string | undefined, itemId: string): Promise<ICart>;
  
  clearCart(userId: string | undefined): Promise<void>;
  
  // Custom package builder
  buildCustomPackage(config: {
    mdvrId: string;
    cameraIds: string[];
    accessoryIds: string[];
  }): Promise<ICustomPackage>;
}

export interface IOrderService {
  // Order creation
  createOrder(data: {
    userId?: string;
    cartId: string;
    shippingAddress: IShippingAddress;
    installationDetails?: IInstallationDetails;
    paymentMethod: string;
  }): Promise<IOrder>;
  
  // Order retrieval
  getOrderById(orderId: string): Promise<IOrder>;
  
  getOrdersByUser(userId: string): Promise<IOrder[]>;
  
  // Order updates
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<IOrder>;
  
  // Invoice generation
  generateInvoice(orderId: string): Promise<IInvoice>;
}

export interface IInstallationService {
  // Garage management
  getPartnerGarages(filters?: { county?: string }): Promise<IPartnerGarage[]>;
  
  getGarageById(garageId: string): Promise<IPartnerGarage>;
  
  // Appointment scheduling
  getAvailableSlots(garageId: string, date: Date): Promise<Date[]>;
  
  scheduleAppointment(data: {
    orderId: string;
    garageId: string;
    appointmentDate: Date;
    appointmentTime: string;
    vehicleDetails: {
      registration: string;
      make: string;
      model: string;
    };
  }): Promise<{ appointmentId: string; confirmed: boolean }>;
}

export interface ILicenseService {
  // License management
  getLicenseByVehicle(vehicleRegistration: string): Promise<ILicense>;
  
  getLicensesByUser(userId: string): Promise<ILicense[]>;
  
  activateLicense(data: {
    orderId: string;
    mdvrSerialNumber: string;
    vehicleRegistration: string;
  }): Promise<ILicense>;
  
  renewLicense(licenseId: string, duration: number): Promise<ILicense>;
  
  checkLicenseStatus(vehicleRegistration: string): Promise<{
    isActive: boolean;
    expiryDate?: Date;
    daysRemaining?: number;
  }>;
  
  // Pricing
  getRenewalPrice(licenseType: LicenseType): Promise<number>;
}

export interface ICertificateService {
  // Certificate verification
  sendOTP(phone: string, email?: string): Promise<{ sent: boolean; expiresIn: number }>;
  
  verifyOTP(phone: string, otp: string): Promise<{ valid: boolean }>;
  
  verifyQRCode(request: IVerificationRequest): Promise<IVerificationResult>;
  
  // Certificate generation
  generateCertificate(data: {
    type: 'installation' | 'license' | 'product';
    orderId: string;
    details: Record<string, string | number | boolean>;
  }): Promise<ICertificate>;
}

export interface IAuthService {
  // Authentication
  login(email: string, password: string): Promise<{ user: IUser; token: string }>;
  
  register(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }): Promise<{ user: IUser; token: string }>;
  
  logout(token: string): Promise<void>;
  
  // Session management
  getCurrentUser(token: string): Promise<IUser>;
  
  resetPassword(email: string): Promise<{ sent: boolean }>;
}

export interface IBlogService {
  // Blog posts
  getPosts(filters?: { tag?: string; limit?: number }): Promise<IBlogPost[]>;
  
  getPostBySlug(slug: string): Promise<IBlogPost>;
  
  getRecentPosts(limit: number): Promise<IBlogPost[]>;
}

export interface INotificationService {
  // Notifications to sales team
  notifySalesTeam(orderId: string): Promise<void>;
  
  // Customer notifications
  sendOrderConfirmation(orderId: string): Promise<void>;
  
  sendAppointmentReminder(appointmentId: string): Promise<void>;
  
  sendLicenseExpiryWarning(licenseId: string, daysRemaining: number): Promise<void>;
}

// ============================================================================
// SERVICE FACTORY (Dependency Injection)
// ============================================================================

export interface IServiceFactory {
  getProductService(): IProductService;
  getCartService(): ICartService;
  getOrderService(): IOrderService;
  getInstallationService(): IInstallationService;
  getLicenseService(): ILicenseService;
  getCertificateService(): ICertificateService;
  getAuthService(): IAuthService;
  getBlogService(): IBlogService;
  getNotificationService(): INotificationService;
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// In your Next.js pages/components:

import { ServiceFactory } from '@/lib/api/serviceFactory';

export default async function ProductsPage() {
  const productService = ServiceFactory.getProductService();
  const mdvrs = await productService.getMDVRProducts();
  
  return (
    <div>
      {mdvrs.map(mdvr => (
        <ProductCard key={mdvr.id} product={mdvr} />
      ))}
    </div>
  );
}

// To migrate from Odoo to another backend:
// 1. Change NEXT_PUBLIC_BACKEND env variable
// 2. That's it! Your Next.js code never changes.
*/