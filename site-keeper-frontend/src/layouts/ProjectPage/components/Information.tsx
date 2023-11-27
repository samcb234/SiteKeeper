import { useEffect, useState } from "react"
import DisciplineModel from "../../../models/Disciplines/DisciplineModel"
import { config } from "../../../config/Constants"
import DisciplineRequestModel from "../../../models/Disciplines/DisciplineRequestModel"
import { DisplayInformation } from "./DisplayInformation"
import { AddNewInformation } from "./AddNewInformation"
import ProjectModel from "../../../models/Project/ProjectModel"
import { engineerCheck } from "../../Utils/TsFunctions"
import UserModel from "../../../models/User/UserModel"
export const Information: React.FC<{ project: ProjectModel| undefined, user: UserModel | undefined }> = (props) => {
    const [disciplines, setDisciplines] = useState<DisciplineRequestModel[]>([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchDisciplines = async () => {
            const response = await fetch(config.API_URL + `/api/project/getDisciplinesByProjectId?id=${props.project?.id}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const responseJson = await response.json()

            const newDisciplines: DisciplineRequestModel[] = []
            for(let r in responseJson){
                newDisciplines.push(new DisciplineRequestModel(responseJson[r].discipline,
                    Number(props.project),
                    responseJson[r].leadEngineer,
                    responseJson[r].totalCost,
                    responseJson[r].estimatedBy,
                    responseJson[r].verified,
                    responseJson[r].verifiedBy,
                    responseJson[r].costing,
                    responseJson[r].verificationPending))
            }
            setDisciplines(newDisciplines)
        }
        if(props.project !== undefined){
            fetchDisciplines()
        }
    }, [props.project])

    function refreshPage(){
        setRefresh(!refresh)
    }

    return (
        <div className="accordion">
            {disciplines.map(discipline => (
                <div className="card" key={discipline.discipline.id}>
                    <div className="card-header" id={`heading${discipline.discipline.type}`}>
                        <h5 className="mb-0">
                            <button className="btn collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${discipline.discipline.type}`}
                                aria-expanded="false" aria-controls="collapseOne">
                                {discipline.discipline.type}
                            </button>
                        </h5>
                    </div>

                    <div id={`collapse${discipline.discipline.type}`} className="collapse" aria-labelledby={`heading${discipline.discipline.type}`} data-bs-parent="#accordion">
                        <div className="card-body">
                            <DisplayInformation project={String(props.project?.id)} discipline={discipline.discipline.id} refresh={refresh} user={props.user} reload={refreshPage}/>
                            {engineerCheck(props.user) ?
                            <AddNewInformation project={String(props.project?.id)} discipline={discipline.discipline.id} refresh={refreshPage}/>
                        :
                        <></>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}