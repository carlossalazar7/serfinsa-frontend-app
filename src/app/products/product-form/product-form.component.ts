import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product-list/product.model'

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html'
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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  isEdit = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getById(+id).subscribe({
        next: data => this.product = data,
        error: err => alert('No se pudo cargar el producto')
      });
    }
  }

  save() {
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
