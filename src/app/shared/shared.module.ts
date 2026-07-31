import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { JsonToMapPipe } from './tools/json-to-map.pipe';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalDatePipe } from './tools/local-date.pipe';

/*
export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}*/

export function httpLoaderFactory() {
  return new TranslateHttpLoader();
}

@NgModule({
  declarations: [FilterPipe, JsonToMapPipe, LocalDatePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: []
      }
    })
  ],
  providers: [
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: { prefix: 'assets/i18n/', suffix: '.json' }
    }
  ],
  exports: [FilterPipe, JsonToMapPipe, LocalDatePipe,
    RouterModule,
    TranslateModule]
})
export class SharedModule {

}
