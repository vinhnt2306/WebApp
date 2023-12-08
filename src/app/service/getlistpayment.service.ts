import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetlistpaymentService {

  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) { }
  //GetAll Sản phẩm
  getListPayment() : Observable<any>{
    let data = {

    }
    return this.httpClient.request('POST',`${this.baseURL}/api/GetlstPaymentMethod/Process`,
    {
      body : data,
      observe:'body',
      responseType : 'json',

    })
  }
}
