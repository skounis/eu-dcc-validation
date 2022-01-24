import { Component, OnInit } from '@angular/core';
import { IQRCode, TestResultEnum } from '../../interfaces/model.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  model = { reason: '' }
  item: IQRCode | null;

  constructor(private store: AppStore) {
    this.item = null;
    this.store.getSelected().subscribe((selectedQr: IQRCode | null) => {
      this.item = selectedQr;
      console.log('TestResultComponent: Selected: ', this.item)
    });
  }

  ngOnInit(): void {
  }

  valid(): void {
    console.log('Log success.')
    this.report(TestResultEnum.Valid)
  }

  invalid(): void {
    console.log('Log warning.', this.model)
    this.report(TestResultEnum.Invalid)
  }

  error(): void {
    console.log('Log error.', this.model)
    this.report(TestResultEnum.Error)
  }

  report(result: TestResultEnum) {
    const id = this.store.getSelected().value?.id
    if (!!id) {
      this.store.capture({ file: id, result: result, comment: this.model.reason, })
      this.broadcast();
      this.cleanup();
      this.store.next();
    } else {
      // TODO: Handle error.
      this.store.setMessage('ERROR: No QRcode selected. See your console.')
      console.error('No QRcode selected.');
    }
  }

  private broadcast() {
    this.store.setMessage('Responce captured.')
  }

  private cleanup() {
    this.model = { reason: '' }
  }
}
