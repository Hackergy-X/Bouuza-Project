import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    if(user){
      if(user.isadmin == 1){
        this.router.navigate(['/admin/dashboard']);
      }
      }
  }

}
