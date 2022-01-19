import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

// TODO: Move the interface into a common place.
import { QRNode, FlatNode } from '../app.component'

const TREE_DATA: QRNode[] = [
  {
    name: 'Greece',
    children: [{ name: 'QR01 - Vaccination ' }, { name: 'QR-02 - Test' }, { name: 'QR-03 - Recovery' }],
  },
  {
    name: 'The Netherlands',
    children: [{ name: 'QR01 - Vaccination ' }, { name: 'QR-02 - Test' }, { name: 'QR-03 - Recovery' }],
  },
  {
    name: 'Germany',
    children: [{ name: 'QR01 - Vaccination ' }, { name: 'QR-02 - Test' }, { name: 'QR-03 - Recovery' }],
  },
];

@Component({
  selector: 'app-qrtree',
  templateUrl: './qrtree.component.html',
  styleUrls: ['./qrtree.component.css']
})
export class QRTreeComponent implements OnInit {

  constructor() { 
    this.dataSource.data = TREE_DATA;
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

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
