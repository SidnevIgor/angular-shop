import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[]=[];
  filteredProducts: Product[]=[];
  productKeys: any[];
  category: string;
  cart: any;
  subscription: any;

  constructor(private route: ActivatedRoute, private productServ:ProductService, private shoppingCartServ: ShoppingCartService) {
    this.route.queryParamMap.subscribe(params => {
      this.productServ.getAll().valueChanges().subscribe(prods => {
      this.products = <Product[]>prods;
      this.productServ.getAll().snapshotChanges().pipe(
        map(actions => {
          actions.map(a => { key: a.payload.key})
          this.productKeys = actions;
        })
      ).subscribe(item => {
        this.filteredProducts = this.products;
        for(let i=0; i< this.products.length; i++) {
          this.products[i].key = this.productKeys[i].key;
          this.filteredProducts[i].key = this.productKeys[i].key;
        }
        this.category = params.get('category');
          if(this.category) {
            this.filteredProducts = this.products.filter(val => val.category === this.category);
          }
        })
      });
    })
  }
  async ngOnInit() {
    this.subscription = (await (await this.shoppingCartServ.getCart()).valueChanges()).subscribe(cart => {
      this.cart = cart;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
