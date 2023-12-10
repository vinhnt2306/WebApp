import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OderService {

  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) { }

  createOder(cartDetailID : any,paymentMenthodID : string,addressDeliveryId:string) : Observable<any> {
    const body = {
      CartDetailID : cartDetailID,
      PaymentMenthodID : paymentMenthodID,
      AddressDeliveryId : addressDeliveryId,
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
      TokenGHN : 'ec8de462-81fa-11ee-a59f-a260851ba65c'
    };
    return this.httpClient.post(`${this.baseURL}/api/CreateOrder/Process`, body)
    // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  }
  confirmorder(payload:any) : Observable<any> {
    const body = {
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
      description:"không comment",
    cartDetailId:payload.cartDetailId,
    totalAmountDiscount: payload.totalAmountDiscount,
    amountShip: payload.amountShip,
    totalAmount: payload.totalAmount,
    addressDelivery: payload.addressDelivery,
    paymentMethodId: payload.paymentMethodId,
    voucherID: null,
    };
    return this.httpClient.post(`${this.baseURL}/api/ConfirmOrder/Process`, body)
    // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  }
}
