import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  dateCreated: number;
  items: ShoppingCartItem[];
}
