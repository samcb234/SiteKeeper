class DisciplineModel{
    id: number
    type: string
    leadEngineer: number
    totalCost?: number
    estimatedBy?: number
    verified: boolean
    verifiedBy?: number

    constructor(id: number, type: string,
        leadEngineer: number,
        totalCost: number,
        estimatedBy: number,
        verified: boolean,
        verifiedBy: number){
            this.id = id
            this.type = type
            this.leadEngineer = leadEngineer
            this.totalCost = totalCost
            this.estimatedBy = estimatedBy
            this.verified = verified
            this.verifiedBy = verifiedBy
        }

}

export default DisciplineModel