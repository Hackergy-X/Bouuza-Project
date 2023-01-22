import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { LoginPageComponent } from './components/authentications/login-page/login-page.component';
import { RegisterPageComponent } from './components/authentications/register-page/register-page.component';
import { RestItemsComponent } from './components/pages/rest-items/rest-items.component';

import { DashboardComponent  } from './admin/dashboard/dashboard.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { ModalsComponent } from './admin/modals/modals.component';
import { FormsComponent } from './admin/forms/forms.component';
import { UserPagesComponent } from './components/pages/user-pages/user-pages.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserContactComponent } from './admin/users/user-contact/user-products.component';
import { UserCommentsComponent } from './admin/users/user-comments/user-comments.component';
import { AddProductsComponent } from './admin/products/add-products/add-products.component';
import { EditDeleteProductsComponent } from './admin/products/edit-delete-products/edit-products.component';
import { EditProductsComponent } from './admin/products/edit-products/edit-products.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderAdminOrderComponent } from './admin/order-admin-order/order-admin-order.component';
import { SettingsComponent as UserSettings } from './components/settings/settings.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {path:'',component: UserPagesComponent, children:[
    {path:'home',component: HomePageComponent},
    {path:'contact',component: ContactPageComponent},
    {path:'about',component: AboutPageComponent},
    {path:'rest-items',component: RestItemsComponent},
    {path:'order-list',component: OrderListComponent},
    {path:'settings',component: UserSettings},
  ]},
  {path:'login',component: LoginPageComponent},
  {path:'register',component: RegisterPageComponent},
  {path:'admin',component: AdminDashboardComponent, children:[
    {path:'',redirectTo:'dashboard', pathMatch: 'full' },
    {path:'dashboard',component: DashboardComponent},
    {path:'products',component: AdminProductsComponent},
    {path:'settings',component: SettingsComponent},
    {path:'user-contact',component: UserContactComponent},
    {path:'user-details',component: UserCommentsComponent},
    {path:'add-products',component: AddProductsComponent},
    {path:'edit-delete-products',component: EditDeleteProductsComponent},
    {path:'edit-products/:id',component: EditProductsComponent},
    {path:'admin-order',component: OrderAdminOrderComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
