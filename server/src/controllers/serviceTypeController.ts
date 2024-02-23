import { Request, Response } from 'express';
import * as services from '../services/index';
import { ServiceTypeResponseDto } from '../dtos/ServiceTypeResponseDto';

export async function getServiceTypes(req: Request, res: Response): Promise<void> {
    const allServiceTypes = await services.getServiceTypes();
    const resServiceTypes: ServiceTypeResponseDto[] = [];
    for (const serviceType of allServiceTypes) {
        const resServiceType = new ServiceTypeResponseDto(serviceType);
        resServiceTypes.push(resServiceType)
    }

    res.json(resServiceTypes);
}