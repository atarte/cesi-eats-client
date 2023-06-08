import { Router } from 'express';
import { ClientData } from '../data/mssql.data';
import { User, convertQueryResToUser, convertQueryResToUsersList } from '../models/user.model';
import { Error400 } from '../errors/errors';

const clientController = Router();
const MssqlDB = new ClientData();

// Get user by id
clientController.get('/:id(\\d+)', async(req, res, next)  =>{
    try {
        const query_res = await MssqlDB.GetUserById(req.params.id)
        const user: User = convertQueryResToUser(query_res)

        res.json(user)

    } catch (err) {
        next(err)
    }
});

// Get all users
clientController.get('/all', async(req, res, next) => {
    try {
        const query_res = await MssqlDB.GetUsers()
        const users_list = convertQueryResToUsersList(query_res)

        res.json(users_list)

    } catch (err) {
        next(err)
    }
});

// Add client
clientController.post('/add', async(req, res, next) => {
    try {
        const email: string = req.body.email
        if(email === undefined) throw new Error400("Missing argument, 'email' can not be NULL")
        if(email === "") throw new Error400("Empty argument, 'email' can not be empty");
            
        const password: string = req.body.password
        if (password === undefined) throw new Error400("Missing argument, 'password' can not be null")
        if (password === "") throw new Error400("Empty argument, 'password' can not be EMPTY");

        const name: string = req.body.name
        if (name === undefined) throw new Error400("Missing argument, 'name' can not be NULL")
        if (name === "") throw new Error400("Empty argument, name can not be empty");

        const first_name: string = req.body.first_name
        if (first_name === undefined) throw new Error400("Missing argument, 'first_name' can not be null")
        if (first_name === "") throw new Error400("Empty argument, 'first_name' can not be EMPTY");

        await MssqlDB.InsertUser(email, password, name, first_name)

        // var user: User = new User()
        // await MssqlDB.InsertUser(user{
        //     email: email,
        //     password: password,
        //     name: name,
        //     first_name: first_name,
        //     id_types: 6
        // })

        res.sendStatus(200)
        
    } catch (err) {        
        next(err)
    }
})

// Delete client by id
clientController.delete('/delete/:id(\\d+)', async(req, res, next) => {
    try {
        // const id_users: string = req.body.id_users
        // if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        // if (id_users === "") throw new Error400("Empty argument, 'id_users' can not be empty");

        await MssqlDB.DeleteUserById(req.params.id)

        res.sendStatus(200)

    } catch (err) {
        next(err)
    }
})

// Update client email by id
clientController.put('/update/email', async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        const email: string = req.body.email
        if (email === undefined) throw new Error400("Missing argument, 'email' can not be NULL")
        if (email === "") throw new Error400("Empty argument, 'email' can not be empty");

        await MssqlDB.UpdateUserEmailById(id_users, email)

        res.sendStatus(200)

    } catch (err) {
        next(err)
    }
})

// Update client password by id
clientController.put('/update/password', async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        const password: string = req.body.password
        if (password === undefined) throw new Error400("Missing argument, 'password' can not be NULL")
        if (password === "") throw new Error400("Empty argument, 'password' can not be empty");

        await MssqlDB.UpdateUserPasswordById(id_users, password)

        res.sendStatus(200)

    } catch (err) {
        next(err)
    }
})

// Update client name by id 
clientController.put('/update/name', async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        const name: string = req.body.name
        if (name === undefined) throw new Error400("Missing argument, 'name' can not be NULL")
        if (name === "") throw new Error400("Empty argument, 'name' can not be empty");

        await MssqlDB.UpdateUserNameById(id_users, name)

        res.sendStatus(200)
        
    } catch (err) {
        next(err)
    }
})

// Update client first_name by id
clientController.put('/update/first_name', async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        const first_name: string = req.body.first_name
        if (first_name === undefined) throw new Error400("Missing argument, 'first_name' can not be NULL")
        if (first_name === "") throw new Error400("Empty argument, 'first_name' can not be empty");

        await MssqlDB.UpdateUserFirstNameById(id_users, first_name)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// Update client parrain by id
clientController.put('/update/parrain',async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        const id_parrain: number = req.body.id_parrain
        if (id_parrain === undefined) throw new Error400("Missing argument, 'id_parrain' can not be NULL")
        if (id_parrain < 0) throw new Error400("Out of range argument, 'id_parrain' can not be a negative number");
        

        await MssqlDB.UpdateIdParrainById(id_users, id_parrain)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// Remove client parrain by id
clientController.put('/update/parrain/remove', async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        await MssqlDB.UpdateIdParrainById(id_users, null)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// Verify if email has already been use
clientController.get('/verify/email/:email',async (req, res, next) => {
    try {
        const email: string = req.params.email
        if (email === undefined) throw new Error400("Missing argument, 'email' can not be NULL")
        if (email === "") throw new Error400("Empty argument, 'email' can not be empty");

        const query_res = await MssqlDB.GetUserByEmail(email)

        if (query_res.rowsAffected != 0) {
            res.status(200)
                .json({
                    message: "This email is already being used",
                    result: true
            })
        } else {
            res.status(200)
                .json({
                    message: "This email has not been used",
                    result: false
                })
        }
    } catch (err) {
        next(err)
    }
})

// Verify if password is correct by id
clientController.get('/verify/password/',async (req, res, next) => {
    try {
        const id_users: number = req.body.id_users
        if (id_users === undefined) throw new Error400("Missing argument, 'id_users' can not be NULL")
        if (id_users < 0) throw new Error400("Out of range argument, 'id_users' can not be a negative number");

        const password: string = req.body.password
        if (password === undefined) throw new Error400("Missing argument, 'password' can not be NULL")
        if (password === "") throw new Error400("Empty argument, 'password' can not be empty");

        const query_res = await MssqlDB.GetUserPasswordById(id_users)

        res.json(query_res)
        // if (query_res.recordset[0].Password == password) {
        //     res.status(200)
        //         .json({
        //             message: "This password is correct",
        //             result: true
        //         })
        // } else {
        //     res.status(200)
        //         .json({
        //             message: "This password is incorrect",
        //             result: false
        //         })
        // }
    } catch (err) {
        next(err)
    }
})

export { clientController };