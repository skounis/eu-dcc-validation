
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from '../stores/app.store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DataLoaderService } from '../services/data-loader.service';
import { DCCDescriptionComponent } from '../components/dccdescription/dccdescription.component';
import { DCCQRComponent } from '../components/dccqr/dccqr.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { QrListComponent } from '../components/qr-list/qr-list.component';
import { QRTreeComponent } from '../components/qrtree/qrtree.component';
import { TestResultComponent } from '../components/test-result/test-result.component';

@NgModule({
  declarations: [
    AppComponent,
    DCCDescriptionComponent,
    DCCQRComponent,
    QrListComponent,
    QRTreeComponent,
    TestResultComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTreeModule
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
