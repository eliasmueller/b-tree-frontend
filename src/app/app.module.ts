import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'reflect-metadata';

import { AppComponent } from './app.component';
import { TreeDisplayComponent } from './tree-display/tree-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
