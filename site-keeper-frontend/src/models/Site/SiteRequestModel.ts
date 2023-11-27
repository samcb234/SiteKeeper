import CostingModel from "../CostingModel"
import UserModel from "../User/UserModel"

class SiteRequestModel{
    id: number
    name: string
    abbreviation: string
    siteManager: UserModel
    logo?: string
    location: string
    betslipId: number

    constructor(id: number, name: string, siteManager: UserModel, logo: string,
        location: string, abbreviation: string, betslipId: number) {
        this.id = id
        this.name = name
        this.siteManager = siteManager
        this.logo = logo
        this.location = location
        this.abbreviation = abbreviation
        this.betslipId = betslipId
    }
}

export default SiteRequestModel