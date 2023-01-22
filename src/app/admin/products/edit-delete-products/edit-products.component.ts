import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router, NavigationEnd } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-edit-delete-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditDeleteProductsComponent implements OnInit {

  products: any;
  mySubscription: any;


  constructor(
    private authService: AuthServiceService,
    private ngToastService: NgToastService,
    private router: Router,
    private localService: LocalService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    let user = this.localService.getJsonValue('userDetails');
    if(user){
      if(user.isadmin == 1){
        this.authService.getProducts().subscribe((data: any) => {
          this.products = data.output;
        });
      }else{
        this.router.navigate(['/home']);
        }
      }    
  }

  deleteProduct(id: any) {
    this.authService.deleteProduct(id).subscribe((data: any) => {
      if(data.success === 1){
        this.ngToastService.success({detail:"SUCCESS",summary:'Product deleted successfully',duration:3000});
        this.router.navigateByUrl('/admin/edit-delete-products', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/edit-delete-products']);
          this.ngOnInit();
        });
      }else{
        this.ngToastService.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }

}
