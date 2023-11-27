import { useEffect, useState } from "react"
import DisciplineRequestModel from "../../../../models/Disciplines/DisciplineRequestModel"
import { config } from "../../../../config/Constants"
import { Conversation } from "../../../Utils/MessagesAndNotifications/Conversation"
import ProjectModel from "../../../../models/Project/ProjectModel"
import Tooltip from "react-bootstrap/Tooltip"
import  OverlayTrigger  from "react-bootstrap/OverlayTrigger"
import UserModel from "../../../../models/User/UserModel"

export const DisciplineDiscussion: React.FC<{ project: ProjectModel | undefined, user: UserModel|undefined }> = (props) => {


    const [disciplineEstimatons, setDisciplineEstimations] = useState<any>()
    const [totalEstimation, setTotalEstimation] = useState(0)

    useEffect(() => {
        const fetchEstimations = async () => {
            const response = await fetch(config.API_URL + `/api/project/getDisciplineEstimations?projectId=${props.project?.id}`)
            if (!response.ok) {
                throw new Error("something went wrong fetching estimations")
            }
            const responseJson = await response.json()
            setDisciplineEstimations(responseJson)

            let sum = 0
            for (let r in responseJson) {
                sum += responseJson[r]
            }
            setTotalEstimation(sum)
        }
        if (props.project !== undefined) {
            fetchEstimations()
        }
    }, [props.project])


    const renderTooltip1 = (props: any) => (
        <Tooltip id="button-tooltip"  {...props}>
          Sum of the estimates from each discipline
        </Tooltip>
      );

      const renderTooltip2 = (props: any) => (
        <Tooltip id="button-tooltip2"  {...props}>
          The average actual cost of this discipline from similar projects
        </Tooltip>
      );

    return (
        <>

            <h4>Total <OverlayTrigger placement='top' overlay={renderTooltip1}><a href='#'>Estimated Cost</a></OverlayTrigger>: {totalEstimation} hrs</h4>
            <div id='accordion'>
                {props.project?.disciplines.map(discipline => (
                    <div className="card" key={discipline.discipline.id}>
                        <div className="card-header" id={`heading${discipline.discipline.type}`}>
                            <h5 className="mb-0">
                                <button className="btn collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${discipline.discipline.type}`}
                                    aria-expanded="false" aria-controls={`collapse${discipline.discipline.type}`}>
                                    {discipline.discipline.type}
                                </button>
                            </h5>
                        </div>

                        <div id={`collapse${discipline.discipline.type}`} className="collapse" aria-labelledby={`heading${discipline.discipline.type}`} data-bs-parent="#accordion">
                            <div className="card-body">
                                <>{disciplineEstimatons === undefined ?
                                    <></>
                                    :
                                    <h4><OverlayTrigger placement="right" overlay={renderTooltip2}><a href="#">Estimated Cost From Similar Projects</a></OverlayTrigger>: {disciplineEstimatons[discipline.discipline.id]}</h4>}</>
                                <Conversation costing={discipline.costing} action="project" id={props.project?.id} user={props.user}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}