import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  numberOfItems: number;
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
