import { connect } from "../db/database";
import { OrderRequestDto } from "../dtos/OrderRequestDto";
import { OrderSum } from "../dtos/OrderSum";
import { Order, Service } from "../models";
import * as customerService from "./customerService"

export async function createOrder(order: OrderRequestDto): Promise<string> {
    const conn = await connect();
    try {
        const { customerId, serviceId, filialId, urgency, difficulty, ordStatus, receiveDate, returnDate } = order;
        const newOrder = new Order(customerId, serviceId, filialId, urgency, difficulty, ordStatus, receiveDate, returnDate);
        const res = await conn.query(`SELECT services.cost FROM services WHERE id = ?`, [serviceId])
        const services = res[0] as Service[]
        const service = services[0];
        const discountProcent = await customerService.updateCustomer(customerId);
        const sumdiff = checkDifficultyOrUrgency(difficulty, service.cost);
        const sumUrgAndDiff = checkDifficultyOrUrgency(urgency, sumdiff);
        newOrder.sbd = sumUrgAndDiff;
        const diff = sumUrgAndDiff * (discountProcent / 100)
        const totalSum = sumUrgAndDiff - diff;
        newOrder.sum = totalSum;
        await conn.query("INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES (?, ?, ?, ?, ?, ?, ?, autoInc(), ?, ?, ?);", [newOrder.customerId, newOrder.serviceId, newOrder.filialId, newOrder.sum, newOrder.sbd, newOrder.urgency, newOrder.difficulty, newOrder.ordStatus, newOrder.receiveDate, newOrder.returnDate])
        await customerService.updateCustomerConsistency(customerId)
        return "Order created";
    } catch (err: any) {
        console.error(err.message)
        return err.message
    }
    finally {
        await conn.end()
    }
}

export async function updateOrder(id: number, order: OrderRequestDto): Promise<string> {
    const conn = await connect();
    try {
        const { customerId, serviceId, filialId, urgency, difficulty, ordStatus, receiveDate, returnDate } = order;
        const updOrder = new Order(customerId, serviceId, filialId, urgency, difficulty, ordStatus, receiveDate, returnDate);
        const res = await conn.query(`SELECT services.cost FROM services WHERE id = ?`, [serviceId])
        const services = res[0] as Service[]
        const service = services[0];
        const discountProcent = await customerService.updateCustomer(customerId);
        const sumdiff = checkDifficultyOrUrgency(difficulty, service.cost);
        const sumUrgAndDiff = checkDifficultyOrUrgency(urgency, sumdiff);
        updOrder.sbd = sumUrgAndDiff;
        const diff = sumUrgAndDiff * (discountProcent / 100)
        const totalSum = sumUrgAndDiff - diff;
        updOrder.sum = totalSum;
        await conn.query("UPDATE `orders` SET serviceId = ?, filialId = ?, sum = ?, sbd = ?, urgency = ?, difficulty = ?, ordStatus = ?, receiveDate = ?, returnDate = ? WHERE `orders`.id = ?", [updOrder.serviceId, updOrder.filialId, updOrder.sum, updOrder.sbd, updOrder.urgency, updOrder.difficulty, updOrder.ordStatus, updOrder.receiveDate, updOrder.returnDate, id])
        return "Order updated";
    } catch (err: any) {
        console.error(err.message)
        return err.message
    }
    finally {
        await conn.end()
    }
}

export async function getOrders(): Promise<Order[]> {
    const conn = await connect();
    try {
        const orders = await conn.query("SELECT * FROM orders ORDER BY receiveDate DESC");
        return orders[0] as Order[];
    }
    catch (err: any) {
        console.error(err.message)
        return []
    }
    finally {
        await conn.end()
    }
}

export async function getOrdersByFilialId(filialId: number): Promise<Order[]> {
    const conn = await connect();
    try {
        const orders = await conn.query("SELECT * FROM orders WHERE orders.filialId = ? ORDER BY receiveDate DESC", [filialId]);
        return orders[0] as Order[];
    }
    catch (err: any) {
        console.error(err.message)
        return []
    }
    finally {
        await conn.end()
    }
}

export async function getOrder(id: number): Promise<Order> {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM orders WHERE orders.id = ? ORDER BY receiveDate DESC", [id]);
        const orders = res[0] as Order[];
        return orders[0];
    }
    catch (err: any) {
        console.error(err.message)
        return new Order(-1, -1, -1, -1, 1, -1, '', '', -1, -1, -1, -1)
    }
    finally {
        await conn.end()
    }
}

export async function getSum(year: string): Promise<number | undefined> {
    try {
        const orders = await getSumAndMonth(year);
        let sum: number = 0
        for (let order of orders!) {
            sum += order.sum
        }

        return sum
    } catch (err: any) {
        console.error(err.message)
    }
}

export async function getSumAndMonth(year: string): Promise<OrderSum[] | undefined> {
    const conn = await connect()
    try {
        const res = await conn.query("SELECT sum, CASE WHEN orders.receiveDate like '%-01-%' THEN 1 WHEN orders.receiveDate like '%-02-%' THEN 2 WHEN orders.receiveDate like '%-03-%' THEN 3 WHEN orders.receiveDate like '%-04-%' THEN 4 WHEN orders.receiveDate like '%-05-%' THEN 5 WHEN orders.receiveDate like '%-06-%' THEN 6 WHEN orders.receiveDate like '%-07-%' THEN 7 WHEN orders.receiveDate like '%-08-%' THEN 8 WHEN orders.receiveDate like '%-09-%' THEN 9 WHEN orders.receiveDate like '%-10-%' THEN 10 WHEN orders.receiveDate like '%-11-%' THEN 11 WHEN orders.receiveDate like '%-12-%' THEN 12 ELSE 0 END AS month FROM cleaner.orders WHERE orders.receiveDate LIKE Concat(?, '%')", [year]);
        const orders = res[0] as OrderSum[];

        return orders
    } catch (err: any) {
        console.error(err.message)
    }
    finally {
        await conn.end()
    }
}

function checkDifficultyOrUrgency(numValue: number, sum: number): number {
    numValue = Math.round(numValue);
    switch (numValue) {
        case 1:
            return sum;
        case 2:
            return sum + 10;
        case 3:
            return sum + 30;
        case 4:
            return sum + 40;
        case 5:
            return sum + 50;
        default:
            return sum;
    }
}