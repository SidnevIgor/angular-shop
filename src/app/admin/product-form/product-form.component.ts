import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoryServ: CategoryService, private productServ: ProductService) {
    this.categories$ = categoryServ.getListOfCategories();
  }
  ngOnInit(): void {
  }
  save(product) {
    this.productServ.create(product);
  }
  isNumber(num) {
    return num.value>0?true:false;
  }
  isUrl(url) {
    let re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    return re.test(url.value)?true:false;
  }
}
