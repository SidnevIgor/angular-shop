import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$;
  product = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };
  id;

  constructor(private router:Router, private route: ActivatedRoute, private categoryServ: CategoryService, private productServ: ProductService) {
    this.categories$ = categoryServ.getListOfCategories();
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productServ.get(this.id).subscribe(p => {
        console.log(p);
        this.product.title = p[3].toString();
        this.product.price = p[2].toString();
        this.product.category = p[0].toString();
        this.product.imageUrl = p[1].toString();
        console.log(this.product);
      });
    }
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
  }
  save(product) {
    if(this.id) {
      this.productServ.update(this.id,product);
    }
    else {
      this.productServ.create(product);
    }
    this.router.navigate(['/admin/products']);
  }
  isNumber(num) {
    return num.value>0?true:false;
  }
  isUrl(url) {
    let re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    return re.test(url.value)?true:false;
  }
  delete() {
    if(!confirm('Are you sure you want to delete the product')) {
      return;
    }
    else {
      this.productServ.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
