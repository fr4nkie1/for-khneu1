export interface OrderRequestDto {
    customerId: number,
    serviceId: number,
    filialId: number,
    urgency: number,
    difficulty: number,
    ordStatus: number,
    receiveDate: string,
    returnDate: string,
}