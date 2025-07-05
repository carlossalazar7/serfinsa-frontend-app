import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product.service';
import { Product } from './product.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => (this.products = data),
      error: () => (this.error = 'Error al cargar los productos')
    });
  }
}
