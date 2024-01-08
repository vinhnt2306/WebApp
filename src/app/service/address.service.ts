import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseURL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
  private baseURL2 = 'https://localhost:44383';

  constructor(private httpClient: HttpClient) { }

 //GetItemCart
 getListProvince() : Observable<any>{
  let data = {

  }
  return this.httpClient.request('POST',`${this.baseURL}/province`,
  {
    headers: {
      'token' : 'ec8de462-81fa-11ee-a59f-a260851ba65c'
  },
    body : data,
    observe:'body',
    responseType : 'json',

  })
}
getListDistrictByProvinceId(id: number) : Observable <any> {
  let data = {
    province_id : id
  }
  return this.httpClient.request('POST',`${this.baseURL}/district`,
  {
    headers: {
      'token' : 'ec8de462-81fa-11ee-a59f-a260851ba65c'
  },
    body : data,
    observe:'body',
    responseType : 'json',
  })
}
getListWardByDistrictId(id: number) : Observable <any> {
  let data = {
    district_id : id
  }
  return this.httpClient.request('POST',`${this.baseURL}/ward`,
  {
    headers: {
      'token' : 'ec8de462-81fa-11ee-a59f-a260851ba65c'
  },
    body : data,
    observe:'body',
    responseType : 'json',
  })
}

createAddress(payload:any) : Observable<any> {
  let body={
    receiverName:payload.receiverName,
    receiverPhone:payload.receiverPhone,
    provinceName:payload.provinceName,
    provinceId:payload.provinceId,
    districName:payload.districName,
    districId:payload.districId,
    wardName:payload.wardName,
    wardId:Number(payload.wardId),
    token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
    accountId : "65809962-d69a-4d1f-9c14-e4d28da106c4",
    status:payload.status
  }
  return this.httpClient.post(`${this.baseURL2}/api/CreateAddress/Process`, body)
}
//get địa chỉ
getAddress() : Observable<any> {
  const body={
    token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
    accountId : "65809962-d69a-4d1f-9c14-e4d28da106c4",
  }
  return this.httpClient.post(`${this.baseURL2}/api/GetListAddress/Process`, body)
}

}
