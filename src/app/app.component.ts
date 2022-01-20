import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppStore } from '../stores/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dcc-validation-wire';
  showFiller = false;

  downloadJsonHref:any;

  constructor(private store: AppStore,
    private sanitizer: DomSanitizer) {}

  export() {
    const data = this.store.deserialize();
    const theJSON = JSON.stringify(data,null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

  clear() {
    setTimeout(() => { this.downloadJsonHref=null }, 2000);
  }
}
