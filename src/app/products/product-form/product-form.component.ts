import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product-list/product.model'

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProductFormComponent {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    type: ''
  };

  isEdit = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getById(+id).subscribe({
        next: data => this.product = data,
        error: () => alert('No se pudo cargar el producto')
      });
    }
  }

  save() {
    if (this.product.price < 0 || this.product.stock < 0) {
      alert('Precio y stock no pueden ser negativos.');
      return;
    }

    if (this.isEdit) {
      this.productService.update(this.product.id!, this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => alert('Error al actualizar')
      });
    } else {
      this.productService.create(this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => alert('Error al crear')
      });
    }
  }
}
