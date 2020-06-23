import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {

  clearCartSubscription: Subscription;
  constructor(private shoppingCartServ: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartServ.clearCart().then(subs => {
      this.clearCartSubscription = subs;
    })
  }
  ngOnDestroy() {
    this.clearCartSubscription.unsubscribe();
  }
}
