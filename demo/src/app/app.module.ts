import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EventService } from "./event.service";
import {  AppComponent} from "./app.component";




@NgModule({
  declarations: [
     AppComponent
  ],
 imports:      
 [ BrowserModule, FormsModule,ReactiveFormsModule,HttpModule],
  providers: [EventService],
  
  bootstrap: [ AppComponent]
})
export class AppModule { }
