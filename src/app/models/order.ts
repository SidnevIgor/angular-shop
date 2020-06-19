import { ShoppingCart } from './shopping-cart';

export class Order {
  items: any[];
  datePlaced: number;

  constructor(public userId: string, public shipping:any,shoppingCart: ShoppingCart ) {
    this.datePlaced = new Date().getTime();
    
  }
}
