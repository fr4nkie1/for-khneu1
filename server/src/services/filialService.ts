import { connect } from "../db/database";
import { Filial } from "../models/Filial";

export async function getFilials(): Promise<Filial[]> {
    const conn = await connect();
    try {
        const filials = await conn.query("SELECT * FROM filials");
        return filials[0] as Filial[];
    }
    catch (err: any) {
        console.error(err.message)
        return []
    }
    finally {
        await conn.end()
    }
}

export async function findFilialById(id: number): Promise<Filial> {
    const conn = await connect();
    try {
        const res = await conn.query(`SELECT * FROM filials WHERE id = ?`, [id])
        const filials = res[0] as Filial[]
        return filials[0];
    } catch (err: any) {
        console.error(err.message)
        return new Filial('', '', -1)
    }
    finally {
        await conn.end()
    }
}