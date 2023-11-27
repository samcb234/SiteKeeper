import { useEffect, useState } from "react"
import ProjectModel from "../../models/Project/ProjectModel"
import { ProjectTabPane } from "./components/ProjectTabPane"
import { config } from "../../config/Constants";
import { httpGetRequest, managerCheck } from "../Utils/TsFunctions";
import UserModel from "../../models/User/UserModel";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FileSaver from 'file-saver';
import { ProjectStatusDisplay } from "../Utils/ProjectStatusDisplay";
import ProjectStatus from "../../models/Project/ProjectStatus";

export const ProjectPage: React.FC<{ user: UserModel | undefined }> = (props) => {
    const projectId = (window.location.pathname).split('/')[2]

    const [project, setProject] = useState<ProjectModel>()
    const [refresh, setRefresh] = useState(true)
    const [cameleonButtonDisabled, setCameleonButtonDisabled] = useState(false)
    const [allStatus, setAllStatus] = useState<ProjectStatus[]>([])

    useEffect(() => {
        const fetchAllStatus = async () => {
            const response = await httpGetRequest(config.API_URL + '/api/project/getAllStatus', 'error fetching every status')
            setAllStatus(response)
        }
        fetchAllStatus()
    }, [refresh])

    useEffect(() => {
        const fetchProject = async () => {
            const response = await fetch(config.API_URL + `/api/project/getProjectById?id=${projectId}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const responseJson = await response.json()

            setProject(new ProjectModel(responseJson.id, responseJson.startDate,
                responseJson.endDate, responseJson.name, responseJson.status,
                responseJson.totalHours, responseJson.costingId, responseJson.projectManager, responseJson.features, responseJson.terminals, responseJson.frameworks,
                responseJson.middleware, responseJson.hosts, responseJson.disciplines))
        }

        fetchProject()

    }, [refresh])

    if (document.title !== `IGT - Site Keeper - ${project?.name}`) {
        document.title = `IGT - Site Keeper - ${project?.name}`
    }

    function reload() {
        setRefresh(!refresh)
    }

    function exportRecordToExcel() {
        setCameleonButtonDisabled(true);
        fetch(config.API_URL + '/api/project/getCameleonInfo', {
            credentials: 'same-origin',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ costingId: project?.costingId })
        }).then(function (response: any) {
            return response.blob();
        }).then(function (blob: any) {
            FileSaver.saveAs(blob, project?.name + '.xls');
        }).finally(() => {
            setCameleonButtonDisabled(false);
        });
    }

    return (
        <div className="container-fluid">
            <div className="row mt-8 mb-8">
                <div className="col-sm">
                    <h4 className="text-warning font-weight-bold">
                        {project?.costingId !== undefined ?
                            <>{`${project.name}-${project.costingId}`}</>
                            :
                            <>{project?.name}</>}
                    </h4>
                </div> {/*include start and end date stuff here as well*/}
                <div className="col-2">
                    <div className="row">
                        <div className="col">Project Status: </div>
                        <div className="col">
                        <ProjectStatusDisplay user={props.user} project={project} refresh={refresh} reload={reload} allStatus={allStatus} />
                        </div>
                    </div>
                </div>
                <div className="col-6  d-flex justify-content-lg-end">
                    <a className="btn btn-info btn-excel" href={config.API_URL + `/api/export/exportProject?projectId=${project?.id}`}><CloudDownloadIcon/> Export Project And Costings</a>
                    <button style={{marginLeft: 10}} className="btn btn-excel ml-2" disabled={cameleonButtonDisabled} onClick={exportRecordToExcel}>
                        {cameleonButtonDisabled ? <AutorenewIcon className={"loading-icon"}/>:<CloudDownloadIcon/>} Export Project Cameleon Costing
                    </button>
                </div>

            </div>
            <ProjectTabPane project={project} reload={reload} refresh={refresh} user={props.user} />
        </div>
    )
}