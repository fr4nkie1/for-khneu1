import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../app.const';
import { OrderRes } from '../models/OrderRes';
import { Observable, catchError, map } from 'rxjs';
import { OrderReq } from '../models/OrderReq';
import { OrderSum } from '../models/OrderSum';
import { OrderResUpd } from '../models/OrderResUpd';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl: string = AppConst.ordersUrl;

  constructor(private httpclient: HttpClient) { }

  getOrders(): Observable<OrderRes[]> {
    return this.httpclient.get<OrderRes[]>(this.apiUrl);
  }

  getOrdersByFilialId(filialId: number): Observable<OrderRes[]> {
    return this.httpclient.get<OrderRes[]>(this.apiUrl + `/filial/${filialId}`);
  }

  getOrder(id: number): Observable<OrderResUpd> {
    return this.httpclient.get<OrderResUpd>(this.apiUrl + `/${id}`);
  }

  getSum(year: string): Observable<number> {
    return this.httpclient.get<number>(this.apiUrl + `/sum/${year}`);
  }

  getSumAndMonth(year: string): Observable<OrderSum[]> {
    return this.httpclient.get<OrderSum[]>(this.apiUrl + `/month/${year}`);
  }

  addOrder(orderReq: OrderReq): Observable<string> {
    return this.httpclient.post<OrderReq>(this.apiUrl, orderReq).pipe(
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

  updateOrder(id:number, orderReq: OrderReq): Observable<string> {
    return this.httpclient.patch<OrderReq>(`${this.apiUrl}/${id}`, orderReq).pipe(
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
}
