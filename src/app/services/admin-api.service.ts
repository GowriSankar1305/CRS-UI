import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../types/Admin';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { User } from '../types/User';
import { CarCompany } from '../types/CarCompany';
import { Car } from '../types/Car';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  constructor(private httpClient: HttpClient) { }
  hostUrl = 'http://localhost:9099/crs/admin/';

  callRegisterAdminApi(payload : Admin) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'register',payload);
  }

  callLoginAdminApi(payload: User) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'login',payload);
  }
  
  callFindAllCarCompaniesApi() : Observable<CarCompany[]> {
    return this.httpClient.post<CarCompany[]>(this.hostUrl + 'carCompanies',null);
  }

  callAddOrUpdateCarApi(payload: Car) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'car/addOrUpdate',payload);
  }

  callAddCarCompanyApi(payload: CarCompany) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'carCompany/add',payload);
  }

  callFindAllCarsApi() : Observable<Car[]>  {
    return this.httpClient.post<Car[]>(this.hostUrl + 'cars',null);
  }

  callFindACarApi(payload: any) : Observable<Car> {
    return this.httpClient.post<Car>(this.hostUrl + 'car/find',payload);
  }
  
  callUploadCarImageApi(payload: any) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'car/addImage',payload);
  }
  
  callDownloadCarImageApi(imageId: string) : Observable<any> {
    return this.httpClient.get(this.hostUrl + `car/image/download/${imageId}`,{responseType: 'blob'});
  }
}
