import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  constructor(private productServ:ProductService) {
    this.products$ = this.productServ.getAll().valueChanges();
    console.log(this.products$);
  }

}
