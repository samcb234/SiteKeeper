import { useEffect, useState } from "react";
import ProjectModel from "../../../models/Project/ProjectModel";
import { UplaodRepositoryPage } from "../../UploadRepositoryPage/UploadRepositoryPage";
import { config } from "../../../config/Constants";
import { Link } from "react-router-dom";
import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import { managerCheck, httpGetRequest} from "../../Utils/TsFunctions";
import UserModel from "../../../models/User/UserModel";
import { ProjectStatusDisplay } from "../../Utils/ProjectStatusDisplay";
import ProjectStatus from "../../../models/Project/ProjectStatus";

export const ProjectList: React.FC<{ site: SearchSiteModel | undefined, user: UserModel | undefined }> = (props) => {
    const [allStatus, setAllStatus] = useState<ProjectStatus[]>([])
    const [refresh, setRefresh] = useState(true)

    useEffect(()=>{
        const fetchAllStatus = async ()=>{
            const response = await httpGetRequest(config.API_URL + '/api/project/getAllStatus', 'error fetching every status')
            setAllStatus(response)
        }
        fetchAllStatus()
    }, [refresh])

    function reload() {
        setRefresh(!refresh)
    }

    return (

        <div className="container-fluid mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total Hours</th>
                        <th scope="col">Project Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {props.site?.projects.map(project => (
                        <tr key={project.id}>
                            <th scope="row">
                                <Link to={{
                                    pathname: `/project/${project.id}`,
                                    state: {project: project, site: props.site}}} target="_blank">
                                    {project.name}
                                </Link>
                            </th>
                            <td>{project.startDate}</td>
                            <td>{project.endDate}</td>
                            <td >
                                {/* {managerCheck(props.user) ?
                                <>
                                {project.active ?
                                <button className="btn btn-success" onClick={() => updateProjectActiveStatus(project, reload)}>Active</button>
                                :
                                <button className="btn btn-danger" onClick={() => updateProjectActiveStatus(project, reload)}>Inactive</button>}
                                </>
                                :
                                <>
                                {project.active ?
                                <button className="btn btn-success" onClick={() => updateProjectActiveStatus(project, reload)} disabled>Active</button>
                                :
                                <button className="btn btn-danger" onClick={() => updateProjectActiveStatus(project, reload)} disabled>Inactive</button>}
                                </>} */}
                                <ProjectStatusDisplay user={props.user} project={project} refresh={refresh} reload={reload} allStatus={allStatus}/>
                            </td>
                            <td>{project.totalHours}</td>
                            <td>{project.projectManager === undefined || project.projectManager === null ?
                            <>Role Not assigned</>
                        :
                        <>
                        {`${project.projectManager.fname} ${project.projectManager.lname}`}</>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}