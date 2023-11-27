import React, {useEffect, useState} from "react";
import FrameworkRequest from "../../../models/Inventory/FrameworkRequestModel";
import FeatureModel from "../../../models/Feature/FeatureModel";
import {config} from "../../../config/Constants";
import { httpBodyRequest, httpGetRequest } from "../../Utils/TsFunctions";
import { SelectFeature } from "./SelectFeature";

export const FeatureTable: React.FC<{features: FeatureModel[], discipline: string, refresh: boolean, reload: any}> = (props) =>{

    const [newSubfeature, setNewSubfeature] = useState<FeatureModel>()
    const [newParentFeature, setNewParentFeature] = useState<FeatureModel>()

    function disciplineFilter(feature: FeatureModel){
        for(let i = 0; i < feature.disciplines.length; i++){
            if(feature.disciplines[i].type.toLowerCase() === props.discipline.toLowerCase()){
                return true
            }
        }
        return false
    }

    async function addParentFeature(){
        if(newParentFeature !== undefined && newSubfeature !== undefined){
            newSubfeature.parentFeature = newParentFeature
            const response = await httpBodyRequest(config.API_URL + `/api/feature/updateFeature?id=${newSubfeature.id}`, 'error assigning parent feature', newSubfeature, 'PUT')
            setNewParentFeature(undefined)
            setNewSubfeature(undefined)
            props.reload()
        }
    }

    return(
      <div>
        <div className="row">
            <div className="col">
                <SelectFeature features={props.features} dropdownString={newSubfeature === undefined ? 'select a subfeature' : newSubfeature.name} action={setNewSubfeature}/>
            </div>
            <div className="col">
                <SelectFeature features={props.features} dropdownString={newParentFeature === undefined ? 'select a parent feature' : newParentFeature.name} action={setNewParentFeature}/>
            </div>
            <div className="col">
                <button className="btn btn-primary" onClick={()=>addParentFeature()}>Assign Subfeature</button>
            </div>
        </div>
          <table className = "table caption-top">
              <caption>
                  <h5>
                     List of Features
                  </h5>

              </caption>
              <thead>
              <tr>
                  <th scope = "col"> Feature </th>
                  <th scope = "col"> Description </th>
                  <th scope = "col"> Image</th>
                  <th scope="col">Parent Feature</th>
              </tr>
              </thead>

              <tbody>
              {props.features.filter(disciplineFilter).map(f => (
                  <tr key = {f.id} >
                      <td> {f.name}</td>
                      <td> {f.description}</td>
                      <td> {f.img}</td>
                      <td>
                        {f.parentFeature === undefined || f.parentFeature === null ?
                        <>No Parent Assigned</>
                    :
                    <>{f.parentFeature.name}</>}
                      </td>
                  </tr>
              ))}
              </tbody>
          </table>
      </div>
    );
}