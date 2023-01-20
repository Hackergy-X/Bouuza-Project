import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestItemsComponent } from './rest-items.component';

describe('RestItemsComponent', () => {
  let component: RestItemsComponent;
  let fixture: ComponentFixture<RestItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
