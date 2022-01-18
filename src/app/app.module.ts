import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { DataLoaderService } from '../services/data-loader.service';
import { AppStore } from '../stores/app.store';
import { QrListComponent } from '../components/qr-list/qr-list.component';
import { SelectedQrComponent } from '../components/selected-qr/selected-qr.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    QrListComponent,
    SelectedQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: loadInitialData, deps: [DataLoaderService], multi: true },
    DataLoaderService,
    AppStore,
    ...environment.providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadInitialData(dataLoader: DataLoaderService) {
  return () => dataLoader.load();
}
