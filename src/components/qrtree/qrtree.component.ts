import { Component, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import * as _ from 'lodash';
import { AppStore } from '../../stores/app.store';
import { TreeNode, FlatNode } from '../../interfaces/tree.interface'
import { IQRCode, TestResultEnum  } from '../../interfaces/model.interface';

@Component({
  selector: 'app-qrtree',
  templateUrl: './qrtree.component.html',
  styleUrls: ['./qrtree.component.css']
})
export class QRTreeComponent implements OnInit {
  
  selected: IQRCode | null = null;

  constructor(private store: AppStore) {
    let data = this._group(this.store.getData().value);
    this.dataSource.data = data;
    this.store.getSelected().subscribe((selected: IQRCode | null) => {
      this.selected = selected;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
  }
  
  private _group(data: IQRCode[]) {
    let grouped = _.groupBy(data, 'country');
    let nodes: any = Object.keys(grouped).map((key, index) => {
      return { title: key, children: grouped[key], value: 'FF' }
    });
    return nodes;
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

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  public select(item: any) {
    const qr = this.store.getData().value.find(i => {
      return i.title === item.title;
    });
    if (!!qr) {
      this.store.setSelected(qr);
    }
  }

  random() {
    return Math.ceil(Math.floor(Math.random() * 10)/3);
  }

  icon(id: string){
    const item = this.store.find(id);
    switch (item?.result) {
      case TestResultEnum.Valid:
        return 'done';
      case TestResultEnum.Invalid:
        return 'report_problem'
      case TestResultEnum.Error:
        return 'error'
      default:
        return 'qr_code'
    }
  }
}
