import MessageModel from "./Message/MessageModel"

class CostingModel {
    id: number
    cost: number
    costingIdentifier: string
    messages: MessageModel[]

    constructor(id: number, cost: number, costingIdentifier: string, messages: MessageModel[]){
        this.id = id
        this.cost = cost
        this.costingIdentifier = costingIdentifier
        this.messages = messages
    }
}

export default CostingModel