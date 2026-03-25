import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, signal, inject
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

  cart    = inject(CartService);
  el      = inject(ElementRef);

  isFlipped  = signal(false);
  justAdded  = signal(false);
  rotateX    = signal(0);
  rotateY    = signal(0);
  glowX      = signal(50);
  glowY      = signal(50);

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const rect = this.el.nativeElement
      .querySelector('.card-inner')
      .getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    this.rotateY.set( dx * 12);
    this.rotateX.set(-dy * 12);
    this.glowX.set(((e.clientX - rect.left) / rect.width)  * 100);
    this.glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.rotateX.set(0);
    this.rotateY.set(0);
    this.glowX.set(50);
    this.glowY.set(50);
    this.isFlipped.set(false);
  }

  flipCard()   { this.isFlipped.update(v => !v); }

  addToCart(e: Event) {
    e.stopPropagation();
    this.cart.addItem(this.product);
    this.addedToCart.emit(this.product);
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1800);
  }

  get cardStyle() {
    return {
      transform: `perspective(1000px)
        rotateX(${this.rotateX()}deg)
        rotateY(${this.rotateY()}deg)`,
      transition: (this.rotateX() === 0 && this.rotateY() === 0)
        ? 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
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