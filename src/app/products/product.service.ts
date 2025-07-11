import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-list/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }
  delete(id: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
  getById(id: number) {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

  create(product: Product): Observable<Product> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  update(id: number, product: Product): Observable<Product> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
  }

}