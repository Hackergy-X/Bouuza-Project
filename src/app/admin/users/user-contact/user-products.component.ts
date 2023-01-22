import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalService } from 'src/app/services/local.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserContactComponent implements OnInit {

  contacts: any;

  constructor(
    private authService: AuthServiceService,
    private toast: NgToastService,
    private router: Router,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    let user = this.localService.getJsonValue('userDetails');
    if(user){
      if(user.isadmin == 1){
        this.authService.getContacts().subscribe((data: any) => {
          this.contacts = data.output;
        });
      }else{
        this.router.navigate(['/home']);
        }
      }
  }

  isSolved(id: any) {
    this.authService.deleteContact(id).subscribe((data: any) => {
      if (data.success === 1) {
        this.toast.success({ detail: "SUCCESS", summary: "Contact Solved Successfully", duration: 2000 });
        this.ngOnInit();
      } else {
        this.toast.error({ detail: "ERROR", summary: data.message, duration: 2000 });
      }
    });
  };

}
