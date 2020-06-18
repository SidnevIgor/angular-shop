import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingCartServ: ShoppingCartService) {

  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartServ.getCart();
    this.subscription = cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  placeOrder() {
    let order = {
      datePlaced: new Date().getTime,
      shipping: this.shipping,

    }
  }
}
