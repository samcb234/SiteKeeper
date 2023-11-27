import { useEffect, useState } from "react";
import ProjectModel from "../../models/Project/ProjectModel";
import ProjectStatus from "../../models/Project/ProjectStatus";
import UserModel from "../../models/User/UserModel";
import { httpGetRequest, httpBodyRequest, managerCheck } from "./TsFunctions";
import { config } from "../../config/Constants";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ProjectRequestModel from "../../models/Project/ProjectRequestModel";

export const ProjectStatusDisplay: React.FC<{ user: UserModel | undefined, project: ProjectModel | undefined, refresh: boolean, reload: any, allStatus: ProjectStatus[] }> = (props) => {
    const [status, setStatus] = useState('')

    useEffect(()=>{
        if(props.project !== undefined && props.project.status !== undefined && props.project.status !== null){
            setStatus(props.project.status.status)
        }
    }, [props.project])

    const colors: any = {
        'costing': 'primary',
        'requirements': 'warning',
        'development': 'success',
        'design': 'info',
        'testing': 'danger',
        'finished': 'secondary',
        '': 'secondary'
    }

    const updateStatus = async(newStatus: ProjectStatus) => {
        setStatus(newStatus.status)
        if(props.project !== undefined){
            const projectRequestModel: ProjectRequestModel = new ProjectRequestModel(props.project.startDate,
                props.project.endDate, props.project.name, newStatus, props.project.totalHours,
                props.project.costingId, props.project.projectManager,
                [], props.project.features, props.project.disciplines)
            
            const response = await httpBodyRequest(config.API_URL + `/api/project/updateProject?id=${props.project.id}`, 'error updating project', projectRequestModel, 'PUT')
            props.reload()
        }
    }


    return (
        <>
            {managerCheck(props.user) ?
                <div className="dropdown">
                    <button className={`btn btn-${colors[status]} dropdown-toggle`} type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {status} <ArrowDropDownIcon />
                    </button>
                    <ul className="dropdown-menu">
                        {props.allStatus.map(mapStatus => (
                            <li key={mapStatus.id} onClick={()=>updateStatus(mapStatus)}>
                                <a className="dropdown-item" href="#">
                                    {mapStatus.status}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <div className="dropdown">
                    <button className={`btn btn-${colors[status]} disabled`} type="button"
                        id="statusDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.project?.status.status}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="roleDropDown">
                        {props.allStatus.map(mapStatus => (
                            <li key={mapStatus.id}>
                                <a className="dropdown-item" href="#">
                                    {mapStatus.status}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>}
        </>
    )
}