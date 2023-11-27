import exp from "constants"

class InventoryModel{
    id:number
    img?: string
    description?: string
    name: string

    constructor(id:number, img: string, description: string, name: string){
        this.id = id
        this.img = img
        this.description = description
        this.name = name
    }
}

export default InventoryModel