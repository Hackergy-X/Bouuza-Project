import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgToastService } from 'ng-angular-popup';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-order-admin-order',
  templateUrl: './order-admin-order.component.html',
  styleUrls: ['./order-admin-order.component.css']
})
export class OrderAdminOrderComponent implements OnInit {

  orders: any = [];
  userDetails: any;
  totatPrice: number = 0;
  nbOfOrders: number = 0;
  mySubscription: any;

  constructor(
    private authService: AuthServiceService,
    private toast: NgToastService,
    private router: Router
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

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.authService.getOrders().subscribe((data: any) => {
      let ordersF = data.output;
      ordersF == undefined ? ordersF = [] : ordersF.forEach((order: any) => {
        if (order.user_id == this.userDetails.id) {
          this.orders.push(order);
          this.totatPrice += Number(order.price);
          this.nbOfOrders++;
        }
      });
    });
  }

  removeOrder(id: any) {
    this.authService.removeOrder(id).subscribe((data: any) => {
      if (data["success"] == 1) {
        this.toast.success({ detail: "SUCCESS", summary: "Order removed!", duration: 2000 });
        this.router.navigateByUrl('/admin/admin-order', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/admin-order']);
          this.ngOnInit();
        });
      } else {
        this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 2000 });
      }
    });
  }

}
