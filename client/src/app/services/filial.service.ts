import { Injectable } from '@angular/core';
import { AppConst } from '../app.const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilialRes } from '../models/FilialRes';

@Injectable({
  providedIn: 'root'
})
export class FilialService {
  apiUrl: string = AppConst.filialsUrl;

  constructor(private httpclient: HttpClient) { }

  getFilials(): Observable<FilialRes[]> {
    return this.httpclient.get<FilialRes[]>(this.apiUrl);
  }
}
