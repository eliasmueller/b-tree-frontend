import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'reflect-metadata';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TreeDisplayComponent } from './tree-display/tree-display.component';
import { UiComponent } from './ui/ui.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeDisplayComponent,
    UiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
