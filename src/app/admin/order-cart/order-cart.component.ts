import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Shipping } from '../../models/shipping';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  orderId: string;
  cart$;
  items: Order;
  shipping: any = {
    name: '',
    city: '',
    addressLine1: '',
    addressLine2: ''
  };
  totalPrice = 0;

  constructor(private router:Router,
              private route: ActivatedRoute,
              private ordServ: OrderService, private shoppingCartServ: ShoppingCartService) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.ordServ.getOrder(this.orderId).valueChanges().subscribe((ord) => {
      this.items = ord[1];
      this.shipping = ord[2];
      console.log('Items: ', this.items);
      console.log('Shipping details: ', this.shipping);
      this.shoppingCartServ.getCart().then(cart => {
        cart.valueChanges().subscribe(ct => {
          this.cart$ = ct;
        })
      })
    })
  }

  ngOnInit(): void {

  }

  save(form) {

  }
  removeFromCart(item) {

  }
  addToCart(item) {

  }
}
