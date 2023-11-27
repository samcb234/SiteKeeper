import CostingModel from "../CostingModel"
import DisciplineRoles from "../Roles/DisciplineRoles"
import UserModel from "../User/UserModel"
import BaseDisciplineModel from "./BaseDisciplineModel"

class ProjectDiscipline extends BaseDisciplineModel{//this becomes a DisciplinesOnProjectsObject in the backend
    project: number
    costing: CostingModel | undefined

    constructor(discipline: DisciplineRoles, project: number,
        leadEngineer: UserModel[],
        totalCost: number,
        estimatedBy: UserModel | undefined,
        verified: boolean,
        verifiedBy: UserModel | undefined,
        costing: CostingModel | undefined,
        verificationPending: boolean){
            super(discipline, leadEngineer, totalCost, estimatedBy, verified, verifiedBy, verificationPending)
            this.project = project
            this.costing = costing
        }
}

export default ProjectDiscipline