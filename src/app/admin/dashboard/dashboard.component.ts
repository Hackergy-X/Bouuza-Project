import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLogin: boolean = false;
  userDetails: any;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    if(user){
      if(user.isadmin == 1){
        if (localStorage.getItem('userDetails')) {
          this.isLogin = true;
          this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        }
      }else{
        this.router.navigate(['/home']);
        }
      }
  }

  logout() {
    localStorage.removeItem('userDetails');
    this.isLogin = false;
    this.userDetails = null;
    this.router.navigate(['/home']);
  }

}
