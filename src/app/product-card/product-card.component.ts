import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart;
  constructor(private shoppingCartServ: ShoppingCartService) {
  }
  addToCart(product: Product) {
    this.shoppingCartServ.addToCart(product);
  }
  getQuantity() {
    if(!this.shoppingCart) return 0;
    else {
      let item = this.shoppingCart.items[this.product.key];
      return item? item.quantity: 0;
    }
  }
}
