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
  items: any;
  shipping: any = {
    name: '',
    city: '',
    addressLine1: '',
    addressLine2: ''
  };
  totalPrice: number = 0;

  constructor(private router:Router,
              private route: ActivatedRoute,
              private ordServ: OrderService, private shoppingCartServ: ShoppingCartService) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.ordServ.getOrder(this.orderId).valueChanges().subscribe((ord) => {
      this.items = ord[1];
      this.shipping = ord[2];
      for(let i=0; i< this.items.length; i++) {
        if(this.items[i].quantity>0) {
          this.totalPrice += this.items[i].quantity*this.items[i].product.price;
        }
      }
      console.log('Items: ', this.items);
      console.log('Shipping details: ', this.shipping);
    })
  }
  ngOnInit(): void {

  }
  save(form) {

  }
  removeFromCart(item) {
    item.quantity--;
  }
  addToCart(item) {
    item.quantity++;
  }
}
