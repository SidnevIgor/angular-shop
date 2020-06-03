import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[];
  productKeys: any[];
  filteredProducts: Product[];

  constructor(private productServ: ProductService) {

    this.productServ.getAll().valueChanges().subscribe(arr => {
      this.filteredProducts = this.products = <Product[]>arr;
      this.productServ.getAll().snapshotChanges().pipe(
        map(actions => {
          actions.map(a => { key: a.payload.key})
          this.productKeys = actions;
        })
      ).subscribe(item => {
        for(let i=0; i< this.products.length; i++) {
          this.products[i].key = this.productKeys[i].key;
          this.filteredProducts[i].key = this.productKeys[i].key;
        }
      })
    });
  }

  ngOnInit(): void {
  }
  filter(query: string) {
    this.filteredProducts = (query)? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }
}
