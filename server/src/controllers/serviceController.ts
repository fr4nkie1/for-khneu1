import { Request, Response } from 'express';
import * as services from '../services/index';
import { ServiceResponseDto } from '../dtos/ServiceResponseDto';

export async function getServices(req: Request, res: Response): Promise<void> {
    const availableServices = await services.getServices();
    const resServices: ServiceResponseDto[] = [];
    for (const service of availableServices) {
        const serviceType = await services.getServiceType(service.typeId!);
        const resService = new ServiceResponseDto(service);
        resService.type = serviceType.name;
        resServices.push(resService)
    }

    res.json(resServices);
}