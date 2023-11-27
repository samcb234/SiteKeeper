import { useEffect, useState } from "react"
import { config } from "../../../config/Constants";
import DisciplineType from "../../../models/Disciplines/DisciplineTypeModel";
import DisciplineRequestModel from "../../../models/Disciplines/DisciplineRequestModel";
import ProjectModel from "../../../models/Project/ProjectModel";
import DisciplineRoles from '../../../models/Roles/DisciplineRoles';
import UserModel from "../../../models/User/UserModel";
import { httpGetRequest } from "../../Utils/TsFunctions";

export const AssociateExistingDiscipline: React.FC<{ project: ProjectModel | undefined, refresh: any}> = (props) => {

    const [discipline, setDiscipline] = useState<DisciplineRoles>()
    const [searchDiscipline, setSearchDiscipline] = useState('')
    const [potentialDisciplines, setPotentialDisciplines] = useState<DisciplineRoles[]>([])

    const [leadEngineer, setLeadEngineer] = useState<UserModel[]>([])

    const [leadEngineerEmail, setLeadEngineerEmail] = useState('')
    const [validEngineerEmail, setValidEngineerEmail] = useState(false)

    const [users, setUsers] = useState<UserModel[]>([])

    useEffect(()=>{
        const fetchAllUsers = async () =>{
            const response = await httpGetRequest(config.API_URL +`/api/user/getAllUsers`, 'error fetching users')
            setUsers(response)
        }
        fetchAllUsers()
    }, [])

    

    useEffect(() => {
        const fetchDisciplines = async () => {
            const response = await fetch(config.API_URL + `/api/project/getUnaddedDisciplines?projectId=${props.project?.id}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            setPotentialDisciplines(await response.json())
        }
        if(props.project !== undefined){
            fetchDisciplines()
        }
    }, [props.project])

    function selectDiscipline(discipline: DisciplineRoles) {
        setDiscipline(discipline)
        setSearchDiscipline(discipline.type)
    }

    const submitRelation = async () => {
        if (discipline !== null && discipline !== undefined && leadEngineer !== undefined) {
            const rel = new DisciplineRequestModel(discipline, Number(props.project?.id),
                leadEngineer, 0, undefined, false, undefined, undefined, false)

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rel)
            }

            const response = await fetch(config.API_URL + '/api/project/associateNewDiscipline', requestOptions)
            if (!response.ok) {
                throw new Error("something went wrong associating new discipline")
            }

            props.refresh()
        }
    }

    return (
        <div className="container">
            <h4 className="text-warning">
                Add Existing Discipline
            </h4>
            <span className="input-group-text">Discipline</span>
            <input type="text" className="form-control" placeholder=""
                aira-label='start date' onChange={e => setSearchDiscipline(e.target.value)} value={searchDiscipline} />
            {potentialDisciplines.map(potentialDiscipline => (
                <>
                    {potentialDiscipline.type.startsWith(searchDiscipline) ?
                        <span onClick={() => selectDiscipline(potentialDiscipline)}
                            className="input-group-text" key={potentialDiscipline.id}>{potentialDiscipline.type}</span>
                        :
                        <></>}
                </>
            ))}
            <button className="btn btn-primary" onClick={() => submitRelation()}>Add Discipline</button>
        </div>
    )
}