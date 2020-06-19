import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  cart: ShoppingCart;
  subscription: Subscription;
  items: any[] = [];

  constructor(private shoppingCartServ: ShoppingCartService, private orderServ: OrderService) {

  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartServ.getCart();
    this.subscription = cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
      console.log('Cart: ',this.cart);
      let productIds = Object.keys(this.cart.items);
      console.log('Product IDs:', productIds);
      for(let productId of productIds) {
        if(this.cart.items[productId].quantity>0){
          this.items.push({
            product: {
              title: this.cart.items[productId].product.title,
              imageUrl: this.cart.items[productId].product.imageUrl,
              price: this.cart.items[productId].product.price
            },
            quantity: this.cart.items[productId].quantity,
            totalPrice: this.cart.items[productId].quantity*this.cart.items[productId].product.price
          });
        }
      }
      console.log(this.items);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  placeOrder() {
    let order = {
      datePlaced: new Date().getTime,
      shipping: this.shipping,
      items: this.items
    }
    this.orderServ.storeOrder(order);
  }
}
