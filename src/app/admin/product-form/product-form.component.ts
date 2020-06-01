import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$;
  product = {};

  constructor(private router:Router, private route: ActivatedRoute, private categoryServ: CategoryService, private productServ: ProductService) {
    this.categories$ = categoryServ.getListOfCategories();
    let id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.productServ.get(id).pipe(take(1)).subscribe(p => {this.product = p});
    }
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {

  }
  save(product) {
    this.productServ.create(product);
    this.router.navigate(['/admin/products']);
  }
  isNumber(num) {
    return num.value>0?true:false;
  }
  isUrl(url) {
    let re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    return re.test(url.value)?true:false;
  }
}
