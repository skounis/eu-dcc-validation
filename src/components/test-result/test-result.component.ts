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
    this.store.getSelected().subscribe((selected: IQRCode | null) => {
      this.item = selected;
      if (!!selected) {
        this.sync(selected)
      }
      console.log('TestResultComponent: Selected: ', this.item)
    });
  }

  ngOnInit(): void {
  }

  /**
   * Mark the QR code as valid.
   */
  valid(): void {
    console.log('Log success.')
    this.report(TestResultEnum.Valid)
  }

  /**
   * Mark the QR code as invalid.
   */
  invalid(): void {
    console.log('Log warning.', this.model)
    this.report(TestResultEnum.Invalid)
  }

  /**
   * Report an error during the scanning process.
   */
  error(): void {
    console.log('Log error.', this.model)
    this.report(TestResultEnum.Error)
  }

  /**
   * Report and submit the validation outcome.
   * @param result 
   */
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

  /**
   * Notify the result is submitted.
   */
  private broadcast() {
    this.store.setMessage('Responce captured.')
  }

  /**
   * Clean up the form.
   */
  private cleanup() {
    this.model = { reason: '' }
  }

  /**
   * Sync the form with the selected QR code. Display a previously submitted reason, if any. 
   */
  private sync(item: IQRCode | null) {
    this.cleanup();
    if (!item) {    
      return;
    }
    const results = this.store.getResults().findEntry(item.id);
    if (!!results && results.length > 0) {
      this.model.reason = results[0].comment;
    }
  }
}
