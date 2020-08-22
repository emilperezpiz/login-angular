import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';
import { TranslationService } from './translation.service';
import { OneColumnLayoutService } from '../../@theme/layouts/one-column/one-column.layout.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagerService {

  constructor(
    public message: MessageService,
    private translateService: TranslationService,
    public layout: OneColumnLayoutService
  ) { }

  error(status: number, storage: StorageService, error = null) {
    this.layout.emitChangeEvent(false);
    if (status === 401 || status === 403) {
      storage.openModalLogin();
    }
    if (status === 404) {
      let message: string;
      if (error) {
        message = this.translateService.getTranslate('message.' + error);
      } else {
        message = this.translateService.getTranslate('message.error404');
      }

      this.message.error(message);
    }
    if (status === 301) {
      const message = this.translateService.getTranslate('message.' + error);
      this.message.warning(message);
      storage.logOut();
    }
    if (status === 400) {
      const message = this.translateService.getTranslate('message.' + error);
      this.message.error(message);
    }
    if (status === 500) {
      const message = this.translateService.getTranslate('message.error500');
      this.message.error(message);
    }
  }
}
