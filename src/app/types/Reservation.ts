export class Reservation    {
    reservationId: number = 0;
    carId: string = '';
    customerId: string = '';
    adminId: string = '';
    comment: string = '';
    pickupTime: string = '';
    returnTime: string = '';
    isCustomerReservation: boolean = false;
    isAdminReservation: boolean = false;
}