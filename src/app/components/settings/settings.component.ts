import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isLogin: boolean = false;
  userDetails: any = JSON.parse(localStorage.getItem('userDetails') || '{}');

  userFormDetails = new FormGroup({
    id: new FormControl(this.userDetails.id, Validators.required),
    name: new FormControl(this.userDetails.name, Validators.required),
    email: new FormControl(this.userDetails.email, Validators.required),
    password: new FormControl(this.userDetails.password, Validators.required),
    balance: new FormControl(this.userDetails.balance, Validators.required),
    isadmin: new FormControl(this.userDetails.isadmin, Validators.required),
  });


  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private ngToastService: NgToastService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('userDetails')) {
      this.isLogin = true;
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    }
  }


  updateUser() {
    let user = this.userFormDetails.value;
    this.authService.editUser(user).subscribe((data: any) => {
      if (data.success === 1) {
        localStorage.setItem('userDetails', JSON.stringify(user));
        this.router.navigate(['/home']);
        this.ngToastService.success({ detail: "SUCCESS", summary: 'User updated successfully', duration: 3000 });
      }else{
        this.ngToastService.error({ detail: "ERROR", summary: data.message, duration: 3000 });
      }
    });
  }

}
