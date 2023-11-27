import AlternateFeatureName from "../AlternateFeatureName"
import ProjectDiscipline from "../Disciplines/DisciplineRequestModel"
import UserModel from "../User/UserModel"
import FeatureModel from "../Feature/FeatureModel"
import ProjectStatus from "./ProjectStatus"

class ProjectRequestModel {
    startDate: string
    endDate: string
    name: string
    status: ProjectStatus | null
    totalHours: number
    costingId: string
    projectManager: UserModel | null
    similarProjects: number[]
    features: AlternateFeatureName[]
    disciplines: ProjectDiscipline[]

    constructor(startDate: string, endDate: string, name: string,
        status: ProjectStatus | null, totalHours: number, costingId: string, projectManager: UserModel | null, similarProjects: number[],
        features: AlternateFeatureName[], disciplines: ProjectDiscipline[]){
            this.startDate = startDate
            this.endDate = endDate
            this.name = name
            this.status = status
            this.totalHours = totalHours
            this.projectManager = projectManager
            this.similarProjects = similarProjects
            this.features = features
            this.disciplines = disciplines
            this.costingId = costingId
        }
}

export default ProjectRequestModel