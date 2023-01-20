import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { LoginPageComponent } from './components/authentications/login-page/login-page.component';
import { RegisterPageComponent } from './components/authentications/register-page/register-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestItemsComponent } from './components/pages/rest-items/rest-items.component';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './admin/header/header.component';
import { FooterAdminComponent } from './admin/footer/footer.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { FormsComponent } from './admin/forms/forms.component';
import { ModalsComponent } from './admin/modals/modals.component';
import { UserPagesComponent } from './components/pages/user-pages/user-pages.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserProductsComponent } from './admin/users/user-products/user-products.component';
import { UserCommentsComponent } from './admin/users/user-comments/user-comments.component';
import { AddProductsComponent } from './admin/products/add-products/add-products.component';
import { EditDeleteProductsComponent } from './admin/products/edit-delete-products/edit-products.component';
import { EditProductsComponent } from './admin/products/edit-products/edit-products.component';
import { NgToastModule } from 'ng-angular-popup';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderAdminOrderComponent } from './admin/order-admin-order/order-admin-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    ContactPageComponent,
    AboutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RestItemsComponent,
    HeaderComponent,
    FooterAdminComponent,
    DashboardComponent,
    SettingsComponent,
    FormsComponent,
    ModalsComponent,
    UserPagesComponent,
    AdminDashboardComponent,
    UserProductsComponent,
    UserCommentsComponent,
    AddProductsComponent,
    EditDeleteProductsComponent,
    EditProductsComponent,
    AdminProductsComponent,
    OrdersComponent,
    OrderListComponent,
    OrderAdminOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
