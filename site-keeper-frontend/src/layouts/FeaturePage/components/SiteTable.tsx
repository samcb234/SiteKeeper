import { useEffect, useState } from "react";
import SiteRequestModel from "../../../models/Site/SiteRequestModel";
import { SiteRow } from "./SiteRow";
import {config} from "../../../config/Constants";

export const SiteTable: React.FC<{feature: string}> = (props) =>{

    const [sites, setSites] = useState<SiteRequestModel[]>([])

    useEffect(()=>{
        const fetchSites = async () =>{
            const response = await fetch(config.API_URL+`/api/site/getSitesByFeature?featureId=${props.feature}`)
            if(!response.ok){
                throw new Error("something went wrong here")
            }
            const responseJson = await response.json()
    
            const newSites: SiteRequestModel[] = []
    
            for(let s in responseJson){
                newSites.push(new SiteRequestModel(responseJson[s].id,
                    responseJson[s].name,
                    responseJson[s].siteManager,
                    responseJson[s].logo,
                    responseJson[s].location,
                    responseJson[s].abbreviation,
                    responseJson[s].betslipId))
            }
    
            setSites(newSites)
        }
    
        fetchSites()
    }, [])

    return(
        
        <div className="container">
            <table className="table caption-top">

            <thead>
            <tr>
                <th scope="col">Logo</th>
                <th scope="col">Site Name</th>
                <th scope="col">Manager</th>
                <th scope="col">Location</th>
            </tr>
            </thead>
            <tbody>
            {sites.map(site =>(
                <SiteRow site={site} key={site.id}/>
            ))}
            </tbody>
        </table>
        </div>
    );
}