import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public storage: StorageService
  ) { }

  canActivate(): boolean {
    if (this.storage.getToken() !== "") {
      return true;
    }
    this.storage.logOut();
    return false;
  }
}
