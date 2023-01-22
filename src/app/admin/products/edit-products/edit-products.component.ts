import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  product: any;
  id: any;

  editProductForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    aid: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    image: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private ngToastService: NgToastService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    if (user) {
      if (user.isadmin == 1) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.authService.getSingleProduct(this.id).subscribe((data: any) => {
          this.product = data.output;
          this.editProductForm.patchValue({
            id: this.product[0].id,
            name: this.product[0].name,
            category: this.product[0].category,
            description: this.product[0].description,
            aid: this.product[0].aid,
            price: this.product[0].price,
            image: this.product[0].image
          });
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  editProduct() {
    this.authService.editProduct(this.editProductForm.value).subscribe((data: any) => {
      if (data.success === 1) {
        this.ngToastService.success({ detail: "SUCCESS", summary: 'Product updated successfully', duration: 3000 });
        this.router.navigate(['/admin/edit-delete-products']);
      } else {
        this.ngToastService.error({ detail: "ERROR", summary: data.message, duration: 3000 });
      }
    });
  }
}
