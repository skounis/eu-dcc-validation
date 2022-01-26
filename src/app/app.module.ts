
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { QRTreeComponent } from '../components/qrtree/qrtree.component';
import { TestResultComponent } from '../components/test-result/test-result.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CacheDataInterceptor } from '../interceptors/cache.interceptor';
import { ProgressComponent } from '../components/progress/progress.component'
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { DownloadDialogComponent } from '../components/download-dialog/download-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    DCCDescriptionComponent,
    DCCQRComponent,
    QRTreeComponent,
    TestResultComponent,
    ProgressComponent,
    DownloadDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTreeModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: loadInitialData, deps: [DataLoaderService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheDataInterceptor, multi: true },
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
