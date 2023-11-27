class UserRequestModel{
    id: number
    fname: string
    lname: string
    role: number
    contactDate: string
    contactInfo: string
    contactPeriod: number

    constructor(id: number, fname: string, lname: string, role: number, contactDate: string,
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

export default UserRequestModel