import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders;

  constructor(private orderService: OrderService) {
    orderService.getOrders().valueChanges()
    .subscribe(ords => {
      this.orders = ords;
      orderService.getOrders().snapshotChanges()
      .subscribe(ordsIds => {
        for(let i=0; i< ordsIds.length; i++) {
          this.orders[i].key = ordsIds[i].key;
        }
        console.log(this.orders);
      })
    })
  }
}
