import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[];
  productKeys: any[];

  constructor(private productServ: ProductService) {

    this.productServ.getAll().valueChanges().subscribe(arr => {
      this.products = arr;
      this.productServ.getAll().snapshotChanges().pipe(
        map(actions => {
          actions.map(a => { key: a.payload.key})
          this.productKeys = actions;
        })
      ).subscribe(item => {
        for(let i=0; i< this.products.length; i++) {
          this.products[i].key = this.productKeys[i].key;
        }
      })
    });
  }

  ngOnInit(): void {
  }

}
