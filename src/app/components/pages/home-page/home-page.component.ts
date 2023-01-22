import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products: any;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    if (user) {
      if (user.isadmin == 1) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.authService.getProducts().subscribe((data: any) => {
          this.products = data.output;
        });
      }
    }else{
      this.authService.getProducts().subscribe((data: any) => {
        this.products = data.output;
      });
    }
  }


  readMore() {
    if (localStorage.getItem('userDetails')) {
      this.router.navigate(['/rest-items']);
    } else {
      this.toast.warning({ detail: "WARNING!", summary: "Should Login before", duration: 2000 });
      this.router.navigate(['/login']);
    }
  }

}
