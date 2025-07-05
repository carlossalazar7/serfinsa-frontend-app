import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class ProductListComponent {
  products: Product[] = [];

  private productService = inject(ProductService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: data => this.products = data,
      error: () => alert('Error al cargar productos')
    });
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => this.products = this.products.filter(p => p.id !== id),
        error: () => alert('Error al eliminar producto')
      });
    }
  }

  isAdmin(): boolean {
    const token = this.auth.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.role?.includes('ADMIN');
  }

  
}
