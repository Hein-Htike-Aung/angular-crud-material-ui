import { Product } from './dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  postProduct(data: Product) {
    return this.http.post<Product>(`${API}/productList`, data);
  }

  getProducts() {
    return this.http.get<Product[]>(`${API}/productList`);
  }

  putProduct(data: Product) {
    return this.http.put<Product>(`${API}/productList/${data.id}`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${API}/productList/${id}`);
  }
}
