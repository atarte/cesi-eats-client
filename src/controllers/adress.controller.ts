import { Router } from 'express';
// import { Mssql } from '../data/mssql.data';

const addressController = Router();
// const MssqlDB = new Mssql();

// Add address to a client with a client id
addressController.get('/:id(\\d+)', async function (req, res, next) {
    
})

export { addressController };