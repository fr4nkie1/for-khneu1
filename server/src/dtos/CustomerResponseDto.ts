import { Customer } from "../models";

export class CustomerResponseDto {
    constructor(customer: Customer)
    {
        this.id = customer.id!;
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.surName = customer.surName;
        this.phoneNumber = customer.phoneNumber;
        this.isRepeatCustomer = customer.isRepeatCustomer;
        this.orderCount = customer.orderCount;
    }

    id: number;
    firstName: string;
    lastName: string;
    surName: string;
    phoneNumber: string;
    isRepeatCustomer: boolean;
    orderCount: number;
}