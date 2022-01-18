import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRTreeComponent } from './qrtree.component';

describe('QRTreeComponent', () => {
  let component: QRTreeComponent;
  let fixture: ComponentFixture<QRTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QRTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
