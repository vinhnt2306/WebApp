import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
const routes: Routes =  [

  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'home-page', component: HomepageComponent},
  { path: 'cart', component: CartComponent},
  { path: 'payment', component: PaymentComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'profile-user', component: ProfileUserComponent },
      { path: 'purchase-order', component: PurchaseOrderComponent } // Thêm các route con cho 'profile' nếu cần
    ]
  },
  { path: '**', redirectTo: 'home-page'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
