import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {

  users: any;

  constructor(
    private authService: AuthServiceService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.authService.getUsersList().subscribe((data: any) => {
      this.users = data.output;
    });
  }

  makeAsAdmin(user: any) {
    user.isadmin = 1;
    this.authService.editUser(user).subscribe((data: any) => {
      this.toast.success({ detail: "SUCCESS", summary: user.name + " is now Admin!", duration: 2000 });
    });
  };

  makeAsUser(user: any) {
    user.isadmin = 0;
    this.authService.editUser(user).subscribe((data: any) => {
      this.toast.success({ detail: "SUCCESS", summary: user.name + " is now User!", duration: 2000 });
    });
  };
}
