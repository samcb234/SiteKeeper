class FrameworkModel{
    id: number
    description?: string
    terminalId: number
    name: string

    constructor(id: number, description: string, terminalId: number, name: string){
        this.id = id
        this.description = description
        this.terminalId = terminalId
        this.name = name
    }
}

export default FrameworkModel