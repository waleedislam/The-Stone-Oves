import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MENU_ITEMS } from '../../data/menu.data';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})
export class DealsComponent {
  cart = inject(CartService);

  deals = MENU_ITEMS.filter(p => p.category === 'deals');
  hotItems = MENU_ITEMS.filter(p => p.isPopular || p.isBestSeller).slice(0, 4);

  addedId = signal<number | null>(null);

  addToCart(product: Product) {
    this.cart.addItem(product);
    this.addedId.set(product.id);
    setTimeout(() => this.addedId.set(null), 1800);
  }

  originalPrice(price: number): number {
    return Math.round(price * 1.22);
  }

  discountPercent(price: number): number {
    const orig = this.originalPrice(price);
    return Math.round(((orig - price) / orig) * 100);
  }

  countdown = { hours: '08', minutes: '24', seconds: '37' };
}