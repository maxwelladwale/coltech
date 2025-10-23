// lib/api/implementations/mock/MockPaymentService.ts

export interface IPaymentService {
  // M-PESA Payment
  initiateMpesaPayment(data: {
    orderId: string;
    amount: number;
    phoneNumber: string;
  }): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }>;

  // Card Payment
  processCardPayment(data: {
    orderId: string;
    amount: number;
    cardDetails: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    };
  }): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }>;

  // Bank Transfer
  generateBankTransferReference(data: {
    orderId: string;
    amount: number;
  }): Promise<{
    referenceNumber: string;
    bankDetails: {
      bankName: string;
      accountNumber: string;
      accountName: string;
    };
  }>;

  // Payment Verification
  verifyPayment(transactionId: string): Promise<{
    verified: boolean;
    status: 'pending' | 'completed' | 'failed';
    amount?: number;
  }>;

  // Payment Status Check
  checkPaymentStatus(orderId: string): Promise<{
    status: 'pending' | 'paid' | 'failed';
    transactionId?: string;
    paidAt?: Date;
  }>;
}

export class MockPaymentService implements IPaymentService {
  private payments: Map<string, {
    transactionId?: string;
    referenceNumber?: string;
    method: string;
    status: 'pending' | 'completed' | 'failed';
    amount: number;
    paidAt?: Date;
  }> = new Map();

  async initiateMpesaPayment(data: {
    orderId: string;
    amount: number;
    phoneNumber: string;
  }): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }> {
    // Mock M-PESA STK Push
    console.log(`📱 Initiating M-PESA payment for order ${data.orderId}`);
    console.log(`   Amount: KES ${data.amount}`);
    console.log(`   Phone: ${data.phoneNumber}`);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful payment (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      const transactionId = `MPESA${Date.now()}`;
      
      this.payments.set(data.orderId, {
        transactionId,
        method: 'mpesa',
        status: 'completed',
        amount: data.amount,
        paidAt: new Date()
      });

      return {
        success: true,
        transactionId,
        message: 'M-PESA payment initiated. Please check your phone for the prompt.'
      };
    } else {
      return {
        success: false,
        message: 'Payment failed. Please try again or use a different payment method.'
      };
    }
  }

  async processCardPayment(data: {
    orderId: string;
    amount: number;
    cardDetails: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    };
  }): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }> {
    console.log(`💳 Processing card payment for order ${data.orderId}`);
    console.log(`   Amount: KES ${data.amount}`);

    // Basic card validation
    const cardNumber = data.cardDetails.cardNumber.replace(/\s/g, '');
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return {
        success: false,
        message: 'Invalid card number'
      };
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful payment (95% success rate)
    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      const transactionId = `CARD${Date.now()}`;
      
      this.payments.set(data.orderId, {
        transactionId,
        method: 'card',
        status: 'completed',
        amount: data.amount,
        paidAt: new Date()
      });

      return {
        success: true,
        transactionId,
        message: 'Card payment processed successfully'
      };
    } else {
      return {
        success: false,
        message: 'Card payment declined. Please check your card details or try another card.'
      };
    }
  }

  async generateBankTransferReference(data: {
    orderId: string;
    amount: number;
  }): Promise<{
    referenceNumber: string;
    bankDetails: {
      bankName: string;
      accountNumber: string;
      accountName: string;
    };
  }> {
    const referenceNumber = `REF${data.orderId.substring(0, 8).toUpperCase()}${Date.now().toString().slice(-6)}`;

    this.payments.set(data.orderId, {
      referenceNumber,
      method: 'bank',
      status: 'pending',
      amount: data.amount
    });

    return {
      referenceNumber,
      bankDetails: {
        bankName: 'KCB Bank Kenya',
        accountNumber: '1234567890',
        accountName: 'COLTECH LIMITED'
      }
    };
  }

  async verifyPayment(transactionId: string): Promise<{
    verified: boolean;
    status: 'pending' | 'completed' | 'failed';
    amount?: number;
  }> {
    // Search for payment by transaction ID
    for (const [orderId, payment] of this.payments.entries()) {
      if (payment.transactionId === transactionId) {
        return {
          verified: true,
          status: payment.status,
          amount: payment.amount
        };
      }
    }

    return {
      verified: false,
      status: 'failed'
    };
  }

  async checkPaymentStatus(orderId: string): Promise<{
    status: 'pending' | 'paid' | 'failed';
    transactionId?: string;
    paidAt?: Date;
  }> {
    const payment = this.payments.get(orderId);

    if (!payment) {
      return {
        status: 'pending'
      };
    }

    return {
      status: payment.status === 'completed' ? 'paid' : 
              payment.status === 'failed' ? 'failed' : 'pending',
      transactionId: payment.transactionId,
      paidAt: payment.paidAt
    };
  }
}