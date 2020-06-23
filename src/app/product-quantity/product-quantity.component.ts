import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input() shoppingCart;

  constructor(private shoppingCartServ: ShoppingCartService) {
  }

  addToCart(product: Product) {
    this.shoppingCartServ.addToCart(product);
  }
  removeFromCart(product: Product) {
    this.shoppingCartServ.removeFromCart(product);
  }
  getQuantity() {
    if(!this.shoppingCart) return 0;
    else {
      let item = this.shoppingCart.items[this.product.key];
      return item? item.quantity: 0;
    }
  }

}
