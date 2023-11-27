class PeripheralRequestModel{
    img?: string
    description: string
    name: string

    constructor(img: string, description: string, name: string){
        this.img = img
        this.description = description
        this.name = name
    }
}

export default PeripheralRequestModel