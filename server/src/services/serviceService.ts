import { connect } from "../db/database";
import { Service } from "../models/Service";

export async function getServices(): Promise<Service[]> {
    const conn = await connect();
    try {
        const services = await conn.query("SELECT * FROM services");
        return services[0] as Service[];
    }
    catch (err: any) {
        console.error(err.message)
        return []
    }
    finally {
        await conn.end()
    }
}

export async function findServiceById(id: number): Promise<Service> {
    const conn = await connect();
    try {
        const res = await conn.query(`SELECT * FROM services WHERE id = ?`, [id])
        const services = res[0] as Service[]
        return services[0];
    }
    catch (err: any) {
        console.error(err.message)
        return new Service('', -1, -1, -1)
    }
    finally {
        await conn.end()
    }
}