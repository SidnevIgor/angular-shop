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
      console.log(items);
      this.numberOfItems = items.reduce(function(acc,val) {
        return acc + val.quantity;
      },0);
      console.log(this.numberOfItems);
    })
  }
  logout() {
    this.auth.logout();
  }
}
