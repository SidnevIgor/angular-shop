import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.authService.user$.subscribe(usr => {
      let user = usr;
      this.orders$ = this.orderService.getOrdersByUser(user.uid).valueChanges();
    })
  }
}
