import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { TranslationService } from '../shared/services/translation.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  public menu = MENU_ITEMS;

  constructor(
    private translateService: TranslationService
  ) {
    this.menu.map((item) => {
      item.title = this.translateService.getTranslate(item.title);
      if (item.children) {
        this.scan(item.children);
      }
    })
  }

  scan(children: any[]) {
    children.map((item) => {
      item.title = this.translateService.getTranslate(item.title);
      if (item.children) {
        this.scan(item.children);
      }
    })
  }
}
