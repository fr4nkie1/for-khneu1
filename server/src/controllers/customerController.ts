import { Request, Response } from 'express';
import * as services from '../services/index';
import { CustomerRequestDto } from '../dtos/CustomerRequestDto';
import { CustomerResponseDto } from '../dtos/CustomerResponseDto';

export async function addCustomer(req: Request, res: Response): Promise<void> {
    const customerReq = req.body as CustomerRequestDto;
    const customer = await services.addCustomer(customerReq);

    res.json(customer);
}

export async function updateCustomer(req: Request, res: Response): Promise<void> {
    const customerReq = req.body as CustomerRequestDto;
    const id = Number(req.params['id'])
    const customer = await services.updateCustomerFull(id, customerReq);

    res.json(customer);
}

async function findCustomer(req: Request, res: Response): Promise<void> {
    const lastName = req.query['lastName'] as string;
    const customer = await services.findCustomer(lastName);
    const resCustomer = new CustomerResponseDto(customer);

    res.json(resCustomer);
}

export async function getCustomer(req: Request, res: Response): Promise<void> {
    const id = Number(req.params['id']);
    const customer = await services.findCustomerById(id);
    const resCustomer = new CustomerResponseDto(customer);

    res.json(resCustomer);
}

export async function getCustomers(req: Request, res: Response): Promise<void> {
    if (req.query['lastName']) {
        findCustomer(req, res)
    }
    else {
        const allCustomers = await services.getCustomers();
        const resCustomers: CustomerResponseDto[] = [];
        for (const customer of allCustomers) {
            const resCustomer = new CustomerResponseDto(customer);
            resCustomers.push(resCustomer)
        }

        res.json(resCustomers);
    }
}