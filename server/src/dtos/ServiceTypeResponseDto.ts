import { ServiceType } from "../models/ServiceType";

export class ServiceTypeResponseDto {
    constructor(serviceType: ServiceType)
    {
        this.name = serviceType.name;
    }

    name: string;
}