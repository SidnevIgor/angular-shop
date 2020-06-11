import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  constructor(private shoppingCartServ: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await (await this.shoppingCartServ.getCart()).valueChanges();
  }

}
