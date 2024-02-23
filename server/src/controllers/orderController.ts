import { Request, Response } from 'express';
import * as services from '../services/index';
import { OrderRequestDto } from '../dtos/OrderRequestDto';
import { OrderResponseDto } from '../dtos/OrderResponseDto';
import { CustomerResponseDto } from '../dtos/CustomerResponseDto';
import { ServiceResponseDto } from '../dtos/ServiceResponseDto';
import { FilialResponseDto } from '../dtos/FilialResponseDto';

export async function createOrder(req: Request, res: Response): Promise<void> {
    const orderReq = req.body as OrderRequestDto;
    const order = await services.createOrder(orderReq);

    res.json(order);
}

export async function updateOrder(req: Request, res: Response): Promise<void> {
    const orderReq = req.body as OrderRequestDto;
    const id = Number(req.params['id'])
    const order = await services.updateOrder(id, orderReq);

    res.json(order);
}

export async function getSum(req: Request, res: Response): Promise<void> {
    const year = req.params['year']
    const sum = await services.getSum(year)
    res.json(sum)
}

export async function getOrder(req: Request, res: Response): Promise<void> {
    const id = Number(req.params['id'])
    const order = await services.getOrder(id)
    res.json(order)
}

export async function getSumAndMonth(req: Request, res: Response): Promise<void> {
    const year = req.params['year']
    const result = await services.getSumAndMonth(year)
    res.json(result)
}

export async function getOrders(req: Request, res: Response): Promise<void> {
    const orders = await services.getOrders();
    const resOrders: OrderResponseDto[] = [];
    for (const order of orders) {
        const customer = await services.findCustomerById(order.customerId);
        const customerRes = new CustomerResponseDto(customer);
        const service = await services.findServiceById(order.serviceId);
        const serviceRes = new ServiceResponseDto(service);
        const filial = await services.findFilialById(order.filialId)
        const filialRes = new FilialResponseDto(filial);
        const resOrder = new OrderResponseDto(order);
        resOrder.customer = customerRes;
        resOrder.service = serviceRes;
        resOrder.filial = filialRes;
        resOrder.difficulty = getName(order.difficulty)
        resOrder.urgency = getName(order.urgency)
        resOrder.ordStatus = getStatusName(order.ordStatus)
        resOrders.push(resOrder)
    }

    res.json(resOrders);
}

export async function getOrdersByFilialId(req: Request, res: Response): Promise<void> {
    const filialId = Number(req.params['filialId']);
    const orders = await services.getOrdersByFilialId(filialId);
    const resOrders: OrderResponseDto[] = [];
    for (const order of orders) {
        const customer = await services.findCustomerById(order.customerId);
        const customerRes = new CustomerResponseDto(customer);
        const service = await services.findServiceById(order.serviceId);
        const serviceRes = new ServiceResponseDto(service);
        const filial = await services.findFilialById(order.filialId)
        const filialRes = new FilialResponseDto(filial);
        const resOrder = new OrderResponseDto(order);
        resOrder.customer = customerRes;
        resOrder.service = serviceRes;
        resOrder.filial = filialRes;
        resOrder.difficulty = getName(order.difficulty)
        resOrder.urgency = getName(order.urgency)
        resOrder.ordStatus = getStatusName(order.ordStatus)
        resOrders.push(resOrder)
    }

    res.json(resOrders);
}

function getName(numValue: number): string {
    switch (numValue) {
        case 1:
            return "Низький";
        case 2:
            return "Середньо-низький";
        case 3:
            return "Середній";
        case 4:
            return "Середньо-високий";
        case 5:
            return "Високий";
        default:
            return "Невідомо";
    }
}

function getStatusName(numValue: number): string {
    numValue = Math.round(numValue);
    switch (numValue) {
        case 1:
            return "Прийнято";
        case 2:
            return "В процесі";
        case 3:
            return "Готовий до видачі";
        case 4:
            return "Видано";
        default:
            return "Невідомо";
    }
}