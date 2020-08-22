import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public code = environment.code;
  public defaultLanguage = environment.defaultLanguage;
  constructor(
    protected http: HttpClient,
    protected url: string
  ) { }

  getLanguage() {
    let language = null;

    if (localStorage.getItem('personal_info')) {
      const currentUser = JSON.parse(localStorage.getItem('personal_info'));
      if (currentUser && currentUser.setting && currentUser.setting.language) {
        language = currentUser.setting.language;
      }
    }

    language = language ? language : this.defaultLanguage;
    
    return language;
  }

  sendGET(uri: string): Observable<any> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return;
    }

    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers = headers.append(
      "Accept-Language", this.getLanguage()
    );
    headers = headers.append(
      "Accept-Code", this.code
    );

    return this.http.get(this.url + uri + '?token=' + token, {
      headers,
      observe: 'response'
    });
  }

  sendPOST(uri: string, param: any, login = false) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers = headers.append(
      "Accept-Language", this.getLanguage()
    );
    headers = headers.append(
      "Accept-Code", this.code
    );

    if (!login) {
      const token = localStorage.getItem('access_token');
      uri = uri + '?token=' + token;
    }

    return this.http.post(this.url + uri, param, {
      headers,
      observe: 'response'
    })
      .pipe(map(data => data));
  }

  sendPUT(uri: string, param: any) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers = headers.append(
      "Accept-Language", this.getLanguage()
    );
    headers = headers.append(
      "Accept-Code", this.code
    );
    /*headers = headers.append(
      "Authorization", 'Bearer ' + localStorage.getItem('access_token')
    );*/
    const token = localStorage.getItem('access_token');
    uri = uri + '?token=' + token;

    return this.http.put(this.url + uri, param, {
      headers,
      observe: 'response'
    })
      .pipe(map(data => data));
  }

  sendDELETE(uri: string) {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      return;
    }

    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers = headers.append(
      "Accept-Language", this.getLanguage()
    );
    headers = headers.append(
      "Accept-Code", this.code
    );

    return this.http.delete(this.url + uri + '?token=' + token, {
      headers,
      observe: 'response'
    })
      .pipe(map(data => data));
  }
}
