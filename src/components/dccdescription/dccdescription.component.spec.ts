import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCCDescriptionComponent } from './dccdescription.component';

describe('DCCDescriptionComponent', () => {
  let component: DCCDescriptionComponent;
  let fixture: ComponentFixture<DCCDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCCDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DCCDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
