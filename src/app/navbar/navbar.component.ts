import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { faLeaf, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  numberOfItems: number;
  faLeaf = faLeaf;
  faShoppingCart = faShoppingCart;
  constructor(public auth: AuthService, private shoppingCartServ: ShoppingCartService) {

  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartServ.getCart();
    let items: ShoppingCartItem[];
    cart$.valueChanges().subscribe(cart => {
      items = (<ShoppingCart>cart).items;
      this.numberOfItems = 0;
      for(let productId in items) {
        this.numberOfItems+=items[productId].quantity;
      }
    })
  }
  logout() {
    this.auth.logout();
  }
}
