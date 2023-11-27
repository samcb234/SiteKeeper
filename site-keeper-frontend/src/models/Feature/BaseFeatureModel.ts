class BaseFeatureModel{
    id: number
    cost: number
    name: string
    img?: string
    description: string

    constructor(id: number, cost: number, name: string, img: string, description: string){
        this.id = id
        this.cost = cost
        this.name = name
        this.img = img
        this.description = description
    }
}

export default BaseFeatureModel