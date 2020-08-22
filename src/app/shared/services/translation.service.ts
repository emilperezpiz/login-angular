import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    protected translate: TranslateService
  ) { }

  public getTranslate(key: string) {
    let resp: string;
    this.translate.get(key, {}).subscribe((word: string) => {
      resp = word;
    });
    return resp;
  }
}
