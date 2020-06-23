import { Component, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category: string;
  constructor(private categoryServ: CategoryService) {
    this.categories$ = this.categoryServ.getListOfCategories();
  }

}
