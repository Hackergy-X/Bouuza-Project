import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  userDetail: any = this.localService.getJsonValue('userDetails');

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private ngToastService: NgToastService,
    private localService: LocalService
  ) { }

  contactForm = new FormGroup({
    name: new FormControl("", Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    let user = this.localService.getJsonValue('userDetails');
    if (user) {
      if (user.isadmin == 1) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        if (this.userDetail) {
          this.contactForm.patchValue({
            name: this.userDetail.name
          });
        }
      }
    }
  }

  addContact() {
    this.authService.addContact(this.contactForm.value).subscribe((data: any) => {
      if (data.success === 1) {
        this.ngToastService.success({ detail: "SUCCESS", summary: data.message, duration: 2000 });
        this.router.navigate(['/home']);
      } else {
        this.ngToastService.error({ detail: "ERROR", summary: data.message, duration: 2000 });
      }
    });
  }
}
