import { Error400 } from "../errors/errors"

export class User {
    id_users?: number
    email?: string
    password?: string
    name?: string
    first_name?: string
    id_parrain?: number

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    public IsIdUsersValid(): boolean {
        if (this.id_users === undefined) {
            throw new Error400("Missing argument, 'id_users' can not be NULL")
        }
        if (this.id_users < 0) {
            throw new Error400("Out of range argument, 'id_users' can not be a negative number")
        }
        return true
    }

    public IsEmailValid(): boolean {
        if (this.email === undefined) {
            throw new Error400("Missing argument, 'email' can not be NULL")
        }
        if (this.email === "") {
            throw new Error400("Empty argument, 'email' can not be empty")
        }
        return true
    }

    public IsPasswordValid(): boolean {
        if (this.password === undefined) {
            throw new Error400("Missing argument, 'password' can not be null")
        }
        if (this.password === "") {
            throw new Error400("Empty argument, 'password' can not be EMPTY")
        }
        return true
    }

    public IsNameValid(): boolean {
        if (this.name === undefined) {
            throw new Error400("Missing argument, 'name' can not be NULL")
        }
        if (this.name === "") {
            throw new Error400("Empty argument, name can not be empty")
        }
        return true
    }

    public IsFirstNameValid(): boolean {
        if (this.first_name === undefined) {
            throw new Error400("Missing argument, 'first_name' can not be null")
        }
        if (this.first_name === "") {
            throw new Error400("Empty argument, 'first_name' can not be EMPTY")
        }
        return true
    }

    public IsIdParrainValid(): boolean {
        if (this.id_parrain === undefined) {
            throw new Error400("Missing argument, 'id_parrain' can not be NULL")
        }
        if (this.id_parrain < 0) {
            throw new Error400("Out of range argument, 'id_parrain' can not be a negative number")
        }
        return true
    }
}

// Convert the result send by the database into a single user struct
export function convertQueryResToUser(query_res: any): User {
    const res_user: any = query_res.recordset[0]

    return new User({
        id_users: res_user.Id_Users,
        email: res_user.Email,
        name: res_user.Name,
        first_name: res_user.First_Name,
        id_parrain: res_user.Id_Parrain,
    })
}

// Convert the result send by the database into a array of user struct
export function convertQueryResToUsersList(query_res: any): User[] {
    let users_list: User[] = []

    for (let i = 0; i < query_res.rowsAffected[0]; i++) {
        let res_user: any = query_res.recordset[i]

        users_list.push(new User({
            id_users: res_user.Id_Users,
            email: res_user.Email,
            name: res_user.Name,
            first_name: res_user.First_Name,
            id_parrain: res_user.Id_Parrain,
        }))
    }

    return users_list
}
