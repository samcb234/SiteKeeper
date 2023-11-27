class Terminal{
    id:number
    img?: string
    description?: string
    name: string

    constructor(id:number, img: string, description: string, name: string){
        this.id = id
        this.img = img
        this.description = description
        this.name = name
    }
}

export default Terminal