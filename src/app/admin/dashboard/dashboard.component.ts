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
    if (localStorage.getItem('userDetails')) {
      this.isLogin = true;
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    }
  }

  logout() {
    localStorage.removeItem('userDetails');
    this.isLogin = false;
    this.userDetails = null;
    this.router.navigate(['/home']);
  }

}
