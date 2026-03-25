import {
  Component, inject, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { WhatsappService } from '../../../core/services/whatsapp.service';

type Step = 'cart' | 'checkout';
type Payment = 'Cash on Delivery' | 'Online Payment';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl:    './cart-sidebar.component.scss'
})
export class CartSidebarComponent {
  cart      = inject(CartService);
  whatsapp  = inject(WhatsappService);

  step      = signal<Step>('cart');
  address   = signal('');
  payment   = signal<Payment>('Cash on Delivery');
  placing   = signal(false);
  addrError = signal(false);

  savings = computed(() =>
    Math.round(this.cart.total() * 0.05)
  );

  goCheckout() { this.step.set('checkout'); }
  goBack()     { this.step.set('cart');     }

  close() {
    this.cart.closeCart();
    setTimeout(() => {
      this.step.set('cart');
      this.address.set('');
      this.addrError.set(false);
    }, 400);
  }

  setPayment(p: Payment) { this.payment.set(p); }

  placeOrder() {
    if (!this.address().trim()) {
      this.addrError.set(true);
      return;
    }
    this.addrError.set(false);
    this.placing.set(true);

    setTimeout(() => {
      this.whatsapp.sendOrder({
        items:         this.cart.items(),
        total:         this.cart.total(),
        address:       this.address(),
        paymentMethod: this.payment()
      });
      this.placing.set(false);
      this.cart.clearCart();
      this.close();
    }, 1200);
  }

  increment(id: number, qty: number) {
    this.cart.updateQuantity(id, qty + 1);
  }

  decrement(id: number, qty: number) {
    this.cart.updateQuantity(id, qty - 1);
  }
}