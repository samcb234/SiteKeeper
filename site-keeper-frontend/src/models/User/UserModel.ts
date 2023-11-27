import RoleModel from "../Roles/RoleModel"

class UserModel{
    id: number
    fname: string
    lname: string
    role: RoleModel
    contactDate: string
    contactInfo: string
    contactPeriod: number

    constructor(id: number, fname: string, lname: string, role: RoleModel, contactDate: string,
        contactInfo: string, contactPeriod: number){
        this.id = id
        this.fname = fname
        this.lname = lname
        this.role = role
        this.contactDate = contactDate
        this.contactInfo = contactInfo
        this.contactPeriod = contactPeriod
    }
}

export default UserModel