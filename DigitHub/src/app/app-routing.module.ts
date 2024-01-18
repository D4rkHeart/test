import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './Pages/manage-user/manage-user.component';
import { ManageProductComponent } from './Pages/manage-product/manage-product.component';
import { ManageCategoryComponent } from './Pages/manage-category/manage-category.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { LoginComponent } from './Pages/login/login.component';
import { UserRegisteredComponent } from './Pages/user-registered/user-registered.component';
import { RetrievePasswordComponent } from './Pages/retrieve-password/retrieve-password.component';
import { ModifyPasswordComponent } from './Pages/modify-password/modify-password.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { DetailProductComponent } from './Pages/detail-product/detail-product.component';
import { CartComponent } from './Pages/cart/cart.component';
import { PaymentLoaderComponent } from './Pages/payment-loader/payment-loader.component';
import { PaymentConfirmationComponent } from './Pages/payment-confirmation/payment-confirmation.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component : ManageUserComponent},
  { path: 'edit-user/:id', component : ManageUserComponent},
  { path: 'user-registered', component : UserRegisteredComponent},
  { path: 'add-product', component : ManageProductComponent},
  { path: 'edit-product/:id', component : ManageProductComponent},
  { path: 'detail-product/:id', component : DetailProductComponent},
  { path: 'add-category', component : ManageCategoryComponent},
  { path: 'edit-category/:id', component : ManageCategoryComponent},
  { path: 'retrieve-password', component : RetrievePasswordComponent},
  { path: 'modify-password', component : ModifyPasswordComponent},
  { path: 'cart', component : CartComponent},
  { path: 'payment', component : PaymentLoaderComponent},
  { path: 'confirm', component : PaymentConfirmationComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
