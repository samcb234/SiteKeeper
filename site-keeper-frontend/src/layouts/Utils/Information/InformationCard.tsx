import { useState } from "react";
import InformationModel from "../../../models/Information/InformationModel";
import UserModel from "../../../models/User/UserModel";
import { engineerCheck, httpBodyRequest } from "../TsFunctions";
import InformationRequestModel from "../../../models/Information/InformationRequestModel";
import { config } from "../../../config/Constants";

export const InformationCard: React.FC<{ user: UserModel | undefined, information: InformationModel, refresh: boolean, reload: any }> = (props) => {
    const [infoString, setInfoString] = useState(props.information.info)
    const [infoName, setoInfoName] = useState(props.information.infoName)
    const [edit, setEdit] = useState(false)

    async function editInfo() {
        if (engineerCheck(props.user) && edit) {
            const infoRequestModel: InformationRequestModel = new InformationRequestModel(props.information.projectId,
                props.information.disciplineId, infoString, infoName)

            const response = await httpBodyRequest(config.API_URL + `/api/information/updateInformation?id=${props.information.id}`, "error updating information", infoRequestModel, 'PUT')
            props.reload()
        }
        setEdit(!edit)
    }

    async function deleteInfo() {
        if (engineerCheck(props.user)) {
            const body = {
                method: 'DELETE'
            }
            const response = await fetch(config.API_URL + `/api/information/deleteInformation?id=${props.information.id}`, body)
            props.reload()
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h3>{edit ?
                    <input type="text" onChange={e => setoInfoName(e.target.value)} value={infoName} />
                    :
                    <>{infoName}</>}</h3>
            </div>
            <div className="card-body">
                <div>
                    <>
                        {edit ?
                            <input type="text" onChange={e => setInfoString(e.target.value)} value={infoString} />
                            :
                            <>{infoString}</>}
                    </>
                    <div className="row mt-3">
                        <div className="col col-3">
                            {engineerCheck(props.user) ?
                            <button className="btn btn-warning" onClick={()=> editInfo()}>
                                {edit? "Save Info" : "Edit Info"}
                            </button>
                        :
                        <button className="btn btn-warning" onClick={()=> editInfo()} disabled>Edit Info</button>}
                        </div>
                        <div className="col col-3">
                            {engineerCheck(props.user) ?
                            <button className="btn btn-danger" onClick={()=> deleteInfo()}>
                                Delete Info
                            </button>
                        :
                        <button className="btn btn-danger" onClick={()=> deleteInfo()} disabled>Delete Info</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}