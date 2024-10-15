import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { User } from '../../types/User';
import { Constants } from '../../types/Constants';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-signin',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './admin-signin.component.html',
  styleUrl: './admin-signin.component.css'
})
export class AdminSigninComponent {

  constructor(
    private apiService: AdminApiService,
    private router: Router,
    private storageService: StorageService) {

  }

  user: User = new User();
  btnContent: string = 'Login';
  isBtnDisabled: boolean = false;

  loginAdmin() : void  {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callLoginAdminApi(this.user).subscribe({
      next: resp => {
        this.storageService.addItem(Constants.TOKEN,'Bearer ' + resp.token);
        this.router.navigate(['/admin/dashboard']);
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
