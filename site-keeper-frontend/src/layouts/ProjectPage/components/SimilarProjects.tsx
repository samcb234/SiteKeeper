import { useEffect, useState } from "react"
import ProjectModel from "../../../models/Project/ProjectModel"
import { config } from "../../../config/Constants"
import { Link } from "react-router-dom"

export const SimilarProjects: React.FC<{project: ProjectModel | undefined, reload: any}> = (props) => {

    const [similarProjects, setSimilarProjects] = useState<ProjectModel[]>([])

    useEffect(() => {
        const fetchSimilarProjects = async() =>{
            const response = await fetch(config.API_URL + `/api/project/getSimilarProjects?id=${props.project?.id}`)
            if(!response.ok){
                throw new Error("something went wrong fetching similar projects")
            }

            setSimilarProjects(await response.json())
        }

        if(props.project !== undefined){
            fetchSimilarProjects()
        }
    }, [props.project])

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
                    {similarProjects.map(project => (
                        <tr key={project.id}>
                            <th scope="row">
                                <Link to={`/project/${project.id}`} target="_blank">
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
    )
}