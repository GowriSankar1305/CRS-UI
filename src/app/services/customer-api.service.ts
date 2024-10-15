import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { Customer } from '../types/Customer';
import { Car } from '../types/Car';
import { Reservation } from '../types/Reservation';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private httpClient: HttpClient) {

  }
  hostUrl: string = 'http://localhost:9099/crs/customer/';
  
  callLoginCustomerApi(payload: User) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'login',payload);
  }

  callRegisterCustomerApi(payload: Customer) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'register',payload);
  }
  
  callGetAvaialableCarsForBookingApi(payload: any) : Observable<Car[]>  {
    return this.httpClient.post<Car[]>(this.hostUrl + 'searchCars',payload);
  }
  
  callDownloadCarImageApi(imageId: string) : Observable<any> {
    return this.httpClient.get(this.hostUrl + `car/image/download/${imageId}`,{responseType: 'blob'});
  }
  
  callAddReservationApi(payload: Reservation) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'bookCar',payload);
  }
  
}
