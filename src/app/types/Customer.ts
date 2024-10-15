import { Address } from "./Address";
import { CrsDate } from "./CrsDate";
import { User } from "./User";

export class Customer {
    customerId: string = '';
	firstName : string = '';
	lastname: string = '';
	mobileNo: string = '';
	emailAddress: string = '';
    address: Address = new Address();
    drivingLicenseNo: string = '';
    licenseExpiryDate: CrsDate = new CrsDate();
    dateOfBirth: CrsDate = new CrsDate();
    licenseImagePath: string = '';
    idProofType: string = '';
    idProofNumber: string = '';
    user: User = new User();
    adminId: string = '1000';
}