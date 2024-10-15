import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerApiService } from '../../services/customer-api.service';
import { Customer } from '../../types/Customer';
import { CrsDate } from '../../types/CrsDate';
import { User } from '../../types/User';
import { Address } from '../../types/Address';
import { Constants } from '../../types/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  newCustomer: Customer = new Customer();
  dob: CrsDate = new CrsDate();
  licenseExpDate: CrsDate = new CrsDate(); 
  user: User = new User();
  newAddress: Address = new Address();
  btnContent: string = 'Register';
  isBtnDisabled: boolean = false;

  constructor(private apiService: CustomerApiService) {

  }

  registerCustomer() : void {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.newCustomer.address = this.newAddress;
    this.newCustomer.user = this.user;
    this.newCustomer.dateOfBirth = this.dob;
    this.newCustomer.licenseExpiryDate = this.licenseExpDate;
    this.apiService.callRegisterCustomerApi(this.newCustomer).subscribe({
      next: resp => {
        this.btnContent = 'Register';
        this.isBtnDisabled = false;
        Swal.fire('Success',resp.message,'success');
        this.newAddress = new Address();
        this.newCustomer = new Customer();
        this.user = new User();
      },
      error: resp => {
        let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
        this.btnContent = 'Register';
        this.isBtnDisabled = false;
      }
    })
  }
}
