import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdminOrderComponent } from './order-admin-order.component';

describe('OrderAdminOrderComponent', () => {
  let component: OrderAdminOrderComponent;
  let fixture: ComponentFixture<OrderAdminOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAdminOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAdminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
