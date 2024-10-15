import { Address } from "./Address";
import { User } from "./User";

export class Admin  {
    adminId: string = '';
    firstName: string = '';
    lastName: string = '';
    mobileNo: string = '';
    emailId: string = '';
    address: Address = new Address();
    user: User = new User();
}