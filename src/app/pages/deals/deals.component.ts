import {
  Component, signal, inject,
  OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MENU_ITEMS } from '../../data/menu.data';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

export interface ComboItem {
  icon:  string;
  label: string;
}

export interface DealCard {
  product:       Product;
  items:         ComboItem[];
  saving:        number;
  originalPrice: number;
  discountPct:   number;
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deals.component.html',
  styleUrl:    './deals.component.scss'
})
export class DealsComponent implements OnInit, OnDestroy {

  cart     = inject(CartService);
  addedId  = signal<number | null>(null);

  hotItems  = MENU_ITEMS.filter(
    p => (p.isPopular || p.isBestSeller) && p.category !== 'deals'
  ).slice(0, 4);

  dealCards: DealCard[] = MENU_ITEMS
    .filter(p => p.category === 'deals')
    .map(p => {
      const original = Math.round(p.price * 1.25);
      const saving   = original - p.price;
      const pct      = Math.round((saving / original) * 100);
      return {
        product:       p,
        items:         this.parseCombo(p.description),
        saving,
        originalPrice: original,
        discountPct:   pct
      };
    });

  // ── Live countdown to midnight ────────────────────────
  hours   = signal('00');
  minutes = signal('00');
  seconds = signal('00');
  private timerRef: any;

  ngOnInit() {
    this.tick();
    this.timerRef = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  private tick() {
    const now      = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = Math.max(
      0,
      Math.floor((midnight.getTime() - now.getTime()) / 1000)
    );
    this.hours.set(  String(Math.floor(diff / 3600)).padStart(2,'0'));
    this.minutes.set(String(Math.floor((diff % 3600) / 60)).padStart(2,'0'));
    this.seconds.set(String(diff % 60).padStart(2,'0'));
  }

  // ── Parse "A + B + C" into icon+label pairs ───────────
  private parseCombo(description: string): ComboItem[] {
    const map: { key: string; icon: string }[] = [
      { key: 'pizza',  icon: '🍕' },
      { key: 'burger', icon: '🍔' },
      { key: 'wing',   icon: '🍗' },
      { key: 'fries',  icon: '🍟' },
      { key: 'bread',  icon: '🥖' },
      { key: 'drink',  icon: '🥤' },
    ];

    return description.split('+').map(part => {
      const label = part.trim();
      const lower = label.toLowerCase();
      const match = map.find(m => lower.includes(m.key));
      return { icon: match ? match.icon : '🍽️', label };
    });
  }

  addToCart(product: Product) {
    if (this.addedId() === product.id) return;
    this.cart.addItem(product);
    this.addedId.set(product.id);
    setTimeout(() => this.addedId.set(null), 2000);
  }

  trackById(_: number, d: DealCard) { return d.product.id; }
  trackByHot(_: number, p: Product)  { return p.id; }
}