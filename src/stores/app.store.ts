import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IQrCode } from '../interfaces/qr-code.interface';

@Injectable()
export class AppStore {

  public data = new BehaviorSubject<IQrCode[]>([]);
  public selectedQr = new BehaviorSubject<IQrCode|null>(null);

  constructor() {
  }

  load() {
    // TODO: Bring the load() function of DataLoaderService and remove the DataLoaderService.
    // After getting the data form remote source call the setData(data) function of this class.
    // And then call setSelectedQr(value) to set the selected QR as the first one from the
    // returned data.
  }

  getData(): IQrCode[] {
    return this.data.value;
  }

  setData(data: IQrCode[]) {
    this.data.next(data);
  }

  flushData() {
    this.data.next([]);
  }

  getSelectedQr(): IQrCode | null {
    return this.selectedQr.value;
  }

  setSelectedQr(value: IQrCode) {
    this.selectedQr.next(value);
  }

  flushSelectedQr() {
    this.selectedQr.next(null);
  }
}
