import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'reflect-metadata';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TreeDisplayComponent } from './tree-display/tree-display.component';
import { UiComponent } from './ui/ui.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    TreeDisplayComponent,
    UiComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
