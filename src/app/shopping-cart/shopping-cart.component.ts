import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$:ShoppingCart;
  numberOfItems: number;
  subscription: any;
  clearSubscription: any;
  productIds: any[];
  totalPrice: number;
  constructor(private shoppingCartServ: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await (await this.shoppingCartServ.getCart()).valueChanges()).subscribe(cart => {
      this.cart$ = cart;
      let items: ShoppingCartItem[];
      items = (<ShoppingCart>cart).items;
      this.numberOfItems = 0;
      this.totalPrice = 0;
      for(let productId in items) {
        this.numberOfItems+=items[productId].quantity;
        if(items[productId].quantity>0){
          this.totalPrice+=items[productId].product.price * items[productId].quantity;
        }
      }
      this.getProductIds();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if(this.clearSubscription){
      this.clearSubscription.unsubscribe();
    }
  }
  getProductIds() {
    this.productIds = Object.keys(this.cart$.items);
  }
  clearCart() {
    this.shoppingCartServ.clearCart().then(subs => {
      this.clearSubscription = subs;
    })
  }
}
