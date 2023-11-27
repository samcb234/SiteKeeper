import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import FeatureModel from "../../../models/Feature/FeatureModel";
import {config} from "../../../config/Constants";
import UserRequestModel from "../../../models/User/UserRequestModel";
import UserModel from "../../../models/User/UserModel";

export const ManagerDropDown:React.FC<{updateManager: any}> = (props) =>{

    const [users, setUsers] = useState<UserModel[]>([])
    const [selectedUser, setSelectedUser] = useState<UserModel>()

    function getFullName(user:UserRequestModel){
        return [user.fname, user.lname].join(" ");
    }

    useEffect(() => {
        const fetchUsers = async () =>{

            const url = config.API_URL+'/api/user/getAllUsers';
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            const newUsers: UserModel[] = []
            for(let t in responseJson){
                newUsers.push(new UserModel(responseJson[t].id,
                    responseJson[t].fname,
                    responseJson[t].lname,
                    responseJson[t].role,
                    responseJson[t].contactDate,
                    responseJson[t].contactInfo,
                    responseJson[t].contactPeriod
                ))
            }
            setUsers(newUsers);
        }

        fetchUsers()
    },[])


let names = new Array()



    for(let i = 0; i < users.length; i ++){
        names.push(users[i].contactInfo)
    }

    const handleNameChange = (event: any, newValue: any) => { 
        for(let i = 0; i < users.length; i++){
            if(users[i].contactInfo === newValue){
                setSelectedUser(users[i])
                
                props.updateManager(users[i].id)
            }
        }
     };


    return(
        <div className="admin-dropdown">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={names}
                sx={{ width: 300 }}
                onChange={handleNameChange}
                renderInput={(params) => <TextField {...params} label="User"
                
                />}
            />
        </div>
    );
}