import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IQRCode, IScanResult } from '../interfaces/qr-code.interface';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AppStore {

  private results: IScanResult[] = [];

  public data = new BehaviorSubject<IQRCode[]>([]);
  public selectedQr = new BehaviorSubject<IQRCode | null>(null);

  constructor(private localStorage: LocalStorageService) {
  }

  load() {
    // TODO: Bring the load() function of DataLoaderService and remove the DataLoaderService.
    // After getting the data form remote source call the setData(data) function of this class.
    // And then call setSelectedQr(value) to set the selected QR as the first one from the
    // returned data.
  }

  getData(): IQRCode[] {
    return this.data.value;
  }

  setData(data: IQRCode[]) {
    this.data.next(data);
  }

  flushData() {
    this.data.next([]);
  }

  getSelectedQr(): IQRCode | null {
    return this.selectedQr.value;
  }

  setSelectedQr(value: IQRCode) {
    this.selectedQr.next(value);
  }

  flushSelectedQr() {
    this.selectedQr.next(null);
  }

  /**
   * Move the to previous item.
   */
  previous() {
    // TODO: Pick previous and set it as selected
    console.log('Store: move to previous.')
  }

  /**
   * Move the to next item.
   */
  next() {
    // TODO: Pick next and set it as selected
    console.log('Store: move to next.')
  }

  /**
   * Capture the submitted results
   */
  capture(result: IScanResult) {
    console.log('Store: Capture the scan result: ', result)
    this.results.push(result);
    this.serialize();
  }

  private serialize() {
    this.localStorage.setItem(LocalStorageService.SCAN_RESULT_KEY, this.results);
  }

  private deserialize() {
    this.localStorage.removeItem(LocalStorageService.SCAN_RESULT_KEY);
  }
}
