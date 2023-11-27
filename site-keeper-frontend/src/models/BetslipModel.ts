class BetslipModel{
    id: number
    name: string
    status: boolean
    slipIdBin: string
    slipIdHex: string
    slipIdDec:number
    dateOfAddition: string

    constructor(id: number, name: string, status: boolean, slipIdBin: string, slipIdHex: string, slipIdDec: number, dateOfAddition: string){
        this.id = id
        this.name = name
        this.status = status
        this.slipIdBin = slipIdBin
        this.slipIdHex = slipIdHex
        this.slipIdDec = slipIdDec
        this.dateOfAddition = dateOfAddition
    }
}

export default BetslipModel