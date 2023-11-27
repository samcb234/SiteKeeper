import { config } from "../../config/Constants";
import AlternateFeatureName from "../../models/AlternateFeatureName";
import FeatureModel from "../../models/Feature/FeatureModel";
import FrameworkModel from "../../models/Inventory/FrameworkModel";
import InventoryModel from "../../models/Inventory/InventoryModel";
import ProjectModel from "../../models/Project/ProjectModel";
import SearchSiteModel from "../../models/Site/SearchSiteModel";
import Terminal from "../../models/Inventory/Terminal";
import UserModel from "../../models/User/UserModel";
import { Features } from "../Sitepage/components/featureComponents/Features";
import { InventoryDisplay } from "./Information/InventoryDisplay";
import { TerminalAndFrameworkDisplay } from "./TerminalAndFramework/TerminalAndFrameworkDisplay";
import { FeatureDisplay } from "./Features/FeatureDisplay";
import { useEffect, useState } from "react";
import { httpGetRequest } from "./TsFunctions";

export const DropDownPane: React.FC<{ site: SearchSiteModel | undefined, project: ProjectModel | undefined, action: string, reload: any, refresh: boolean,
user: UserModel | undefined }> = (props) => {
    const [similarProjects, setSimilarProjects] = useState<ProjectModel[]>([])
    const [nonSimilarProjects, setNonSimilarProjects] = useState<ProjectModel[]>([])

    useEffect(()=>{
        const fetchProjects = async() =>{
            if(props.action === 'project' && props.project !== undefined){
                const similarResponse = await httpGetRequest(config.API_URL + `/api/project/getSimilarProjects?id=${props.project.id}`, 'error fetching similar projects')
                setSimilarProjects(similarResponse)
                const nonSimilarResponse = await httpGetRequest(config.API_URL + `/api/project/getNonSimilarProjects?projectId=${props.project.id}`, 'error fetching similar projects')
                setNonSimilarProjects(nonSimilarResponse)
                console.log(nonSimilarResponse)
            }
        }
        fetchProjects()
    }, [props.refresh, props.project])

    async function submitBom(bom: any, i: number){
        if(bom !== null && bom !== undefined && props.site !== undefined){
            props.site.terminalsOnSites[i].bom = String(bom)
            console.log(props.site)
            
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.site)
            }

            const response = await fetch(config.API_URL + `/api/site/updateSite?id=${props.site.id}`, requestOptions)
            if(!response.ok){
                throw new Error("something went wrong")
            }

            props.reload()
        }
        
    }

    let terminals: Terminal[] = []
    let frameworks: FrameworkModel[] = []
    let middleware: InventoryModel[] = []
    let hosts: InventoryModel[] = []
    let features: AlternateFeatureName[] = []
    let boms: string [] = []

    if(props.action === 'site' && props.site !== undefined){
        // terminalsAndFrameworksUrl = terminalsAndFrameworksUrl + `Site?siteId=${props.id}`
        // middlewareUrl = middlewareUrl + `Site?siteId=${props.id}`
        // hostUrl = hostUrl + `Site?siteId=${props.id}`
        // featureUrl = featureUrl + `Site?siteId=${props.id}`

        for(let i = 0; i < props.site.terminalsOnSites.length; i ++){
            terminals.push(props.site.terminalsOnSites[i].terminal)
            frameworks.push(props.site.terminalsOnSites[i].framework)
            if(props.site.terminalsOnSites[i].bom === undefined){
                boms.push('')
            } else {
                boms.push(String(props.site.terminalsOnSites[i].bom))
            }
        }
        middleware = props.site.middleware
        hosts = props.site.hosts
        features = props.site.features

    } else if(props.action === 'project' && props.project !== undefined){
        // terminalsAndFrameworksUrl = terminalsAndFrameworksUrl + `Project?projectId=${props.id}`
        // middlewareUrl = middlewareUrl + `Project?projectId=${props.id}`
        // hostUrl = hostUrl + `Project?projectId=${props.id}`
        // featureUrl = `/api/project/getProjectById?id=${props.id}`

        terminals = props.project?.terminals
        frameworks = props.project?.frameworks
        middleware = props.project.middleware
        hosts = props.project.hosts
        features = props.project.features
       

    }

    return (
        // Add functionality to choose navbar depending on upon who is logged in
        // Differentiate content shown dependent upon what site is clicked
        <div className='accordion' id="accordion">
            <div className="accordion-item">
                <div className="accordion-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="accordion-button" type='button' data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="false" aria-controls="collapseOne">
                            Features
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
                    <div className="accordion-body">
                        {props.action === 'site' ?
                        <Features features={features} id={String(props.site?.id)} reload={props.reload} refresh={props.refresh} user={props.user}/>
                    :
                <FeatureDisplay features={features} id={String(props.project?.id)}display={true} reload={props.reload} refresh={props.refresh} user={props.user} action="project"
                similarProjects={similarProjects} nonSimilarProjects={nonSimilarProjects}/>}
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <div className="accordion-header" id="headingTwo">
                    <h5 className="mb-0">
                        <button className="accordion-button" type='button' data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo">
                            Terminals
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                    <div className="accordion-body">
                        <TerminalAndFrameworkDisplay terminals={terminals} frameworks={frameworks} 
                        boms={boms} action={props.action} reload={props.reload} refresh={props.refresh}
                        submitBom={submitBom} user={props.user}/>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <div className="accordion-header" id="headingFour">
                    <h5 className="mb-0">
                        <button className="accordion-button" type='button' data-bs-toggle="collapse" data-bs-target="#collapseFour"
                            aria-expanded="false" aria-controls="collapseFour">
                            Middleware
                        </button>
                    </h5>
                </div>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
                    <div className="accordion-body">
                        <InventoryDisplay inventory={middleware} />
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <div className="accordion-header" id="headingFive">
                    <h5 className="mb-0">
                        <button className="accordion-button" type='button' data-bs-toggle="collapse" data-bs-target="#collapseFive"
                            aria-expanded="false" aria-controls="collapseFive">
                            Host
                        </button>
                    </h5>
                </div>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
                    <div className="accordion-body">
                        <InventoryDisplay inventory={hosts}/>
                    </div>
                </div>
            </div>
            <div className="col mb-3"></div>

        </div>

    );
}