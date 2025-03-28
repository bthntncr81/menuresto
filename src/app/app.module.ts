import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

import { MainComponent } from "./main/main.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
