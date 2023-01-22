import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContactComponent } from './user-products.component';

describe('UserProductsComponent', () => {
  let component: UserContactComponent;
  let fixture: ComponentFixture<UserContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
