import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { Payment2Component } from './payment2/payment2.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { TabAll } from './tabs_purchase-order/_tab_all/tab_all';
import { Tab2 } from './tabs_purchase-order/_tab2/tab2';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
const routes: Routes = [

  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'home-page', component: HomepageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment2', component: Payment2Component },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'profile-user', component: ProfileUserComponent },
      {
        path: 'purchase-order', component: PurchaseOrderComponent,
        children: [

          { path: 'tab2', component: Tab2 },
        ]
      } // Thêm các route con cho 'profile' nếu cần,
      , { path: 'purchase-order-detail', component: PurchaseOrderDetailComponent },
    ]
  },
  { path: '**', redirectTo: 'home-page' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
