import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin/admin-dashboard/admin-header/admin-header.component';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../../services/admin-api.service';
import Swal from 'sweetalert2';
import { Constants } from '../../types/Constants';
import { Car } from '../../types/Car';
import { CarCompany } from '../../types/CarCompany';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [AdminHeaderComponent,RouterModule,CommonModule,FormsModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit {
  selectedFile: File | null = null;
  btnContent: string = 'Update car';
  isBtnDisabled: boolean = false;
  newCar: Car = new Car();
  carCompanies: CarCompany[] = [];
  imageUrl: any;

  ngOnInit(): void {
    this.fetchCarBrands();
    this.route.queryParams.subscribe(params => {
      this.fetchCarDetails(params['carId']);
      if(params['imageId']) {
        this.loadImage(params['imageId']);
      }
    });
  }

  constructor(private apiService: AdminApiService,private route: ActivatedRoute) {
  }

  fetchCarDetails(id: any) : void  {
    console.log('received id-------------> ' , id);
    this.apiService.callFindACarApi({'id': id}).subscribe({
      next: resp => {
        this.newCar = resp;
      },
      error: resp => {
        console.log(resp);
      }
    });
  }

  updateCar() : void {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callAddOrUpdateCarApi(this.newCar).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.btnContent = 'Update car';
        this.isBtnDisabled = false;
      },
      error: resp => {
        let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
        this.btnContent = 'Updat car';
        this.isBtnDisabled = false;
      }
    });
  }

  fetchCarBrands() : void {
    this.apiService.callFindAllCarCompaniesApi().subscribe({
      next: resp => {
        this.carCompanies = resp;
      },
      error: resp => {
        console.log(resp);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadCarImage() : void {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('carImageFile', this.selectedFile);
    formData.append('carId',this.newCar.carId);
    this.apiService.callUploadCarImageApi(formData).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.loadImage(resp.imageId);
      },
      error: resp => {
        let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
      }
    });
  }

  loadImage(imageId: string) : void  {
    this.apiService.callDownloadCarImageApi(imageId).subscribe(response => {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        this.imageUrl = reader.result;
        this.selectedFile = null;
      }
    })
  };

}
