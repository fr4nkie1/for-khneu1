export interface OrderResUpd {
    id: number;
    customerId: number;
    serviceId: number;
    filialId: number;
    urgency: number;
    ordNum: number;
    difficulty: number;
    ordStatus: number;
    receiveDate: string;
    returnDate: string;
    sum: number;
    sbd: number;
}
