import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import localeFr from '@angular/common/locales/fr'
import localeZh from '@angular/common/locales/zh'
import localeEn from '@angular/common/locales/en'
import { registerLocaleData } from '@angular/common';
import { VisitStatsService } from './admin/stats/visit-stats.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-project';
  fullname = 'Chongyang3';
  criteriasearch: string;
  condition = true;
  dataObj = new Date();
  users: any[] = [
    { name: 'Eva', age: 45 },
    { name: 'Aude', age: 33 },
    { name: 'Anne', age: 17 },
    { name: 'Marc', age: 4 },
  ];

  constructor(
    translate: TranslateService,
    private readonly visitStatsService: VisitStatsService,
  ) {
    //translate.addLangs(['en_US', 'fr_FR','zh_CN']);
    translate.setDefaultLang("en");
    translate.use("en");
    registerLocaleData(localeEn);
    registerLocaleData(localeFr);
    registerLocaleData(localeZh);
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('excludeVisitTracking') === 'true'
      || sessionStorage.getItem('visitRecorded')
    ) {
      return;
    }

    this.visitStatsService.recordVisit().subscribe({
      next: () => sessionStorage.setItem('visitRecorded', 'true'),
      error: () => {
        // Une panne du compteur ne doit jamais bloquer la navigation du visiteur.
      },
    });
  }
}
