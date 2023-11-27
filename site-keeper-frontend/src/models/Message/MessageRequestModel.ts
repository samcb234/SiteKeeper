import UserRequestModel from "../User/UserRequestModel";

class MessageRequestModel{
    sender: UserRequestModel
    costing: number | null
    message: string
    dateSent: string

    constructor(sender: UserRequestModel,
        costing: number | null,
        message: string,
        dateSent: string){
            this.sender = sender
            this.costing = costing
            this.message = message
            this.dateSent = dateSent
        }
}

export default MessageRequestModel