export interface User {
    id_users?: number
    email?: string
    password?: string
    name?: string
    first_name?: string
    // token?: string
    // refresh_tocken?: string
    // id_types?: number
    id_parrain?: number
}

export function convertQueryResToUser(query_res: any): User {
    const res_user: any = query_res.recordset[0]

    return {
        id_users: res_user.Id_Users,
        email: res_user.Email,
        name: res_user.Name,
        first_name: res_user.First_Name,
        id_parrain: res_user.Id_Parrain,
    }
}

 export function convertQueryResToUsersList(query_res: any): User[] {
    let users_list: User[] = []

    for (let i = 0; i < query_res.rowsAffected[0]; i++) {
        let res_user: any = query_res.recordset[i]

        users_list.push({
            id_users: res_user.Id_Users,
            email: res_user.Email,
            name: res_user.Name,
            first_name: res_user.First_Name,
            id_parrain: res_user.Id_Parrain,
        })
    }

    return users_list
}

export function convertApiRequestToUsers(): User {
    return {
        
    }
}