import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LoginService } from '../../../login/login.service';
import { MessageService } from '../../services/message.service';
import { Login } from '../../../login/login.model';
import { environment } from '../../../../environments/environment';
import { OneColumnLayoutService } from '../../../@theme/layouts/one-column/one-column.layout.service';

@Component({
  selector: 'ngx-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {
  public data: Login;
  public invalidEmail: string;
  public invalidPassword: string;
  public uri: string = environment.uri;
  public counter: number;
  constructor(
    protected ref: NbDialogRef<ModalLoginComponent>,
    private router: Router,
    private translateService: TranslationService,
    public service: LoginService,
    public messageService: MessageService,
    public layout: OneColumnLayoutService
  ) { }

  ngOnInit() {
    this.data = new Login();
    this.counter = 0;
  }

  cancel() {
    this.ref.close();
    this.router.navigate(['login']);
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

  doLogin(f: any) {
    if (f.form.status === 'INVALID') {
      return false;
    }
    if (this.checkEmail() === false) {
      return false;
    }
    this.layout.emitChangeEvent(true);
    const param = new FormData();
    param.append('username', this.data.username);
    param.append('password', this.data.password);
    this.service.sendPOST('login', param, true).subscribe((resp: any) => {
      if (resp.body) {
        resp = resp.body;
      }
      this.layout.emitChangeEvent(false);
      this.autenthicate(resp);
      this.ref.close(true);
    },
      error => {
        this.layout.emitChangeEvent(false);
        if (error.status === 403) {
          localStorage.clear();
          this.data.password = "";
          const message = this.translateService.getTranslate('message.usernameOrPasswordIncorrect');
          this.messageService.error(message);
          this.counter++;

          if (this.counter >= 3) {
            setTimeout(() => {
              this.cancel();
            }, 1500);
          }
        }
      });
  }

  autenthicate(object: any): void {
    const personal = {
      profile: object.profile,
      business: object.business,
      setting: object.setting
    };
    localStorage.setItem('personal_info', JSON.stringify(personal));
    localStorage.setItem('access_token', object.token);
  }
}
