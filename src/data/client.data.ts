import { User} from "../models/user.model"
import { mssql, sqlConfig } from "../services/mssql.service"
const sql = require('mssql')

const mssqlDB = new mssql();

export class ClientData {

    public async GetUserById(id_users: number) {
        const pool = await await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', sql.Int, id_users)

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

    // public async InsertUser(email: string, password: string, name: string, first_name: string) {
    public async InsertUser(user: User) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('email', sql.NVarChar, user.email)
        request.input('password', sql.NVarChar, user.password)
        request.input('name', sql.NVarChar, user.name)
        request.input('first_name', sql.NVarChar, user.first_name)

        await request.query('INSERT INTO Users (Email, Password, Name, First_Name, Id_Types) VALUES (@email, @password, @name, @first_name, 6)')

        pool.close()
    }

    public async DeleteUserById(id_users: number) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', sql.Int, id_users)

        await request.query('DELETE FROM Users WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserEmailById(user: User) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', sql.Int, user.id_users)
        request.input('email', sql.NVarChar, user.email)

        await request.query('UPDATE Users SET Email = @email WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserPasswordById(user: User) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', sql.Int, user.id_users)
        request.input('password', sql.NVarChar, user.password)

        await request.query('UPDATE Users SET Password = @password WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserNameById(user: User) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)
        
        var request = pool.request()

        request.input('id_users', sql.Int, user.id_users)
        request.input('name', sql.NVarChar, user.name)

        await request.query('UPDATE Users SET Name = @name WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateUserFirstNameById(user: User) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', sql.Int, user.id_users)
        request.input('first_name', sql.NVarChar, user.first_name)

        await request.query('UPDATE Users SET First_Name = @first_name WHERE Id_Users = @id_users')

        pool.close()
    }

    public async UpdateIdParrainById(user: User) {
        var pool = await mssqlDB.get(sqlConfig.name, sqlConfig.config)

        var request = pool.request()

        request.input('id_users', sql.Int, user.id_users)
        request.input('id_parrain', sql.Int, user.id_parrain)

        await request.query('UPDATE Users SET Id_Parrain = @id_parrain WHERE Id_Users = @id_users')

        pool.close()
    }
}