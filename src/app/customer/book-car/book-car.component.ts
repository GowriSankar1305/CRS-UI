import { Component, OnInit } from '@angular/core';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CustomerApiService } from '../../services/customer-api.service';
import { CommonModule } from '@angular/common';
import { Constants } from '../../types/Constants';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Car } from '../../types/Car';
import { Reservation } from '../../types/Reservation';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [CustomerHeaderComponent,CommonModule,FormsModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {
  clickedIndex: number | null = null;
  btnContent :string = 'Search cars';
  isBtnDisabled: boolean = false;
  isElementDisabled: boolean = false;
  years: number[] = [2024,2025];
  months: string[] = ['JANUARY','FEBRAURY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  pickUpTime: string = '';
  returnTime: string = '';
  fromYear: number = 0;
  fromMonth: string = '';
  fromDay: string = '';
  fromHour: string = '';
  fromMin: string = '';
  toYear: number = 0;
  toMonth: string = '';
  toDay: string = '';
  toHour: string = '';
  toMin: string = '';
  cars: Car[] = [];

  constructor(private apiService: CustomerApiService) {

  }

  searchAvailableCars() : void  {
   this.isElementDisabled = true;
   let fMnth: number = this.months.indexOf(this.fromMonth) + 1;
   let tMnth: number = this.months.indexOf(this.toMonth) + 1;
   this.pickUpTime = `${this.fromYear}-${fMnth}-${this.fromDay} ${this.fromHour}:${this.fromMin}:00`;
   this.returnTime = `${this.toYear}-${tMnth}-${this.toDay} ${this.toHour}:${this.toMin}:59`;
   if(fMnth < 10) { 
    this.pickUpTime = `${this.fromYear}-0${fMnth}-${this.fromDay} ${this.fromHour}:${this.fromMin}:00`;
   }
   if(tMnth < 10) { 
    this.returnTime = `${this.toYear}-0${tMnth}-${this.toDay} ${this.toHour}:${this.toMin}:59`;
   }
   const payload = { 'adminId' : '1000', 'pickupTime': this.pickUpTime, 'returnTime': this.returnTime }
   this.btnContent = Constants.BTN_CONTENT;
   this.isBtnDisabled = true;
   this.apiService.callGetAvaialableCarsForBookingApi(payload).subscribe({
    next: async resp => {
      this.cars = resp;
      for (let car of this.cars) {
        car.imageUrl = await this.loadImage(car.imageId); // wait for image to load
      }
      this.btnContent = 'Search cars';
      this.isBtnDisabled = false;
    },
    error: resp => {
      this.isElementDisabled = false;
      let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
        this.btnContent = 'Search cars';
        this.isBtnDisabled = false;
    }
   });
  }

  loadImage(imageId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.apiService.callDownloadCarImageApi(imageId).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response); // convert to base64 string
        reader.onloadend = () => {
          resolve(reader.result as string); // when ready, resolve with the base64 string
        };
        reader.onerror = () => {
          reject('Error loading image');
        };
      });
    });
  }
  

  confirmBooking(carId: string,index: number) : void {
    console.log('booking car-----',carId);
    this.clickedIndex = index;
    let booking = new Reservation();
    booking.carId = carId;
    booking.pickupTime = this.pickUpTime;
    booking.returnTime = this.returnTime;
    this.apiService.callAddReservationApi(booking).subscribe({
      next: resp => {

      },
      error: resp => {
        let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
        this.btnContent = 'Add car';
        this.isBtnDisabled = false;
      }
    })

  }
}
