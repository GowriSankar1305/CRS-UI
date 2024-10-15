import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin/admin-dashboard/admin-header/admin-header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../services/admin-api.service';
import { Car } from '../../types/Car';
import { Constants } from '../../types/Constants';
import { CarCompany } from '../../types/CarCompany';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [AdminHeaderComponent,RouterModule,FormsModule,CommonModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {

  constructor(private apiService: AdminApiService)  {
    
  }

  ngOnInit(): void {
    this.fetchCarBrands();
  }

  newCar: Car = new Car();
  btnContent: string = 'Add car';
  isBtnDisabled: boolean = false;
  carCompanies: CarCompany[] = [];

  addNewCar() {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callAddOrUpdateCarApi(this.newCar).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.btnContent = 'Add car';
        this.isBtnDisabled = false;
        this.newCar = new Car();
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
    });
  }

  fetchCarBrands()  {
    this.apiService.callFindAllCarCompaniesApi().subscribe({
      next: resp => {
        this.carCompanies = resp;
      },
      error: resp => {
        console.log(resp);
      }
    });
  }

}
