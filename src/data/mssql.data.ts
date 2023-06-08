import { Error500 } from "../errors/errors"
import { User } from "../models/user.model"
import { mssql, sqlConfig } from "../services/mssql.service"

// const sql = require('mssql')
// const config = require('../config')

// const sqlConfig = {
//     user: config.sql.user,
//     password: config.sql.password,
//     database: config.sql.database,
//     server: config.sql.server,
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: false, // for azure
//         trustServerCertificate: true // change to true for local dev / self-signed certs
//     }
// }

// const MssqlDB = sql.connect(sqlConfig)
const mssqlDB = new mssql();

export class ClientData {

    public async GetUserById(id_users: number) {
        const pool = await await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)

        const res = await request.query('SELECT Id_Users, Email, Name, First_Name, Id_Parrain FROM Users WHERE Id_Users = @id_users AND Id_Types = 6')

        pool.close()

        return res
    }

    public async GetUsers() {
        const pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        const res = await request.query('SELECT Id_Users, Email, Name, First_Name, Id_Parrain FROM Users WHERE Id_Types = 6')
        
        pool.close()

        return res
    }

    public async InsertUser(email: string, password: string, name: string, first_name: string) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('email', pool.NVarChar, email)
        request.input('password', pool.NVarChar, password)
        request.input('name', pool.NVarChar, name)
        request.input('first_name', pool.NVarChar, first_name)

        await request.query('INSERT INTO Users (Email, Password, Name, First_Name, Id_Types) VALUES (@email, @password, @name, @first_name, 6)')

        pool.close()
    }

    public async DeleteUserById(id_users: number) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)

        await request.query('DELETE FROM Users WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserEmailById(id_users: number, email: string) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)
        request.input('email', pool.NVarChar, email)

        await request.query('UPDATE Users SET Email = @email WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserPasswordById(id_users: number, password: string) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)
        request.input('password', pool.NVarChar, password)

        await request.query('UPDATE Users SET Password = @password WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserNameById(id_users: number, name: string) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)
        
        var request = pool.request()

        request.input('id_users', pool.Int, id_users)
        request.input('name', pool.NVarChar, name)

        await request.query('UPDATE Users SET Name = @name WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserFirstNameById(id_users: number, first_name: string) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)
        request.input('first_name', pool.NVarChar, first_name)

        await request.query('UPDATE Users SET First_Name = @first_name WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateIdParrainById(id_users: number, id_parrain: number | null) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)
        request.input('id_parrain', pool.Int, id_parrain)

        await request.query('UPDATE Users SET Id_Parrain = @id_parrain WHERE Id_Users = @id_users')

        pool.close()
    }

    public async GetUserByEmail(email: string) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)
        
        var request = pool.request()

        request.input('email', pool.NVarChar, email)

        const res = await request.query('SELECT Id_Users FROM Users WHERE Email = @email')

        pool.close()

        return res
    }

    public async GetUserPasswordById(id_users: number) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', pool.Int, id_users)
        
        const res = await request.query('SELECT Password FROM Users WHERE Id_Users = @id_users')
        
        pool.close()

        return 
    }
}