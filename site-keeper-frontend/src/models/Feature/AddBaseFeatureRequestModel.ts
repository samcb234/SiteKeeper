class AddBaseFeatureRequestModel{
    img?: string
    description: string
    cost: number
    name: string

    constructor(img: string, description: string, cost : number, name: string){
        this.img = img
        this.description = description
        this.cost = cost
        this.name = name
    }
}

export default AddBaseFeatureRequestModel