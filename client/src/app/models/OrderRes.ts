import { CustomerRes } from "./CustomerRes";
import { FilialRes } from "./FilialRes";
import { Service } from "./Service";

export interface OrderRes {
    id: number;
    customer: CustomerRes;
    service: Service;
    filial: FilialRes;
    urgency: string;
    ordNum: number;
    difficulty: string;
    ordStatus: string;
    receiveDate: string;
    returnDate: string;
    sum: number;
    sbd: number;
}
