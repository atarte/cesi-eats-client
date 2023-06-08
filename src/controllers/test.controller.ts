// import { config, config, config, config } from 'dotenv';
import { Router } from 'express';
import { Mssql } from '../data/mssql.data';

const testController = Router();
export { testController };

const MssqlDB = new Mssql();

testController.get('/', function(req, res, next) {
    // const types = Mssql.
    res.json({ cool: "ok" })
})

testController.get('/types', async function(req, res, next) {
    const types = await MssqlDB.getTypes()

    res.json(types.recordset)
})