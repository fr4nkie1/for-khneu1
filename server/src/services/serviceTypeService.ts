import { connect } from "../db/database";
import { ServiceType } from "../models/ServiceType";

export async function getServiceType(id: number): Promise<ServiceType> {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM `serviceType` WHERE `serviceType`.id = ?", [id]);
        const serviceTypes = res[0] as ServiceType[]
        return serviceTypes[0];
    } catch (err: any) {
        console.error(err.message)
        return new ServiceType('', -1)
    }
    finally {
        await conn.end()
    }
}

export async function getServiceTypes(): Promise<ServiceType[]> {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM `serviceType`");
        const serviceTypes = res[0] as ServiceType[]
        return serviceTypes;
    } catch (err: any) {
        console.error(err.message)
        return []
    }
    finally {
        await conn.end()
    }
}