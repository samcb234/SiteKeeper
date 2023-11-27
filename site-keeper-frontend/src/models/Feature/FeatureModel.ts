import DisciplineType from "../Disciplines/DisciplineTypeModel"

class FeatureModel{
    id: number
    description: string
    img?: string
    name: string
    verifiedByEngineer: boolean
    disciplines: DisciplineType[]
    parentFeature: FeatureModel | null


    constructor(id: number, description: string, img: string, name: string, verifiedByEngineer: boolean, disciplines: DisciplineType[], parentFeature: FeatureModel | null){

        this.id = id
        this.description = description
        this.img = img
        this.name = name
        this.verifiedByEngineer = verifiedByEngineer
        this.disciplines = disciplines
        this.parentFeature = parentFeature
    }
}
export default FeatureModel