import { ShoppingCart } from './shopping-cart';

export class Order {
  items: any[] = [];
  datePlaced: number;

  constructor(public userId: string, public shipping:any,shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    let productIds = Object.keys(shoppingCart.items);
    for(let productId of productIds) {
      if(shoppingCart.items[productId].quantity>0){
        this.items.push({
          product: {
            title: shoppingCart.items[productId].product.title,
            imageUrl: shoppingCart.items[productId].product.imageUrl,
            price: shoppingCart.items[productId].product.price
          },
          quantity: shoppingCart.items[productId].quantity,
          totalPrice: shoppingCart.items[productId].quantity*shoppingCart.items[productId].product.price
        });
      }
    }
  }
}
