import { Injectable } from '@angular/core';
import { Service } from '../models/Service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  apiUrl: string = AppConst.servicesUrl;

  constructor(private httpclient: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.httpclient.get<Service[]>(this.apiUrl);
  }
}
