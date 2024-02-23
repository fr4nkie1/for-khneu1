import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../app.const';
import { Observable, catchError, map } from 'rxjs';
import { CustomerReq } from '../models/CustomerReq';
import { CustomerRes } from '../models/CustomerRes';

@Injectable({
  providedIn: 'root'
})
export class CustomerService{
  apiUrl: string = AppConst.customersUrl;

  constructor(private httpclient: HttpClient) { }

  addCustomer(customerReq: CustomerReq): Observable<string> {
    return this.httpclient.post<CustomerReq>(this.apiUrl, customerReq).pipe(
      map((res: any) => {
        return res
      }),
      catchError(error => {
        let data = {};
        if (error.error == null && error.status == 403) {
          data = {
            error: "",
            message: 'you have not permission for this operation',
            status: error.status
          };
        } else {
          data = {
            error: error.error.error,
            message: error.error.message,
            status: error.status
          };
        }
        // @ts-ignore
        throw this.errorDialogService.openDialog(data);
      })
    );
  }

  updateCustomer(id: number, updCustomer: CustomerReq): Observable<string> {
    return this.httpclient.patch<CustomerReq>(this.apiUrl + `/${id}`, updCustomer).pipe(
      map((res: any) => {
        return res
      }),
      catchError(error => {
        let data = {};
        if (error.error == null && error.status == 403) {
          data = {
            error: "",
            message: 'you have not permission for this operation',
            status: error.status
          };
        } else {
          data = {
            error: error.error.error,
            message: error.error.message,
            status: error.status
          };
        }
        // @ts-ignore
        throw this.errorDialogService.openDialog(data);
      })
    );
  }

  getCustomers(): Observable<CustomerRes[]> {
    return this.httpclient.get<CustomerRes[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<CustomerRes> {
    return this.httpclient.get<CustomerRes>(this.apiUrl + `/${id}`);
  }
}
