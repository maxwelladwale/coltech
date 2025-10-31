// lib/api/implementations/laravel/LaravelProductService.ts

import type { IProductService, IProduct, IMDVRProduct, ICamera, IPackage } from '../../interfaces/types';

export class LaravelProductService implements IProductService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    console.log("LaravelProductService BASE URL", this.baseUrl);
  }

  async getProducts(filters?: {
    category?: string;
    search?: string;
    in_stock?: boolean;
  }): Promise<IProduct[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.in_stock !== undefined) params.append('inStock', filters.in_stock.toString());

    const response = await fetch(`${this.baseUrl}/products?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    
    return response.json();
  }

  async getProductById(id: number): Promise<IProduct> {
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    console.log("GET PRODUCT RESPONSE", response);
    if (!response.ok) throw new Error('Product not found');
    
    return response.json();
  }

  async getMDVRProducts(): Promise<IMDVRProduct[]> {
    const response = await fetch(`${this.baseUrl}/products/mdvrs`);
    if (!response.ok) throw new Error('Failed to fetch MDVRs');
    
    return response.json();
  }

  async getCameras(): Promise<ICamera[]> {
    const response = await fetch(`${this.baseUrl}/products/cameras`);
    if (!response.ok) throw new Error('Failed to fetch cameras');
    
    return response.json();
  }

  async searchProducts(query: string): Promise<IProduct[]> {
    const response = await fetch(`${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    
    return response.json();
  }

  async checkStock(productId: string): Promise<{ available: boolean; quantity: number }> {
    const response = await fetch(`${this.baseUrl}/products/${productId}/stock`);
    if (!response.ok) throw new Error('Failed to check stock');
    
    return response.json();
  }

  async getRecommendedPackages(): Promise<IPackage[]> {
    const response = await fetch(`${this.baseUrl}/packages`);
    if (!response.ok) throw new Error('Failed to fetch packages');
    
    return response.json();
  }
}