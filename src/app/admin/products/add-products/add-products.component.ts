import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgToastService } from 'ng-angular-popup';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'express';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  userDetails: any = JSON.parse(localStorage.getItem('userDetails') || '{}');

  ProductDetails = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    aid: new FormControl(this.userDetails.id, Validators.required),
    price: new FormControl(0, Validators.required),
    image: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthServiceService,
    private ngToastService: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    if(user){
      if(user.isadmin == 0){
        this.router.navigate(['/home']);
      }
      }
  }


  addProduct() {
    let product = this.ProductDetails.value;
    let getRegisterUser = this.authService.addProduct(product);
    getRegisterUser.subscribe((data: any) => {
      if(data.success === 1){
        this.ngToastService.success({detail:"SUCCESS",summary:'Product added successfully',duration:3000});
        this.router.navigate(['/admin/products']);
      }else{
        this.ngToastService.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }

}
