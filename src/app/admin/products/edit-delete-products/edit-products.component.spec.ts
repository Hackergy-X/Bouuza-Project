import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteProductsComponent } from './edit-products.component';

describe('EditProductsComponent', () => {
  let component: EditDeleteProductsComponent;
  let fixture: ComponentFixture<EditDeleteProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
