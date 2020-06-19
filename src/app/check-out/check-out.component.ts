import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

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
  cartSubscription: Subscription;
  userSubscription: Subscription;
  items: any[] = [];
  userId: string;

  constructor(
    private shoppingCartServ: ShoppingCartService,
    private orderServ: OrderService,
    private authServ: AuthService
  ) {

  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartServ.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
      let productIds = Object.keys(this.cart.items);
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
      this.userSubscription = this.authServ.user$.subscribe(user => {
        this.userId = user.uid;
      })
    })
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.items
    }
    this.orderServ.storeOrder(order);
  }
}
