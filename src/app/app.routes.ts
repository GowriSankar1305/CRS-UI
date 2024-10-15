import { Routes } from '@angular/router';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminSignupComponent } from './admin/admin-signup/admin-signup.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer/customer-register/customer-register.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { ListCarComponent } from './cars/list-car/list-car.component';
import { CarBrandComponent } from './cars/car-brand/car-brand.component';
import { EditCarComponent } from './cars/edit-car/edit-car.component';
import { BookCarComponent } from './customer/book-car/book-car.component';
import { BookingListComponent } from './customer/booking-list/booking-list.component';

export const routes: Routes = [
    {path: 'admin/login',component: AdminSigninComponent},
    {path: 'admin/register',component: AdminSignupComponent},
    {path: 'admin/dashboard',component: AdminDashboardComponent},
    {path: 'admin/addCar',component: AddCarComponent},
    {path: 'admin/viewCars',component: ListCarComponent},
    {path: 'admin/carBrands',component: CarBrandComponent},
    {path: 'admin/editCar',component: EditCarComponent},
    {path: 'customer/login',component: CustomerLoginComponent},
    {path: 'customer/register',component:CustomerRegisterComponent},
    {path: 'customer/dashboard',component:CustomerDashboardComponent},
    {path: 'customer/bookCar',component: BookCarComponent},
    {path: 'customer/bookings',component: BookingListComponent}
];
