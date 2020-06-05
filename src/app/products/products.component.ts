import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[]=[];
  filteredProducts: Product[]=[];
  categories$;
  category: string;
  constructor(private route: ActivatedRoute, private productServ:ProductService, private categoryServ: CategoryService) {
    this.productServ.getAll().valueChanges().subscribe(prods => {
      this.products = <Product[]>prods;
    })
    this.categories$ = this.categoryServ.getListOfCategories();
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category)?
      this.products.filter(p => p.category == this.category) :
      this.products;
    });
  }

}
