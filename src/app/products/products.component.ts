import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[]=[];
  filteredProducts: Product[]=[];
  productKeys: any[];
  category: string;
  constructor(private route: ActivatedRoute, private productServ:ProductService) {


      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.productServ.getAll().valueChanges().subscribe(prods => {
          this.products = <Product[]>prods;
          this.productServ.getAll().snapshotChanges().pipe(
            map(actions => {
              actions.map(a => { key: a.payload.key})
              this.productKeys = actions;
            })
          ).subscribe(item => {
            this.filteredProducts = (this.category)?
            this.products.filter(p => p.category == this.category) :
            this.products;
            for(let i=0; i< this.products.length; i++) {
              this.products[i].key = this.productKeys[i].key;
              this.filteredProducts[i].key = this.productKeys[i].key;
            }
          })
      });
    })
  }
}
