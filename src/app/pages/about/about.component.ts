import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  values = [
    {
      icon: '🔥',
      title: 'Stone-Fired Passion',
      desc: 'Every item goes through our 450°C stone oven. No shortcuts, no compromises, ever.'
    },
    {
      icon: '🌿',
      title: '100% Halal',
      desc: 'Certified halal meat, fresh local produce, imported Italian tomatoes. Always.'
    },
    {
      icon: '⚡',
      title: 'Speed & Freshness',
      desc: 'From oven to your door in under 30 minutes. Hot, fresh, never reheated.'
    },
    {
      icon: '❤️',
      title: 'Community First',
      desc: 'Born in Faisalabad, built for Faisalabad. Every order supports local suppliers.'
    }
  ];

  team = [
    {
      name: 'Chef Usman',
      role: 'Head Chef & Founder',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
      quote: 'Food is love made visible.'
    },
    {
      name: 'Chef Bilal',
      role: 'Pizza Specialist',
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80',
      quote: 'The crust is everything.'
    },
    {
      name: 'Sana',
      role: 'Operations Lead',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      quote: 'Fast delivery, happy hearts.'
    }
  ];

  stats = [
    { value: '3+',   label: 'Years of Craft'    },
    { value: '2K+',  label: 'Happy Customers'   },
    { value: '50+',  label: 'Menu Items'        },
    { value: '4.9★', label: 'Average Rating'    },
  ];
}