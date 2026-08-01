import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from "./navbar/navbar.module";
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { LoginModule } from "./login/login.module";
import { AboutWebsiteModule } from './about-website/about-website.module';
import { AboutMeModule } from './about-me/about-me.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemosModule } from './demos/demos.module';
import { AppConfigService } from './app.config.service';

//registerLocaleData(localeFr, 'fr-FR');

export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DemosModule,
    NavbarModule,
    LoginModule,
    AboutWebsiteModule,
    AboutMeModule
  ],
  providers: [AppConfigService, { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
