import { createPool } from 'mysql2/promise';

export async function connect() {
    const connection = await createPool({
        host: process.env.MYSQL_HOST ?? '127.0.0.1',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        connectionLimit: 10  
    });

    return connection;
}

