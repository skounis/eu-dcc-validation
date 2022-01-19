import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeNode, FlatNode } from '../../interfaces/tree.interface'
import { IQRCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

// Sample
// https://github.com/ehn-dcc-development/ehn-dcc-schema/blob/release/1.3.0/examples/vaccination/simple.json
const DCC_DATA: TreeNode[] = [
  {
    title: 'ver: 1.3.0',
  },
  {
    title: 'nam',
    children: [
      { title: '"fn": "Smith-Jones"' },
      { title: '"fnt": "SMITH<JONES"' },
      { title: '"gn": "Charles Edward"' }
    ],
  },
  {
    title: '"dob": "1964-01-01"',
  },
  {
    title: '"v"',
    children: [
      { title: '"tg": "840539006"' },
      { title: '"vp": "1119349007"' },
      { title: '"mp": "EU/1/20/1507"' },
      { title: '"ma": "ORG-100031184"' },
      { title: '"dn": 1' },
      { title: '"sd": 2' },
      { title: '"dt": "2021-06-11"' },
      { title: '"co": "NL"' },
      { title: '"is": "Ministry of Health Welfare and Sport"' },
      { title: '"ci": "URN:UVCI:01:NL:DADFCC47C7334E45A906DB12FD859FB7#1"' }
    ]
  }
];

@Component({
  selector: 'app-dccdescription',
  templateUrl: './dccdescription.component.html',
  styleUrls: ['./dccdescription.component.css']
})
export class DCCDescriptionComponent implements OnInit {

  item: IQRCode | null;

  constructor(private store: AppStore) {
    this.dataSource2.data = DCC_DATA;
    this.item = null;
    this.store.selectedQr.subscribe((selectedQr: IQRCode | null) => {
      this.item = selectedQr;
      console.log('DCCDescriptionComponent: Selected: ', this.item)
    });
  }

  ngOnInit(): void {
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node.title,
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
