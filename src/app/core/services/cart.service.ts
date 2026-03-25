import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private _items = signal<CartItem[]>([]);
  private _isOpen = signal<boolean>(false);

  // Public readable signals
  items    = this._items.asReadonly();
  isOpen   = this._isOpen.asReadonly();

  itemCount = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );

  total = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  addItem(product: Product): void {
    const current = this._items();
    const existing = current.find(i => i.product.id === product.id);

    if (existing) {
      this._items.set(
        current.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      this._items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeItem(productId: number): void {
    this._items.set(
      this._items().filter(i => i.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this._items.set(
      this._items().map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  openCart():  void { this._isOpen.set(true);  }
  closeCart(): void { this._isOpen.set(false); }
  toggleCart(): void { this._isOpen.set(!this._isOpen()); }
}