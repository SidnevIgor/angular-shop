import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    return result;
  }
  getOrders() {
    return this.db.list('/orders');
  }
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  }
  getOrder(key) {
    return this.db.list('/orders/'+key);
  }
}
