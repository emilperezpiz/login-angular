import { Injectable, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ModalLoginComponent } from '../components/modal-login/modal-login.component';
import { Router } from '@angular/router';
import { PersonalInfo } from '../models/personalInfo.model';
import { ModalCardComponent } from '../components/modal-card/modal-card.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public change: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private dialogService: NbDialogService,
    private router: Router
  ) { }

  autenthicate(object: any): void {
    const personal = {
      profile: object.profile,
      business: object.business,
      setting: object.setting
    };
    localStorage.setItem('personal_info', JSON.stringify(personal));
    localStorage.setItem('access_token', object.token);
  }

  getToken(): string {
    if (localStorage.getItem('access_token')) {
      return localStorage.getItem('access_token');
    }
    return '';
  }

  getPersonalInfo() {
    if (localStorage.getItem('personal_info')) {
      const personalInfo: PersonalInfo = JSON.parse(localStorage.getItem('personal_info'));
      return personalInfo;
    }
    return;
  }

  clear(): void {
    localStorage.removeItem('personal_info');
    localStorage.removeItem('access_token');
  }

  logOut(): void {
    localStorage.removeItem('personal_info');
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  emitChangeEvent(bool: boolean): void {
    this.change.emit(bool);
  }

  getChangeEmitter() {
    return this.change;
  }

  openModalLogin(): void {
    this.dialogService.open(ModalLoginComponent)
      .onClose.subscribe((resp) => {
        if (resp === true) {
          this.emitChangeEvent(resp);
        } else {
          this.emitChangeEvent(false);
        }
      });
  }

  openModalCard(): void {
    this.dialogService.open(ModalCardComponent)
      .onClose.subscribe((resp) => {

      });
  }
}
