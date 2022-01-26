import { Component, OnInit } from '@angular/core';
import { IQRCode, TestResultEnum, Analytics } from '../../interfaces/model.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  public get value(): number {
    return !!this.analytics ? this.analytics.codes() / this.analytics.codes() * 100 : 0;
  }
  public get progress(): number {
    return !!this.analytics ? this.analytics.progress(null) / this.analytics.codes() * 100 : 0;
  }
  public get testResult(): typeof TestResultEnum {
    return TestResultEnum;
  }
  analytics: Analytics | null = null;

  constructor(private store: AppStore) {
    this.store.getSelected().subscribe((selected: IQRCode | null) => {
      this.update();
    });
  }

  ngOnInit(): void {
  }

  private update() {
    const qrcodes = this.store.getData().value;
    const results = this.store.getResults();
    const analytcs = new Analytics(qrcodes, results);
    this.analytics = analytcs;
  }

}
