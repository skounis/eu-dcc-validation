import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IQrCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'qr-list',
  templateUrl: './qr-list.component.html'
})

export class QrListComponent {

  data: IQrCode[];

  constructor(private store: AppStore) {
    this.data = [];
    this.store.data.subscribe((data: IQrCode[])  => {
      this.data = data;
    });
  }

  public selectQr(item: IQrCode) {
    this.store.setSelectedQr(item);
  }
}
