import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

import { HttpClientModule } from "@angular/common/http";
import { MainComponent } from "./main/main.component";
import { RegisterComponent } from './pages/register/register.component';
import { PrivacyPolicyModalComponent } from './pages/privacy-policy-modal/privacy-policy-modal.component';
import { TermsModalComponent } from './pages/terms-modal/terms-modal.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, MainComponent, RegisterComponent, PrivacyPolicyModalComponent, TermsModalComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule { }
