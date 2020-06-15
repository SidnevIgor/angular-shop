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

  cart$:any;
  numberOfItems: number;
  subscription: any;
  constructor(private shoppingCartServ: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await (await this.shoppingCartServ.getCart()).valueChanges()).subscribe(cart => {
      this.cart$ = cart;
    });
    let items: ShoppingCartItem[];
    this.cart$.valueChanges().subscribe(cart => {
      items = (<ShoppingCart>cart).items;
      this.numberOfItems = 0;
      for(let productId in items) {
        this.numberOfItems+=items[productId].quantity;
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getProductIds() {
    return Object.keys(this.cart$.items);
  }
}
