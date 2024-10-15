import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { Admin } from '../../types/Admin';
import Swal from 'sweetalert2';
import { Address } from '../../types/Address';
import { User } from '../../types/User';
import { Constants } from '../../types/Constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css'
})
export class AdminSignupComponent {
  constructor(private apiService: AdminApiService) {

  }
  newAdmin: Admin = new Admin();
  newAddress: Address = new Address();
  newUser: User = new User();
  btnContent: string = 'Register';
  isBtnDisabled: boolean = false;

  registerAdmin() : void {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.newAdmin.address = this.newAddress;
    this.newAdmin.user = this.newUser;
    this.apiService.callRegisterAdminApi(this.newAdmin).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.newAdmin = new Admin();
        this.newAddress = new Address();
        this.newUser = new User();
        this.btnContent = 'Register';
        this.isBtnDisabled = false;
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
    });
  }
}
