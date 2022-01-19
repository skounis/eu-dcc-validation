import { Component } from '@angular/core';

import { IQRCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'qr-list',
  templateUrl: './qr-list.component.html'
})

export class QrListComponent {

  data: IQRCode[];

  constructor(private store: AppStore) {
    this.data = [];
    this.store.data.subscribe((data: IQRCode[])  => {
      this.data = data;
    });
  }

  public selectQr(item: IQRCode) {
    this.store.setSelectedQr(item);
  }
}
