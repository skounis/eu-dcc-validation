import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCCQRComponent } from './dccqr.component';

describe('DCCQRComponent', () => {
  let component: DCCQRComponent;
  let fixture: ComponentFixture<DCCQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCCQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DCCQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
