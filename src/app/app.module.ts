import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { ErrorControlMessagesComponent } from './components/error-control-messages/error-control-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContactFormComponent,
    ContactTableComponent,
    PhoneMaskDirective,
    ErrorControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
