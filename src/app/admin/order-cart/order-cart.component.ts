import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Shipping } from '../../models/shipping';

@Component({
  selector: 'order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  items: Order;
  shipping: any;

  constructor(private router:Router, private route: ActivatedRoute, private ordServ: OrderService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.ordServ.getOrder(id).valueChanges().subscribe((ord) => {
      console.log('Cart: ', ord);
      this.items = ord[1];
      this.shipping = ord[2];
      console.log('Items: ', this.items);
      console.log('Shipping details: ', this.shipping);
    })
  }

  ngOnInit(): void {

  }

}
