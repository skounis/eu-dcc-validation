import { Component } from '@angular/core';

import { IQRCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'selected-qr',
  templateUrl: './selected-qr.component.html'
})

export class SelectedQrComponent {

  item: IQRCode|null;

  constructor(private store: AppStore) {
    this.item = null;
    this.store.selectedQr.subscribe((selectedQr: IQRCode|null)  => {
      this.item = selectedQr;
    });
  }
}
