import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

export interface OrderDetails {
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: 'Cash on Delivery' | 'Online Payment';
}

@Injectable({ providedIn: 'root' })
export class WhatsappService {

  private readonly PHONE = '923708371275'; // ← Replace with real number
  private readonly DIRECT_CHAT = '923708371275'; // ← Same number for FAB

  sendOrder(order: OrderDetails): void {
    const itemLines = order.items
      .map(i =>
        `  • ${i.quantity}x ${i.product.name} — Rs. ${(i.product.price * i.quantity).toLocaleString()}`
      )
      .join('%0A');

    const message =
      `🍕 *New Order — The Stone Oves*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `%0A` +
      `*🛒 Order Items:*%0A` +
      `${itemLines}%0A` +
      `%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `💰 *Total: Rs. ${order.total.toLocaleString()}*%0A` +
      `%0A` +
      `📍 *Delivery Address:*%0A` +
      `  ${order.address}%0A` +
      `%0A` +
      `💳 *Payment:* ${order.paymentMethod}%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `✅ Please confirm my order. Thank you!`;

    window.open(`https://wa.me/${this.PHONE}?text=${message}`, '_blank');
  }

  openDirectChat(): void {
    window.open(`https://wa.me/${this.DIRECT_CHAT}`, '_blank');
  }
}