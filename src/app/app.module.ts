//standard modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//components
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { OrderCartComponent } from './admin/order-cart/order-cart.component';
//services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    OrderCartComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path:'',component: ProductsComponent},
      {path:'products',component: ProductsComponent},
      {path:'shopping-cart',component: ShoppingCartComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},

      {path:'check-out',component:CheckOutComponent, canActivate: [AuthGuardService]},
      {path:'my/orders/:id',component:OrderCartComponent, canActivate: [AuthGuardService]},
      {path:'my/orders',component:MyOrdersComponent, canActivate: [AuthGuardService]},
      {path:'order-success/:id',component:OrderSuccessComponent, canActivate: [AuthGuardService]},

      {path:'admin/products/new',component:ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path:'admin/products/:id',component:ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path:'admin/products',component:AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path:'admin/orders/:id',component: OrderCartComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path:'admin/orders',component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]}
    ]),
    NgbModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
