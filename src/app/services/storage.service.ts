import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addItem(key : string,value: string)  {
    localStorage.setItem(key,value);
  }

  fetchItem(key : string) : string  {
    if(localStorage.getItem(key) !== null)  {
      return localStorage.getItem(key) as string;
    }
    return '';
  }

  removeItem(key : string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }  
}
