import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home',   path: '/'       },
    { label: 'Menu',   path: '/menu'   },
    { label: 'Deals',  path: '/deals'  },
    { label: 'About',  path: '/about'  },
  ];

  menuHighlights = [
    { label: 'Stone-Fired Pizzas', path: '/menu' },
    { label: 'Smash Burgers',      path: '/menu' },
    { label: 'Volcano Fries',      path: '/menu' },
    { label: 'Family Feast Deal',  path: '/deals'},
    { label: 'Date Night Duo',     path: '/deals'},
  ];

  contactInfo = [
    { icon: '📍', text: 'Main Boulevard, Faisalabad, Punjab' },
    { icon: '📞', text: '+92 300 123 4567'                   },
    { icon: '🕐', text: 'Mon–Sun: 12 PM – 1 AM'             },
    { icon: '🛵', text: 'Free delivery above Rs. 1500'       },
  ];
}