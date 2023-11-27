import FeatureModel from "../Feature/FeatureModel";
import FrameworkModel from "../Inventory/FrameworkModel";
import SiteRequestModel from "./SiteRequestModel";
import Terminal from "../Inventory/Terminal";
import UserRequestModel from "../User/UserRequestModel";
import UserModel from "../User/UserModel";
import ProjectModel from "../Project/ProjectModel";
import CostingModel from "../CostingModel";
import DisciplinesOnSitesModel from "../Disciplines/BaseDisciplineModel";
import InventoryModel from "../Inventory/InventoryModel";
import TerminalsOnSites from "../Inventory/TerminalsOnSites";
import AlternateFeatureName from "../AlternateFeatureName";

class SearchSiteModel extends SiteRequestModel{
    terminalsOnSites: TerminalsOnSites[]
    middleware: InventoryModel[]
    hosts: InventoryModel[]
    features: AlternateFeatureName[]
    users: UserRequestModel[]
    projects: ProjectModel[]
    disciplines: DisciplinesOnSitesModel[]

    constructor(id: number,
        name: string,
        siteManager: UserModel,
        logo: string,
        location: string,
        costing: CostingModel,
        terminalsOnSites: TerminalsOnSites[],
        middleware: InventoryModel[],
        hosts: InventoryModel[],
        features: AlternateFeatureName[],
        users: UserRequestModel[],
        projects: ProjectModel[], disciplines: DisciplinesOnSitesModel[],
        abbreviation: string, betslipId: number){
            super(id, name, siteManager, logo, location, abbreviation, betslipId)
            this.terminalsOnSites = terminalsOnSites
            this.middleware = middleware
            this.hosts = hosts
            this.features = features
            this.users = users
            this.projects = projects
            this.disciplines = disciplines

            for(let t in this.terminalsOnSites){
                this.terminalsOnSites[t].site = this.id
            }
        }
}

export default SearchSiteModel