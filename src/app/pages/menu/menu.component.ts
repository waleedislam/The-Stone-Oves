import {
  Component, OnInit, AfterViewInit,
  HostListener, signal, computed, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { MENU_ITEMS } from '../../data/menu.data';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CartService } from '../../core/services/cart.service';

type Category = 'all' | 'pizza' | 'burger' | 'sides' | 'drinks';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {

  cart = inject(CartService);

  activeCategory = signal<Category>('all');
  spotlightX     = signal(0);
  spotlightY     = signal(0);
  showSpotlight  = signal(false);
  toastProduct   = signal<string | null>(null);

  categories: { key: Category; label: string; icon: string }[] = [
    { key: 'all',    label: 'All Items', icon: '🍽️' },
    { key: 'pizza',  label: 'Pizzas',    icon: '🍕' },
    { key: 'burger', label: 'Burgers',   icon: '🍔' },
    { key: 'sides',  label: 'Sides',     icon: '🍟' },
    { key: 'drinks', label: 'Drinks',    icon: '🥤' },
  ];

  filteredItems = computed<Product[]>(() => {
    const cat = this.activeCategory();
    return cat === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(p => p.category === cat);
  });

  // ← Computed so template can use it safely
  activeCategoryLabel = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return 'All Items';
    return this.categories.find(c => c.key === cat)?.label ?? '';
  });

  ngOnInit() {}

  ngAfterViewInit() {
    this.observeCards();
  }

  setCategory(cat: Category) {
    this.activeCategory.set(cat);
    setTimeout(() => this.observeCards(), 80);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.spotlightX.set(e.clientX);
    this.spotlightY.set(e.clientY);
    this.showSpotlight.set(true);
  }

  @HostListener('mouseleave')
  onLeave() { this.showSpotlight.set(false); }

  private observeCards() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.card-observe')
      .forEach(el => observer.observe(el));
  }

  onAddedToCart(product: Product) {
    this.toastProduct.set(product.name);
    setTimeout(() => this.toastProduct.set(null), 2500);
  }

  trackById(_: number, p: Product) { return p.id; }

  get spotlightStyle() {
    return {
      left:    this.spotlightX() + 'px',
      top:     this.spotlightY() + 'px',
      opacity: this.showSpotlight() ? 1 : 0
    };
  }
}