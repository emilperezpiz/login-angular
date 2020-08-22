import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../shared/services/request.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService extends RequestService {
    public host: string = environment.host;
    constructor(
        protected http: HttpClient
    ) {
        super(http, environment.host);
    }
}