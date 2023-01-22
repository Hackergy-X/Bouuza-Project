import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    let user = this.localService.getJsonValue('userDetails');
    if(user){
      if(user.isadmin == 1){
        this.router.navigate(['/admin/dashboard']);
      }
      }
  }

}
