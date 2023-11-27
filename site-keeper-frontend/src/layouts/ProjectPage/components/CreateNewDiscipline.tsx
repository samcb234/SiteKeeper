import { useEffect, useState } from "react"
import {config} from "../../../config/Constants";
import DisciplineRequestModel from "../../../models/Disciplines/DisciplineRequestModel";

export const CreateNewDiscipline: React.FC<{project: string, refresh: any}> = (props) => {

    const [type, setType] = useState('')
    const [leadEngineer, setLeadEngineer] = useState(0)
  
    const [leadEngineerEmail, setLeadEngineerEmail] = useState('')
    const [validEngineerEmail, setValidEngineerEmail] = useState(false)

    const [createButton, setCreateButton] = useState(false)

    const [httpError, setHttpError] = useState('')

    const baseUrl = config.API_URL+'/api/'

    useEffect(() => {
        const fetchUser = async () => {
            const url = `${baseUrl}user/getUserByContactInfo?contactInfo=${leadEngineerEmail}`

            

            const response = await fetch(url)

            if(!response.ok){
                throw new Error("something went wrong")
            }
            const responseJson = await response.json()
            setLeadEngineer(responseJson.id)
            setValidEngineerEmail(true)
        }
        
        fetchUser().catch((error:any) => {
            setValidEngineerEmail(false)
        })
    }, [leadEngineerEmail])
    
    function switchCreateButton(){
        setCreateButton(!createButton)
    }

    return (
        <div className="container mt-3">
            <div className="col justify-content-start">
                <h4 className="text-warning font-weight-bold">
                    Add New Discipline
                </h4>
            </div>
            <div className="input-group mt-4">
                <span className="input-group-text">Discipline Type</span>
                <input type="text" className="form-control" placeholder=""
                    aira-label='start date' onChange={e => setType(e.target.value)} value={type}/>
                <span className={validEngineerEmail? "input-group-text" : "input-group-text text-danger"}>Project Manager</span>
                <input type="text" className="form-control" placeholder="user@IGT.com"
                    aira-label='end date' onChange={e => setLeadEngineerEmail(e.target.value)} value={leadEngineerEmail}/>
            </div>
            <div className="row mt-3 justify-content-end">
                <div className="col-1">
                <button className="btn btn-primary" onClick={switchCreateButton}>Create</button>
                </div>
            </div>
        </div>
    )
}