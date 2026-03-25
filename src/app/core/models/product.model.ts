export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pizza' | 'burger' | 'sides' | 'drinks' | 'deals';
  isPopular?: boolean;
  isBestSeller?: boolean;
  badge?: string;
}