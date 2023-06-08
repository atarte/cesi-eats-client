const MssqlDB = require('mssql')
import { ConnectionPool } from "mssql";
const pools = new Map()
const config = require('../config')

export const sqlConfig = {
    name: config.sql.pool_name,
    config: {
        driver: config.sql.dirver,
        server: config.sql.server,
        database: config.sql.database,
        user: config.sql.user,
        password: config.sql.password,
        pool: {
            max: 10,
            min: 0
        },
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    }
}

export class mssql {
    /**
     * Get or create a pool. If a pool doesn't exist the config must be provided.
     * If the pool does exist the config is ignored (even if it was different to the one provided
     * when creating the pool)
     *
     * @param {string} name
     * @param  [dataConfig]
     * @return {Promise.<mssql.ConnectionPool>}
     */
    public get(name: string, dataConfig) {

        if (!pools.has(name)) {

            if (!dataConfig) {
                throw new Error('Pool does not exist');
            }

            const pool = new MssqlDB.ConnectionPool(dataConfig);

            // automatically remove the pool from the cache if `pool.close()` is called
            const close = pool.close.bind(pool);
            pool.close = (...args) => {
                pools.delete(name);
                return close(...args);
            }
            pools.set(name, pool.connect());
        }

        return pools.get(name);
    }

    public close(name) {
        const pool = pools.get(name)
        if (!pool) {
            throw Error(`Pool ${name} does not exist`)
        }
        return pool.close()
    }
    /**
     * Closes all the pools and removes them from the store
     *
     * @return {Promise<mssql.ConnectionPool[]>}
     */
    public async closeAll() {
        const promises = Array.from(pools.values()).map(pool => pool.close());
        Promise.all(promises);
    }
}