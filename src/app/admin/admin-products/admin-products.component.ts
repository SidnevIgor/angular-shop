import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products;
  constructor(private productServ: ProductService) {
    this.productServ.getAll().valueChanges().subscribe(arr => {
      this.products = arr;
    })
  }

  ngOnInit(): void {
  }

}
