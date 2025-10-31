import type { 
  IOrderService, 
  IOrder, 
  IShippingAddress, 
  IInstallationDetails,
  OrderStatus,
  IInvoice 
} from '../../interfaces/types';

export class LaravelOrderService implements IOrderService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    console.log("BASE URL", this.baseUrl);
  }


  async createOrder(data: {
  userId?: string;
  cartId: string;
  shippingAddress: IShippingAddress;
  installationDetails?: IInstallationDetails;
  paymentMethod: string;
}): Promise<IOrder> {
  // Get cart items from localStorage
  const cartData = localStorage.getItem('coltech_cart');
  const cart = cartData ? JSON.parse(cartData) : [];

  
  // Get auth token from localStorage
  const authToken = localStorage.getItem('auth_token');
  
  const cartItems = cart.map((item: any) => ({
    productId: item.id,
    quantity: item.quantity
  }));

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // Add Authorization header if token exists
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${this.baseUrl}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      cartItems,
      shippingAddress: data.shippingAddress,
      installationDetails: data.installationDetails,
      paymentMethod: data.paymentMethod
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create order');
  }

  const responseData = await response.json();
  return this.transformOrderResponse(responseData);
}
  async getOrderById(orderId: string): Promise<IOrder> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}`);
    console.log("GET ORDER RESPONSE", orderId, response);
    if (!response.ok) throw new Error('Order not found');

    const data = await response.json();
    return this.transformOrderResponse(data);
  }

  private transformOrderResponse(data: any): IOrder {
    return {
      id: String(data.id),
      orderNumber: data.order_number,
      userId: data.user_id ? String(data.user_id) : undefined,
      items: data.items.map((item: any) => ({
        productId: String(item.product_id),
        productName: item.product_name,
        quantity: item.quantity,
        unitPrice: parseFloat(item.unit_price),
        totalPrice: parseFloat(item.total_price)
      })),
      subtotal: parseFloat(data.subtotal),
      tax: data.tax ? parseFloat(data.tax) : undefined,
      shipping: data.shipping ? parseFloat(data.shipping) : undefined,
      total: parseFloat(data.total),
      status: data.status as OrderStatus,
      shippingAddress: {
        fullName: data.shipping_name,
        phone: data.shipping_phone,
        email: data.shipping_email,
        address: data.shipping_address,
        city: data.shipping_city,
        county: data.shipping_county,
        postalCode: data.shipping_postal_code
      },
      installationDetails: data.installation_method ? {
        method: data.installation_method,
        garageId: data.garage_id ? String(data.garage_id) : undefined,
        appointmentDate: data.appointment_date ? new Date(data.appointment_date) : undefined,
        appointmentTime: data.appointment_time,
        vehicleRegistration: data.vehicle_registration,
        vehicleMake: data.vehicle_make,
        vehicleModel: data.vehicle_model
      } : undefined,
      paymentMethod: data.payment_method,
      paymentStatus: data.payment_status,
      invoiceUrl: data.invoice_url,
      invoiceQRCode: data.invoice_qr_code,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  async getOrdersByUser(userId: string): Promise<IOrder[]> {
    const response = await fetch(`${this.baseUrl}/orders?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch orders');

    const data = await response.json();
    return data.map((order: any) => this.transformOrderResponse(order));
  }

  async findOrderByNumberAndEmail(orderNumber: string, email: string): Promise<IOrder | null> {
    const response = await fetch(`${this.baseUrl}/orders/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderNumber, email })
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to track order');

    const data = await response.json();
    return this.transformOrderResponse(data);
  }

  async getOrdersByEmail(email: string): Promise<IOrder[]> {
    const response = await fetch(`${this.baseUrl}/orders?guestEmail=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch orders');

    const data = await response.json();
    return data.map((order: any) => this.transformOrderResponse(order));
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<IOrder> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) throw new Error('Failed to update order status');

    const data = await response.json();
    return this.transformOrderResponse(data);
  }

  async generateInvoice(orderId: string): Promise<IInvoice> {
    // For now, return mock invoice data
    // TODO: Implement invoice generation on Laravel backend
    return {
      id: `inv-${orderId}`,
      invoiceNumber: `INV-${Date.now()}`,
      orderId,
      qrCode: `qr-${orderId}`,
      downloadUrl: `/invoices/${orderId}.pdf`,
      issueDate: new Date(),
      total: 0
    };
  }
}