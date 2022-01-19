import { Component, OnInit } from '@angular/core';
import { IQRCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  model = { reason: '' }
  item: IQRCode|null;

  constructor(private store: AppStore) {
    this.item = null;
    this.store.selectedQr.subscribe((selectedQr: IQRCode|null)  => {
      this.item = selectedQr;
      console.log('TestResultComponent: Selected: ', this.item)
    });
  }

  ngOnInit(): void {
  }

  success(): void {
    console.log('Log success.')
  }

  warning(): void {
    console.log('Log warning.', this.model)
  }

  error(): void {
    console.log('Log error.', this.model)
  }
}
