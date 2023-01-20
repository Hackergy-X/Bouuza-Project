import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogin: boolean = false;
  userDetails: any;
  nbOfOrders: number = 0;
  mySubscription: any;


  constructor(
    private authService: AuthServiceService,
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
    if(localStorage.getItem('userDetails')) {
      this.isLogin = true;
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    }
    this.authService.getOrders().subscribe((res: any) => {
      let orders = res.output;
      orders.forEach((order: any) => {
        if(order.user_id == this.userDetails.id) {
          this.nbOfOrders++;
        }
      });
    });
  }


  logout() {
    localStorage.removeItem('userDetails');
    this.isLogin = false;
    this.userDetails = null;
    this.router.navigate(['/home']);
  }

  

}

