import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Shipping } from '../../models/shipping';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private router:Router,
              private route: ActivatedRoute,
              private ordServ: OrderService,
              private shoppingCartServ: ShoppingCartService,
              private db: AngularFireDatabase) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.ordServ.getOrder(this.orderId).valueChanges().subscribe((ord) => {
      this.items = ord[1];
      this.shipping = ord[2];
    })
  }
  ngOnInit(): void {

  }
  save(form) {
    this.db.object('/orders/'+this.orderId+'/shipping').update(this.shipping);
    this.db.object('/orders/'+this.orderId+'/items').update(this.items);
  }
  remove() {
    if(!confirm('Are you sure you want to delete the product')) {
      return;
    }
    else {
      this.db.object('/orders/'+this.orderId).remove();
      this.router.navigate(['/admin/orders']);
    }
  }
  removeFromCart(item) {
    item.quantity--;
    item.totalPrice = item.quantity*item.product.price;
  }
  addToCart(item) {
    item.quantity++;
    item.totalPrice = item.quantity*item.product.price;
  }
}
