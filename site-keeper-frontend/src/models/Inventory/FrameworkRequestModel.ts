class FrameworkRequest{

    description?: string
    terminalId: number
    name: string


    constructor( description: string, terminalId: number, name: string){

        this.description = description
        this.terminalId = terminalId
        this.name = name
    }
}

export default FrameworkRequest;