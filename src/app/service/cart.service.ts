import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient: HttpClient) {}
  //AddToCart
  addToCart(productId: string, quantity: number): Observable<any> {
    const body = {
      ProductId: productId,
      Quantity: quantity,
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token
    };

    return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body)
    // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  }

  //GetItemCart
  getCartItem() : Observable<any>{
    let data = {
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token

    }
    return this.httpClient.request('POST',`${this.baseURL}/api/CartItem/Process`,
    {
      body : data,
      observe:'body',
      responseType : 'json',

    })
  }
  // editCart(cartItemId:string,productId: string, quantity: number): Observable<any>{
  //   const body = {
  //     CartItemId : cartItemId,
  //     ProductId: productId,
  //     Quantity: quantity,
  //     token : JSON.parse(localStorage.getItem('currentUser')??"").data.token
  //   };
  //   return this.httpClient.post(`${this.baseURL}/api/EditCartItem/Process`, body)
  //   // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  // }
  editCart(cartdetaiId: string, productId: string, quantity: number): Observable<any> {
    const body = {
      CartDetaiID: cartdetaiId,
      ProductID: productId,
      Quantity: quantity,
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
    };
    console.log(body)
    return this.httpClient.post(`${this.baseURL}/api/EditCartItem/Process`, body);
  }
}
