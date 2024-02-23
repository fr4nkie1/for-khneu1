export class Customer {
    constructor(
        public firstName: string, 
        public lastName: string, 
        public surName: string, 
        public phoneNumber: string,
        public isRepeatCustomer: boolean,
        public orderCount: number, 
        public id?: number) {}
}