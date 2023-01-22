import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl: string = 'http://localhost:8080/bouuza/';
  users: any;
  isFinded = false;



  constructor(private http: HttpClient,
    private router: Router,
    private ngToastService: NgToastService
  ) { }

  getUsers(email: string, password: string) {
    let getusers = this.http.get<any>(this.baseUrl + 'user_view.php');
    getusers.subscribe((data: any) => {
      this.users = data.output;
      this.users.forEach((user: any) => {
        if (user.email === email && user.password === password) {
          if (user.isadmin == 1) {
            localStorage.setItem('userDetails', JSON.stringify(user));
            this.isFinded = true;
            this.ngToastService.success({detail:"SUCCESS",summary:'login successfully',duration:5000});
            this.router.navigate(['/admin']);
          } else {
            localStorage.setItem('userDetails', JSON.stringify(user));
            this.isFinded = true;
            this.ngToastService.success({detail:"SUCCESS",summary:'login successfully',duration:5000});
            this.router.navigate(['/home']);
          }
        }
      });
      if (!this.isFinded) {
        this.ngToastService.error({detail:"ERROR",summary:'Invalid email or password !!',duration:3000});
      }
    }
    );
  }


  createUser(user: any) {
    let getRegisterUser = this.http.post(this.baseUrl + 'user_insert.php', user);
    getRegisterUser.subscribe((data: any) => {
      localStorage.setItem('userDetails', JSON.stringify(user));
      this.ngToastService.success({detail:"SUCCESS",summary:'User created successfully',duration:5000});
      this.router.navigate(['/home']);
    }, (error: any) => {
      this.ngToastService.error({detail:"ERROR",summary:error.error,duration:5000});
    });
  }

  getProducts(){
    return this.http.get<any>(this.baseUrl + 'product_view.php');
  }

  getSingleProduct(id: any) {
    return this.http.get<any>(this.baseUrl + `product_view.php?id=${id}`);
  }

  getUsersList(){
    return this.http.get<any>(this.baseUrl + 'user_view.php');
  }

  editUser(user: any) {
    return this.http.put(this.baseUrl + 'user_update.php', user);
  }

  addOrder(order: any){
    return this.http.post(this.baseUrl + 'order_insert.php', order);
  }

  getOrders(){
    return this.http.get<any>(this.baseUrl + 'order_view.php');
  }

  removeOrder(id: any){
    return this.http.delete(this.baseUrl + 'order_delete.php?id=' + id);
  }

  addProduct(product: any){
    return this.http.post(this.baseUrl + 'product_insert.php', product);
  }

  editProduct(product: any){
    return this.http.put(this.baseUrl + 'product_update.php', product);
  }

  deleteProduct(id: any){
    return this.http.delete(this.baseUrl + 'product_delete.php?id=' + id);
  }

  addContact(contact: any){
    return this.http.post(this.baseUrl + 'contact_insert.php', contact);
  }

  getContacts(){
    return this.http.get<any>(this.baseUrl + 'contact_view.php');
  }

  deleteContact(id: any){
    return this.http.delete(this.baseUrl + 'contact_delete.php?id=' + id);
  }


}
