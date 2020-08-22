/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  public defaultLanguage = environment.defaultLanguage;
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  initializeApp() {
    // this language will be used as a fallback when a translation isn't found in the current language
    //this.translate.setDefaultLang('es');
    //
    //console.log(this.translate.getDefaultLang());
    //console.log(this.translate.getBrowserLang());
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    //this.translate.use('es');
    let language = null;
    if (localStorage.getItem('personal_info')) {
      const currentUser = JSON.parse(localStorage.getItem('personal_info'));
      if (currentUser && currentUser.setting && currentUser.setting.language) {
        language = currentUser.setting.language;
      }
    }
    language = language ? language : this.defaultLanguage;
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    // define en session el idioma actual
    sessionStorage.setItem('lang', language);
  }
}
