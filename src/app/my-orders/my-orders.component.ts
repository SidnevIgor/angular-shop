import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
//import 'rxjs/operator/switchMap';

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
      console.log(this.orders$);
    })
  }
}
