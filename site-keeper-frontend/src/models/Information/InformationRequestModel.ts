class InformationRequestModel{
    projectId: number
    disciplineId: number
    info: string
    infoName: string
    
    constructor(projectId: number, disciplineId: number, info: string, infoName: string){
        this.disciplineId = disciplineId
        this.projectId = projectId
        this.info = info
        this.infoName = infoName
    }
}

export default InformationRequestModel