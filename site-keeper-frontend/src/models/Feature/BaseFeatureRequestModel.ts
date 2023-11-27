import { DisciplinePage } from '../../layouts/DisciplinePage/DisciplinePage';
class BaseFeatureRequestModel{
    id: number
    img?: string
    description: string
    cost: number

    constructor(id: number, img: string, description: string, cost : number){
        this.id = id
        this.img = img
        this.description = description
        this.cost = cost
    }
}

export default BaseFeatureRequestModel