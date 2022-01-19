import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { QRNode, FlatNode } from '../app.component'

// Sample
// https://github.com/ehn-dcc-development/ehn-dcc-schema/blob/release/1.3.0/examples/vaccination/simple.json
const DCC_DATA: QRNode[] = [
  {
    name: 'ver: 1.3.0',
  },
  {
    name: 'nam',
    children: [
      { name: '"fn": "Smith-Jones"' },
      { name: '"fnt": "SMITH<JONES"' },
      { name: '"gn": "Charles Edward"' }
    ],
  },
  {
    name: '"dob": "1964-01-01"',
  },
  {
    name: '"v"',
    children: [
      { name: '"tg": "840539006"' },
      { name: '"vp": "1119349007"' },
      { name: '"mp": "EU/1/20/1507"' },
      { name: '"ma": "ORG-100031184"' },
      { name: '"dn": 1' },
      { name: '"sd": 2' },
      { name: '"dt": "2021-06-11"' },
      { name: '"co": "NL"' },
      { name: '"is": "Ministry of Health Welfare and Sport"' },
      { name: '"ci": "URN:UVCI:01:NL:DADFCC47C7334E45A906DB12FD859FB7#1"' }
    ]
  }
];

@Component({
  selector: 'app-dccdescription',
  templateUrl: './dccdescription.component.html',
  styleUrls: ['./dccdescription.component.css']
})
export class DCCDescriptionComponent implements OnInit {

  constructor() {
    this.dataSource2.data = DCC_DATA;
  }

  ngOnInit(): void {
  }

  private _transformer = (node: QRNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource2 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
