import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';

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
  clearCartSubscription: Subscription;
  items: any[] = [];
  userId: string;

  constructor(
    private router: Router,
    private shoppingCartServ: ShoppingCartService,
    private orderServ: OrderService,
    private authServ: AuthService
  ) {

  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartServ.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
      this.userSubscription = this.authServ.user$.subscribe(user => {
        this.userId = user.uid;
      })
    })
  }
  ngOnDestroy() {
    console.log('DESTROYED STARTED');
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    if(this.clearCartSubscription) {
      this.clearCartSubscription.unsubscribe(); //this one does not work
      console.log('DESTROYED FINISHED');
    }
  }
  async placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderServ.placeOrder(order);
    this.router.navigate(['order-success',result.key]);
  }
}
