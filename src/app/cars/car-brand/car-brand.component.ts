import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin/admin-dashboard/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../services/admin-api.service';
import { CarCompany } from '../../types/CarCompany';
import Swal from 'sweetalert2';
import { Constants } from '../../types/Constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-brand',
  standalone: true,
  imports: [AdminHeaderComponent,FormsModule,CommonModule],
  templateUrl: './car-brand.component.html',
  styleUrl: './car-brand.component.css'
})
export class CarBrandComponent implements OnInit {
  newCompany: CarCompany = new CarCompany();
  carCompanies: CarCompany[] = [];
  btnContent: string = 'Create brand';
  isBtnDisabled: boolean = false;
  constructor(private apiService: AdminApiService) {

  }
  ngOnInit(): void {
    this.fetchCarBrands();
  }

  fetchCarBrands()  {
    this.carCompanies = [];
    this.apiService.callFindAllCarCompaniesApi().subscribe({
      next: resp => {
        this.carCompanies = resp;
      },
      error: resp => {
        console.log(resp);
      }
    });
  }

  addCarBrand() : void  {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callAddCarCompanyApi(this.newCompany).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.btnContent = 'Create brand';
        this.isBtnDisabled = false;
        this.fetchCarBrands();
      },
      error: resp => {
        let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
        this.btnContent = 'Create brand';
        this.isBtnDisabled = false;
      }
    })
  }

}
