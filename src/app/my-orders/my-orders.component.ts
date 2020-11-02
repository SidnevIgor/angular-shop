import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.authService.user$.subscribe(usr => {
      let user = usr;
      this.orderService.getOrdersByUser(user.uid).valueChanges()
      .subscribe(ords => {
        this.orders = ords;
        orderService.getOrders().snapshotChanges()
        .subscribe(ordsIds => {
          for(let i=0; i< ordsIds.length; i++) {
            this.orders[i].key = ordsIds[i].key;
          }
        });
      });
    })
  }
}
