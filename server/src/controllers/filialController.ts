import { Request, Response } from 'express';
import * as services from '../services/index';
import { FilialResponseDto } from '../dtos/FilialResponseDto';

export async function getFilials(req: Request, res: Response): Promise<void> {
    const allFilials = await services.getFilials();
    const resFilials: FilialResponseDto[] = [];
    for (const filial of allFilials) {
        const resFilial = new FilialResponseDto(filial);
        resFilials.push(resFilial)
    }

    res.json(resFilials);
}