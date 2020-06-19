import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { ShoppingCart } from './models/shopping-cart';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  async getCart(): Promise<AngularFireObject<ShoppingCart>> { //added specific return type
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }
  private getItem(cartId: string, productKey: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }
  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if(item) {
        item$.update({ quantity: item.quantity + 1 });
      }
      else {
        item$.set({product: product, quantity: 1});
      }
    });
  }
  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if(item) {
        item$.update({ quantity: item.quantity - 1 });
      }
      else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return (await (await this.getCart()).valueChanges()).subscribe(val => {
      let cart = val;
      let items = cart.items;
      let productIds = Object.keys(items);
      for(let productId of productIds){
        let item$ = this.getItem(cartId, productId);
        item$.valueChanges().pipe(take(1)).subscribe(item => {
          if(item) {
            item$.update({ quantity: 0 });
          }
        });
      }
    })
  }
}
