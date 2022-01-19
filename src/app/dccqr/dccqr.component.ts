import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dccqr',
  templateUrl: './dccqr.component.html',
  styleUrls: ['./dccqr.component.css']
})
export class DCCQRComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  previous() {
    console.log('Display the previous QR code.')
  }

  next() {
    console.log('Display the next QR code.')
  }

}
