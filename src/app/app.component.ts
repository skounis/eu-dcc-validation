import { Component } from '@angular/core';

/**
 * QR data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface QRNode {
  name: string;
  children?: QRNode[];
}

/** Flat node with expandable and level information */
export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dcc-validation-wire';
  showFiller = false;

  constructor() { }

}
