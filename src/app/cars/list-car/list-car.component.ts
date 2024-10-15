import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin/admin-dashboard/admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { Car } from '../../types/Car';
import { AdminApiService } from '../../services/admin-api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-car',
  standalone: true,
  imports: [AdminHeaderComponent,CommonModule,RouterModule],
  templateUrl: './list-car.component.html',
  styleUrl: './list-car.component.css'
})
export class ListCarComponent implements OnInit {
  cars: Car[] = [];
  constructor(private apiService: AdminApiService) {}
  ngOnInit(): void {
    this.fetchAllCars();
  }

  fetchAllCars() : void {
    this.apiService.callFindAllCarsApi().subscribe({
      next: resp => {
        this.cars = resp;
      },
      error: resp => {
        console.log(resp);
      }
    })
  } 
}
