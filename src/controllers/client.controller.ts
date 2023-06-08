import { Router } from 'express';
import { ClientData } from '../data/client.data';
import { User, convertQueryResToUser, convertQueryResToUsersList } from '../models/user.model';

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
        const user: User =  new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            first_name: req.body.first_name
        })

        user.IsEmailValid()
        user.IsPasswordValid()
        user.IsNameValid()
        user.IsFirstNameValid()

        await MssqlDB.InsertUser(user)

        res.sendStatus(200)
        
    } catch (err) {        
        next(err)
    }
})

// Delete client by id
clientController.delete('/delete/:id(\\d+)', async(req, res, next) => {
    try {
        await MssqlDB.DeleteUserById(req.params.id)

        res.sendStatus(200)

    } catch (err) {
        next(err)
    }
})

// Update client email by id
clientController.put('/update/email', async (req, res, next) => {
    try {
        let user: User = new User({
            id_users: req.body.id_users,
            email: req.body.email,
        })

        user.IsIdUsersValid()
        user.IsEmailValid()

        await MssqlDB.UpdateUserEmailById(user)

        res.sendStatus(200)

    } catch (err) {
        next(err)
    }
})

// Update client password by id
clientController.put('/update/password', async (req, res, next) => {
    try {
        let user: User = new User({
            id_users: req.body.id_users,
            password: req.body.password,
        })

        user.IsIdUsersValid()
        user.IsPasswordValid()

        await MssqlDB.UpdateUserPasswordById(user)

        res.sendStatus(200)

    } catch (err) {
        next(err)
    }
})

// Update client name by id 
clientController.put('/update/name', async (req, res, next) => {
    try {
        let user: User = new User({
            id_users: req.body.id_users,
            name: req.body.name,
        })

        user.IsIdUsersValid()
        user.IsNameValid()

        await MssqlDB.UpdateUserNameById(user)

        res.sendStatus(200)
        
    } catch (err) {
        next(err)
    }
})

// Update client first name by id
clientController.put('/update/first_name', async (req, res, next) => {
    try {
        let user: User = new User({
            id_users: req.body.id_users,
            first_name: req.body.first_name,
        })

        user.IsIdUsersValid()
        user.IsFirstNameValid()

        await MssqlDB.UpdateUserFirstNameById(user)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// Update client parrain by id
clientController.put('/update/parrain',async (req, res, next) => {
    try {
        let user: User = new User({
            id_users: req.body.id_users,
            id_parrain: req.body.id_parrain,
        })

        user.IsIdUsersValid()
        user.IsIdParrainValid()

        await MssqlDB.UpdateIdParrainById(user)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// Remove client parrain by id
clientController.put('/remove/parrain/', async (req, res, next) => {
    try {
        let user: User = new User({
            id_users: req.body.id_users,
            id_parrain: undefined,
        })

        user.IsIdUsersValid()

        await MssqlDB.UpdateIdParrainById(user)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

export { clientController };