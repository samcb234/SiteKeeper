class InformationModel {
    id: number
    disciplineId: number
    projectId: number
    info: string
    infoName: string

    constructor(id: number, disciplineId: number, projectId: number, info: string, infoName: string){
        this.id = id
        this.disciplineId = disciplineId
        this.projectId = projectId
        this.info = info
        this.infoName = infoName
    }
}

export default InformationModel