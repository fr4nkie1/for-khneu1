import { connect } from "../db/database";
import { CustomerRequestDto } from "../dtos/CustomerRequestDto";
import { Customer } from "../models";

export async function addCustomer(customer: CustomerRequestDto): Promise<string> {
    const conn = await connect();
    try {
        const { firstName, lastName, surName, phoneNumber } = customer;
        const newCustomer = new Customer(firstName, lastName, surName, phoneNumber, false, 0, 0);
        await conn.query(`INSERT INTO customers SET ?`, [newCustomer])
        return "Customer created";
    }
    catch (err: any) {
        console.error(err.message)
        return err.message;
    }
    finally {
        await conn.end()
    }
}

export async function updateCustomerFull(id: number, customer: CustomerRequestDto): Promise<string> {
    const conn = await connect();
    try {
        const customerDB = await findCustomerById(id);
        if (customerDB.id != -1) {
            await conn.query("UPDATE `customers` SET `customers`.firstName = ?, `customers`.lastName = ?, `customers`.surName = ?, `customers`.phoneNumber = ? WHERE customers.id = ?", [customer.firstName, customer.lastName, customer.surName, customer.phoneNumber, id]);
            return "Customer updated";
        }

        return "Customer not found";
    }
    catch (err: any) {
        console.error(err.message)
        return err.message;
    }
    finally {
        await conn.end()
    }

}

export async function updateCustomer(id: number): Promise<number> {
    const conn = await connect();
    try {
        const customer = await findCustomerById(id);
        const checkedCustomer = checkAndUpdateCustomer(customer);
        await conn.query(`UPDATE customers SET ? WHERE id = ?`, [checkedCustomer, id])
        const discount = getDiscount(customer);
        return discount;
    }
    catch (err: any) {
        console.error(err.message)
        return -1;
    }
    finally {
        await conn.end()
    }

}

export async function updateCustomerConsistency(id: number): Promise<void> {
    const conn = await connect();
    try {
        const customer = await findCustomerById(id);
        await conn.query(`UPDATE customers SET ? WHERE id = ?`, [customer, id])
    }
    catch (err: any) {
        console.error(err.message)
    }
    finally {
        await conn.end()
    }

}

export async function findCustomerById(id: number): Promise<Customer> {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT `customers`.id, `customers`.firstName, `customers`.lastName, `customers`.surName, `customers`.phoneNumber, CASE WHEN orderCount >= 2 THEN 1 ELSE 0 END AS isRepeatCustomer, COUNT(`orders`.id) as orderCount FROM `cleaner`.`customers` LEFT JOIN `cleaner`.`orders` ON `orders`.customerId = `customers`.id WHERE customers.id = ? GROUP BY `customers`.id, `customers`.firstName, `customers`.lastName, `customers`.surName, `customers`.phoneNumber, `customers`.isRepeatCustomer", [id])
        const customers = res[0] as Customer[]
        return customers[0];
    }
    catch (err: any) {
        console.error(err.message)
        return new Customer('', '', '', '', false, -1, -1);
    }
    finally {
        await conn.end()
    }
}

export async function findCustomer(lastName: string): Promise<Customer> {
    const conn = await connect();
    try {
        const res = await conn.query(`SELECT * FROM customers WHERE lastName = ?`, [lastName])
        const customers = res[0] as Customer[]
        return customers[0];
    }
    catch (err: any) {
        console.error(err.message)
        return new Customer('', '', '', '', false, -1, -1);
    }
    finally {
        await conn.end()
    }
}

export async function getCustomers(): Promise<Customer[]> {
    const conn = await connect();
    try {
        const customers = await conn.query("SELECT `customers`.id, `customers`.firstName, `customers`.lastName, `customers`.surName, `customers`.phoneNumber, CASE WHEN orderCount >= 2 THEN 1 ELSE 0 END AS isRepeatCustomer, COUNT(`orders`.id) as orderCount FROM `cleaner`.`customers` LEFT JOIN `cleaner`.`orders` ON `orders`.customerId = `customers`.id GROUP BY `customers`.id, `customers`.firstName, `customers`.lastName, `customers`.surName, `customers`.phoneNumber, `customers`.isRepeatCustomer;");
        return customers[0] as Customer[];
    }
    catch (err: any) {
        console.error(err)
        return []
    }
    finally {
        await conn.end()
    }
}

function checkAndUpdateCustomer(customer: Customer): Customer {
    customer.isRepeatCustomer = customer.orderCount >= 2;
    customer.orderCount++;
    return customer;
}

function getDiscount(customer: Customer): number {
    return customer.orderCount >= 2 ? 3 : 0;
}