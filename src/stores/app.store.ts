import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IQRCode as IQRCode } from '../interfaces/qr-code.interface';

@Injectable()
export class AppStore {

  public data = new BehaviorSubject<IQRCode[]>([]);
  public selectedQr = new BehaviorSubject<IQRCode | null>(null);

  constructor() {
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
}
