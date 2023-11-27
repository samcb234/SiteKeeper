import { useEffect, useState } from "react";
import RoleModel from "../../../../models/Roles/RoleModel";
import UserModel from "../../../../models/User/UserModel";
import UserRequestModel from "../../../../models/User/UserRequestModel";
import { config } from "../../../../config/Constants";

export const UserRow: React.FC<{ user: UserModel, roles: RoleModel[] }> = (props) => {
    const [curRole, setCurRole] = useState<RoleModel>(props.user.role)

    useEffect(() => {
        const updateUser = async () => {
            const updatedUser = new UserRequestModel(props.user.id,
                props.user.fname,
                props.user.lname,
                curRole.id,
                props.user.contactDate,
                props.user.contactInfo,
                props.user.contactPeriod)
    
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            }
    
            const response = await fetch(config.API_URL + `/api/user/updateUser?id=${props.user.id}`, requestOptions)
            if (!response.ok) {
                throw new Error("something went wrong updating this user")
            }
    
        }
        if(curRole.id !== props.user.id){
            updateUser()
        }
    }, [curRole])

    return (
        <tr className="bg-primary">
            <th scope="row">{props.user.id}</th>
            <td>{`${props.user.fname} ${props.user.lname}`}</td>
            <td>{props.user.contactInfo}</td>
            <td>
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button"
                        id="roleDropDown" data-bs-toggle="dropdown" aria-expanded='false'>
                        {curRole.role}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="roleDropDown">
                        {props.roles.map(role => (
                            <li key={role.id} onClick={() => setCurRole(role)}>
                                <a className="dropdown-item" href="#">
                                    {role.role}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </td>
        </tr>
    )
}