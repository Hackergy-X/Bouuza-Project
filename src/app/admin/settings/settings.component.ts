import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isLogin: boolean = false;
  userDetails: any = this.localService.getJsonValue('userDetails');

  userForm = new FormGroup({
    id: new FormControl(this.userDetails.id, Validators.required),
    name: new FormControl(this.userDetails.name, Validators.required),
    email: new FormControl(this.userDetails.email, Validators.required),
    password: new FormControl(this.userDetails.password, Validators.required),
    balance: new FormControl(this.userDetails.balance, Validators.required),
    isadmin: new FormControl(this.userDetails.isadmin, Validators.required),
  });


  constructor(
    private authService: AuthServiceService,
    private ngToastService: NgToastService,
    private localService: LocalService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let user = this.localService.getJsonValue('userDetails');
    if(user){
      if(user.isadmin == 1){
          this.isLogin = true;
          this.userDetails = this.localService.getJsonValue('userDetails');
      }else{
        this.router.navigate(['/home']);
        }
      }
  }


  logout() {
    this.localService.clearToken();
    this.isLogin = false;
    this.userDetails = null;
    this.router.navigate(['/login']);
  }


  updateUser() {
    let user = this.userForm.value;
    this.authService.editUser(user).subscribe((data: any) => {
      if (data.success === 1) {
        this.localService.setJsonValue('userDetails', user);
        this.router.navigate(['/admin/dashboard']);
        this.ngToastService.success({ detail: "SUCCESS", summary: 'User updated successfully', duration: 3000 });
      }else{
        this.ngToastService.error({ detail: "ERROR", summary: data.message, duration: 3000 });
      }
    });
  }


}
