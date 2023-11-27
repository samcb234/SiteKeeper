import React, {useEffect, useState} from "react";
import {FeatureTable} from "./components/FeatureTable";
import {FeatureForm} from "./components/FeatureForm";
import {TerminalForm} from "../TerminalPage/components/TerminalForm";
import FeatureModel from "../../models/Feature/FeatureModel";
import { config } from "../../config/Constants";

export const AddFeaturePage = () =>{

    const [discipline, setDiscipline] = useState('Terminal')
    const [refresh, setRefresh] = useState(true)
    const [features, setFeatures] = useState<FeatureModel[]>([])

    useEffect(() => {
        const baseUrl = config.API_URL+'/api/'
        const fetchFeatures = async () =>{
            const url = `${baseUrl}feature/getAllFeatures`
            const response = await fetch(url)

            const responseJson = await response.json()

            const features: FeatureModel[] = []
            for(let t in responseJson){
                features.push(new FeatureModel(responseJson[t].id,
                    responseJson[t].description,
                    responseJson[t].model,
                    responseJson[t].name,
                    responseJson[t].isVerified,
                    responseJson[t].disciplines,
                    responseJson[t].parentFeature
                ))
            }
            setFeatures(features);
        }

        fetchFeatures()
    },[refresh])

    const handleDisciplineChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>{
        setDiscipline(event.target.value);
        setRefresh(!refresh)
    }

    function reload(){
        setRefresh(!refresh)
    }



    return(
      <div className = "container">
          <div className = "d-flex justify-content-end mt-16">
              <button className="btn  btn-lg text-white bg-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div className=" d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                           fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="6" fill={"#66FF99"} />
                          <path
                              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                      Add Feature
                  </div>
              </button>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex= {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Enter Feature Information</h5>
                          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <FeatureForm reload={reload} features={features}/>
                      </div>

                  </div>
              </div>
          </div>
            <div className = "row mt-16">
              <form>
                  <div className="col-md-4">
                      <div className="form-floating">
                          <select id = "select1" className="form-select" onChange={handleDisciplineChange}>
                              <option >Terminal</option>
                              <option >Host</option>
                              <option >Middleware</option>
                          </select>
                          <label className= "select1 fw-bold"> Select a discipline</label>
                      </div>
                  </div>
              </form>
                <div className="mt-16">
                    <FeatureTable features={features} discipline={discipline} refresh={refresh} reload={reload}/>
                </div>
            </div>

      </div>
    );
}