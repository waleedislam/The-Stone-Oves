import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, signal, inject, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addedToCart = new EventEmitter<Product>();

  cart      = inject(CartService);
  el        = inject(ElementRef);
  zone      = inject(NgZone);

  isFlipped  = signal(false);
  justAdded  = signal(false);
  rotateX    = signal(0);
  rotateY    = signal(0);
  glowX      = signal(50);
  glowY      = signal(50);
  isHovered  = signal(false);

  // ── Mouse tilt (desktop only) ──────────────────────
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (window.innerWidth < 768) return;
    const inner = this.el.nativeElement.querySelector('.card-inner');
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);

    this.rotateY.set( dx * 10);
    this.rotateX.set(-dy * 10);
    this.glowX.set(((e.clientX - rect.left) / rect.width)  * 100);
    this.glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
    this.isHovered.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.rotateX.set(0);
    this.rotateY.set(0);
    this.glowX.set(50);
    this.glowY.set(50);
    this.isHovered.set(false);
  }

  // ── Flip toggle ────────────────────────────────────
  flipCard(e: Event) {
    e.stopPropagation();
    this.isFlipped.update(v => !v);
  }

  // ── Add to cart — works from BOTH faces ────────────
  addToCart(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    if (this.justAdded()) return; // debounce

    this.cart.addItem(this.product);
    this.addedToCart.emit(this.product);
    this.justAdded.set(true);

    // If triggered from back face → flip back after 700ms
    if (this.isFlipped()) {
      setTimeout(() => this.isFlipped.set(false), 700);
    }

    // Reset justAdded after animation
    setTimeout(() => this.justAdded.set(false), 2000);
  }

  // ── Styles ─────────────────────────────────────────
  get tiltStyle() {
    const settling = this.rotateX() === 0 && this.rotateY() === 0;
    return {
      transform: `perspective(1000px)
        rotateX(${this.rotateX()}deg)
        rotateY(${this.rotateY()}deg)`,
      transition: settling
        ? 'transform 0.55s cubic-bezier(0.23,1,0.32,1)'
        : 'transform 0.08s linear'
    };
  }

  get glowStyle() {
    return {
      background: `radial-gradient(circle at
        ${this.glowX()}% ${this.glowY()}%,
        rgba(245,166,35,0.18) 0%,
        rgba(192,57,43,0.10) 40%,
        transparent 70%)`
    };
  }
}