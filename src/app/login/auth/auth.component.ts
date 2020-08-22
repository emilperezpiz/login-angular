import { Component, OnInit } from '@angular/core';
import { Login } from '../login.model';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { TranslationService } from '../../shared/services/translation.service';
import { MessageService } from '../../shared/services/message.service';
import { StorageService } from '../../shared/services/storage.service';
import { environment } from '../../../environments/environment';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading: boolean;
  public data: Login;
  public year: number;
  public invalidEmail: string;
  public invalidPassword: string;
  public uri: string = environment.uri;
  constructor(
    public router: Router,
    public service: LoginService,
    private translateService: TranslationService,
    public messageService: MessageService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.data = new Login();
    const date = new Date();
    this.loading = false;
    this.year = date.getFullYear();
  }

  doLogin(f: any) {
    if (f.valid === true) {
      if (this.checkEmail() === false) {
        return false;
      }
      this.loading = true;
      const param = new FormData();
      param.append('username', this.data.username);
      param.append('password', this.data.password);
      this.service.sendPOST('login', param, true).subscribe((resp: any) => {
        if (resp.body) {
          resp = resp.body;
        }
        this.storage.autenthicate(resp);
        this.router.navigate([this.uri + '/worker']);
      },
        error => {
          this.loading = false;
          if (error.status === 403) {
            this.storage.clear();
            this.data.password = "";
            const message = this.translateService.getTranslate('message.usernameOrPasswordIncorrect');
            this.messageService.error(message);
            this.router.navigate(['/login']);
          } else if (error.status === 301) {
            /*const message = this.translateService.getTranslate('message.' + error);
            this.messageService.error(message);*/
          }
        });
    }
  }

  checkEmail() {
    const regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    if (!regMail.test(this.data.username)) {
      const message = this.translateService.getTranslate('message.formatEmailIncorrect');
      this.invalidEmail = message;
      return false;
    }
    this.invalidEmail = "";
    return true;
  }

}
