import { Customer, Service } from "../models";

export class ServiceResponseDto {
    constructor(service: Service)
    {
        this.id = service.id!;
        this.name = service.name;
        this.cost = service.cost;
    }

    id: number;
    name: string;
    type?: string;
    cost: number;
}