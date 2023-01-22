import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalService } from 'src/app/services/local.service';
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
    private router: Router,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    let user = this.localService.getJsonValue('userDetails');
    if(user){
      if(user.isadmin == 1){
        if (this.localService.getJsonValue('userDetails')) {
          this.isLogin = true;
          this.userDetails = this.localService.getJsonValue('userDetails');
        }
      }else{
        this.router.navigate(['/home']);
        }
      }
  }

  logout() {
    this.localService.clearToken();
    this.isLogin = false;
    this.userDetails = null;
    this.router.navigate(['/home']);
  }

}
