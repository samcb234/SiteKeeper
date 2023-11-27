class PeripheralModel{
    id: number
    img?:string
    name: string
    description: string

    constructor(id: number, img: string, name: string, description: string){
        this.id = id
        this.img = img
        this.name = name
        this.description = description
    }
}

export default PeripheralModel