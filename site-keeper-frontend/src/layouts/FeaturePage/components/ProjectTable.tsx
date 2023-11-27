import { useEffect, useState } from "react";
import ProjectModel from "../../../models/Project/ProjectModel";
import { UplaodRepositoryPage } from "../../UploadRepositoryPage/UploadRepositoryPage";
import {config} from "../../../config/Constants";
import { Link } from "react-router-dom";

export const ProjectTable: React.FC<{feature: string}> = (props) =>{

    const [projects, setProjects] = useState<ProjectModel[]>([])

    useEffect(() => {
        const baseUrl = config.API_URL+'/api/'
        const fetchProjects = async () => {
            const url = `${baseUrl}project/getProjectsByFeature?featureId=${props.feature}`

            const response = await fetch(url)
            if(!response.ok){
                throw new Error('something went wrong here')
            }

            const responseJson = await response.json()

            const newProjects: ProjectModel[] = []
            
            for(let p of responseJson){
                newProjects.push(new ProjectModel(p.id,
                    p.startDate,
                    p.endDate,
                    p.name,
                    p.status,
                    p.totalHours,
                    p.costingId,
                    p.projectManager,
                    p.features,
                    p.terminals,
                    p.frameworks,
                    p.middleware,
                    p.hosts,
                    p.disciplines))
            }
            setProjects(newProjects)

        }

        fetchProjects()
    }, [])

    return(

        <div className="container mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Active</th>
                        <th scope="col">Total Hours</th>
                        <th scope="col">Project Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <th scope="row">
                                <Link to={`/project/${project.id}`}>
                                    {project.name}
                                </Link>
                            </th>
                            <td>{project.startDate}</td>
                            <td>{project.endDate}</td>
                            <td>{project.status.status}</td>{/*needs to be updated*/}
                            <td>{project.totalHours}</td>
                            <td>{`${project.projectManager.fname} ${project.projectManager.lname}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}