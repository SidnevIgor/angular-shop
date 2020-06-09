import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';

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
  elemIsSet = true;
  constructor(private route: ActivatedRoute, private productServ:ProductService, private shoppingCartServ: ShoppingCartService) {
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.productServ.getAll().valueChanges().subscribe(prods => {
          this.products = this.elemIsSet?<Product[]>prods:this.products;
          console.log('Products array',this.products);
          this.productServ.getAll().snapshotChanges().pipe(
            map(actions => {
              actions.map(a => { key: a.payload.key})
              this.productKeys = actions;
              console.log('Product keys',this.productKeys);
            })
          ).subscribe(item => {
            this.filteredProducts = (this.category)?
            this.products.filter(p => p.category == this.category) :
            this.products;
            console.log('Filtered products',this.filteredProducts);
            if(this.elemIsSet){
              for(let i=0; i< this.products.length; i++) {
                this.products[i].key = this.productKeys[i].key;
                this.filteredProducts[i].key = this.productKeys[i].key;
              }
              this.elemIsSet = false;
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
