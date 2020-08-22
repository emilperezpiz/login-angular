import { Component } from '@angular/core';
import { TranslationService } from '../../../shared/services/translation.service';
/*const date = new Date();
export const slogan = {
  one: 'ok'
};*/

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
  /*template: `
    <span class="created-by"><b><a href="https://amappzing.com.br" target="_blank">™ Amappzing</a></b> 2017 - ${date.getFullYear()}. ${slogan.one}</span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/amappzingbr" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,*/
})
export class FooterComponent {
  public slogan: string;
  public year: number;
  constructor(
    private translateService: TranslationService
  ) {
    const date = new Date();
    this.year = date.getFullYear();
    this.slogan = this.translateService.getTranslate('message.sloganAmappzing');
  }
}
