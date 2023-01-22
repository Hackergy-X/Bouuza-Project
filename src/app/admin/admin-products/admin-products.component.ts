import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any;
  page = 1;             //the initial page to display
  collectionSize = 250  //total number of items in the list
  pageSize = 16;        //size of the first page

  constructor(
    private httpClient: HttpClient,
    private authService: AuthServiceService,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    if(user){
      if(user.isadmin == 1){
        this.loadProducts();
      }else{
        this.router.navigate(['/home']);
        }
      }
  }

  refreshProducts() {
    this.products = JSON.parse(localStorage.getItem('ProductsList'))
      .map((product, i) => ({ id: i + 1, ...product }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  loadProducts() {
    this.getProducts().subscribe((x) => {
      this.products = x;
      localStorage.setItem('ProductsList', JSON.stringify(x));
      this.refreshProducts(); // Display the first page
    })
  }

  getProducts(): any {
    return this.httpClient.get<any>('http://localhost:8080/bouuza/product_view.php').pipe(
      map((response: any) => {
        return response.output;
      })
    );
  }

  orderNow(product: any) {
    let name = product.name;
    let price = product.price;
    let description = product.description;
    let category = product.category;
    let image = product.image;

    let uid = JSON.parse(localStorage.getItem('userDetails')).id;

    let order = {
      name: name,
      price: price,
      description: description,
      category: category,
      image: image,
      user_id: uid,
    }

    this.authService.addOrder(order).subscribe((x) => {
      if (x['success'] === 1) {
        this.toast.success({ detail: "SUCCESS", summary: 'Product is Orded successfully!!', duration: 2000 });
        this.router.navigate(['/admin/admin-order']);
      } else {
        this.toast.error({ detail: "ERROR", summary: 'Please Try Again later', duration: 2000 });
      }
    });
  }


}
