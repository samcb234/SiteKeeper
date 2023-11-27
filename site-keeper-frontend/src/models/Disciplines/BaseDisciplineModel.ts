import DisciplineRoles from "../Roles/DisciplineRoles"
import UserModel from "../User/UserModel"

class BaseDisciplineModel{
    discipline: DisciplineRoles
    totalCost: number
    estimatedBy: UserModel | undefined
    isVerified: boolean
    verifiedBy: UserModel | undefined
    verificationPending: boolean
    leadEngineers: UserModel[]

    constructor(discipline: DisciplineRoles, leadEngineer: UserModel[], totalCost: number,
        estimatedBy: UserModel | undefined, isVerified: boolean, verifiedBy: UserModel | undefined,
        verificationPending: boolean){
            this.discipline = discipline
            this.totalCost = totalCost
            this.estimatedBy = estimatedBy
            this.isVerified = isVerified
            this.verifiedBy = verifiedBy
            this.verificationPending = verificationPending
            this.leadEngineers = leadEngineer
        }
}

export default BaseDisciplineModel