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
    let userId = this.authService.user$;
    //this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }
}
