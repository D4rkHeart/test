import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackendApiService } from './services/backend-api.service';
import { AccountButtonComponent } from './buttons/account-button/account-button.component';
import { CrossButtonComponent } from './buttons/cross-button/cross-button.component';
import { BackToHomeButtonComponent } from './buttons/back-to-home-button/back-to-home-button.component';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginButtonComponent } from './buttons/login-button/login-button.component';
import { LogoutButtonComponent } from './buttons/logout-button/logout-button.component'
import { TokenInterceptor } from './http-interceptor/token-interceptor';
import { SignInButtonComponent } from './buttons/sign-in-button/sign-in-button.component';
import { ManageUserComponent } from './Pages/manage-user/manage-user.component';
import { DatePipe } from '@angular/common';
import { ManageProductComponent } from './Pages/manage-product/manage-product.component';
import { SaveProductButtonComponent } from './buttons/save-product-button/save-product-button.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ManageCategoryComponent } from './Pages/manage-category/manage-category.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { LoginComponent } from './Pages/login/login.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { UserRegisteredComponent } from './Pages/user-registered/user-registered.component';
import { RetrievePasswordComponent } from './Pages/retrieve-password/retrieve-password.component';
import { ModifyPasswordComponent } from './Pages/modify-password/modify-password.component';
import { DetailProductComponent } from './Pages/detail-product/detail-product.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './Pages/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import { PaymentLoaderComponent } from './Pages/payment-loader/payment-loader.component';
import { PaymentConfirmationComponent } from './Pages/payment-confirmation/payment-confirmation.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    PageNotFoundComponent,
    AccountButtonComponent,
    AccountButtonComponent,
    CrossButtonComponent,
    BackToHomeButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignInButtonComponent,
    ManageUserComponent,
    UserRegisteredComponent,
    ManageProductComponent,
    SaveProductButtonComponent,
    RetrievePasswordComponent,
    ModifyPasswordComponent,
    ManageCategoryComponent,
    DetailProductComponent,
    CartComponent,
    PaymentLoaderComponent,
    PaymentConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    BackendApiService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
