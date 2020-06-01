import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products;
  productKeys;
  constructor(private productServ: ProductService) {
    this.productServ.getAll().valueChanges().subscribe(arr => {
      this.products = arr;
    });
    this.productServ.getAll().snapshotChanges().pipe(
      map(actions => {
        console.log(actions);
        actions.map(a => { key: a.payload.key})
      })
    ).subscribe(item => {
      console.log(item);
    })
  }

  ngOnInit(): void {
  }

}
