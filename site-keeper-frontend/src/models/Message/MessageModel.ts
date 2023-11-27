import UserRequestModel from "../User/UserRequestModel";
import CostingModel from "../CostingModel";

class MessageModel{
    id: number
    sender: UserRequestModel
    costing: CostingModel | null
    message: string
    dateSent: string

    constructor(id: number,
        sender: UserRequestModel,
        costing: CostingModel | null,
        message: string,
        dateSent: string){
            this.id = id
            this.sender = sender
            this.costing = costing
            this.message = message
            this.dateSent = dateSent
        }
}

export default MessageModel