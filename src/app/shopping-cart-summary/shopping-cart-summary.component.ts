import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  cart: ShoppingCart;
  numberOfItems: number = 0;
  productIds: any[];
  totalPrice: number = 0;

  constructor(private shoppingCartServ: ShoppingCartService) { }

  async ngOnInit() {
    (await (await this.shoppingCartServ.getCart()).valueChanges()).subscribe(cart => {
      this.cart = cart;
      this.productIds = Object.keys(this.cart.items);
      console.log(this.productIds);
      let items: ShoppingCartItem[];
      items = (<ShoppingCart>this.cart).items;
      for(let productId in items) {
        this.numberOfItems+=items[productId].quantity;
        if(items[productId].quantity>0){
          this.totalPrice+=items[productId].product.price * items[productId].quantity;
        }
      }
      console.log('Quantity', this.totalPrice);
    });
  }
}
