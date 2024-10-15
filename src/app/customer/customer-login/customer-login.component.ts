import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerApiService } from '../../services/customer-api.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../types/User';
import { Constants } from '../../types/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

  constructor(
    private apiService: CustomerApiService,
    private router: Router,
    private storageService: StorageService) {

  }

  user: User = new User();
  btnContent: string = 'Login';
  isBtnDisabled: boolean = false;

  loginCustomer() : void  {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callLoginCustomerApi(this.user).subscribe({
      next: resp => {
        this.storageService.addItem(Constants.TOKEN,'Bearer ' + resp.token);
        this.router.navigate(['/customer/dashboard']);
      },
      error: resp => {
        let content = '';
        resp.error.errors.forEach((msg: string,index: number) => {
          content += ((index+1) +' '+msg+'<br>');
        });
        Swal.fire({icon: 'error',title: 'Error',html: content,confirmButtonText: 'OK' });
        this.btnContent = 'Login';
        this.isBtnDisabled = false;
      }
    });
  }

}
