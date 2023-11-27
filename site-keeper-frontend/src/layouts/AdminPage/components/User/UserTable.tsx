import { useEffect, useState } from "react"
import RoleModel from "../../../../models/Roles/RoleModel"
import UserModel from "../../../../models/User/UserModel"
import { config } from "../../../../config/Constants"
import { UserRow } from "./UserRow"

export const UserTable = () => {
    const [roles, setRoles] = useState<RoleModel[]>([])
    const [users, setUsers] = useState<UserModel[]>([])

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await fetch(config.API_URL + `/api/user/getAllRoles`)
            if(!response.ok){
                throw new Error("something went wrong fetching roles")
            }
            setRoles(await response.json())
        }
        fetchRoles()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(config.API_URL + `/api/user/getAllUsers`)
            if(!response.ok){
                throw new Error("something went wrong fetching users")
            }
            const responseJson = await response.json()

            const newUsers: UserModel[] = []
            for(let r in responseJson){
                newUsers.push(new UserModel(responseJson[r].id,
                    responseJson[r].fname,
                    responseJson[r].lname,
                    responseJson[r].role,
                    responseJson[r].contactDate,
                    responseJson[r].contactInfo,
                    responseJson[r].contactPeriod))
            }
            setUsers(newUsers)
        }
        fetchUsers()
    }, [])

    return(
        <table className="table table-hover bg-primary">
                                <thead>
                                <tr className="bg-primary">
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(user => (
                                    <UserRow user={user} roles={roles} key={user.id}/>
                                ))}
                                </tbody>
                            </table>
    )
}