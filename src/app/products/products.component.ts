import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(private productServ:ProductService, private categoryServ: CategoryService) {
    this.products$ = this.productServ.getAll().valueChanges();
    this.categories$ = this.categoryServ.getListOfCategories();
  }

}
