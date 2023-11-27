import AlternateFeatureName from "../AlternateFeatureName"
import ProjectDiscipline from "../Disciplines/DisciplineRequestModel"
import FeatureModel from "../Feature/FeatureModel"
import FrameworkModel from "../Inventory/FrameworkModel"
import InventoryModel from "../Inventory/InventoryModel"
import Terminal from "../Inventory/Terminal"
import UserModel from "../User/UserModel"
import ProjectStatus from "./ProjectStatus"

class ProjectModel{
    id: number
    startDate: string
    endDate: string
    name: string
    totalHours: number
    costingId: string
    projectManager: UserModel
    features: AlternateFeatureName[]
    terminals: Terminal[]
    frameworks: FrameworkModel[]
    middleware: InventoryModel[]
    hosts: InventoryModel[]
    disciplines: ProjectDiscipline[]
    status: ProjectStatus;


    constructor(id: number, startDate: string, endDate: string, name: string, status: ProjectStatus, 
        totalHours: number, costingId: string, projectManager: UserModel, features: AlternateFeatureName[],
        terminals: Terminal[], frameworks: FrameworkModel[], middleware: InventoryModel[], hosts: InventoryModel[], disciplines: ProjectDiscipline[]){
            this.id = id
            this.startDate = startDate
            this.endDate = endDate
            this.name = name
            this.status = status
            this.totalHours = totalHours
            this.projectManager = projectManager
            this.features = features
            this.terminals = terminals
            this.frameworks = frameworks
            this.middleware = middleware
            this.hosts = hosts
            this.disciplines = disciplines
            this.costingId = costingId
        }
}

export default ProjectModel