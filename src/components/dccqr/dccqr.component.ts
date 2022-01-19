import { Component, OnInit } from '@angular/core';
import { IQRCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'app-dccqr',
  templateUrl: './dccqr.component.html',
  styleUrls: ['./dccqr.component.css']
})
export class DCCQRComponent implements OnInit {

  item: IQRCode | null;

  constructor(private store: AppStore) {
    this.item = null;
    this.store.selectedQr.subscribe((selectedQr: IQRCode | null) => {
      this.item = selectedQr;
      console.log('DCCQRComponent: Selected: ', this.item)
    });
  }

  ngOnInit(): void {
  }

  previous() {
    console.log('DCCQRComponent: Display the previous QR code.')
    this.store.previous();
  }

  next() {
    console.log('DCCQRComponent: Display the next QR code.')
    this.store.next();
  }

}
