import { useEffect, useState } from "react"
import ProjectModel from "../../models/Project/ProjectModel"
import { config } from "../../config/Constants"
import { Link } from "react-router-dom"
import UserModel from "../../models/User/UserModel"
import { managerCheck } from "./TsFunctions"
import FeatureModel from "../../models/Feature/FeatureModel"
import AlternateFeatureName from "../../models/AlternateFeatureName"

export const ProjectsAndFeaturesDisplay: React.FC<{reload: any, refresh: boolean, id: string, user: UserModel | undefined, similarProjects: ProjectModel[], nonSimilarProjects: ProjectModel[],
feature:AlternateFeatureName}> = (props) => {

    const [useSimilar, setUseSimilar] = useState(false)

    async function markAsSimilar(project: number) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let url = `addSimilarProjects?projectId=${props.id}&similarProjects=${project}`
        if (useSimilar) {
            url = `removeSimilarProject?projectId=${props.id}&projectToRemove=${project}`
        }

        const response = await fetch(config.API_URL + `/api/project/${url}`, requestOptions)
        if (!response.ok) {
            throw new Error("something went wrong making these two projects similar")
        }
        props.reload()
    }

    function check(project: ProjectModel){
        for(let i = 0; i < project.features.length; i++){
            if(project.features[i].feature.id === props.feature.feature.id){
                return true
            }
        }
        return false
    }


    const ProjectDisplay: React.FC<{ projects: ProjectModel[], reload: any, user: UserModel | undefined }> = (props) => {
        return (
            <>
                {props.projects.map(project => (
                    <tr key={project.id}>
                        <td><Link to={`/project/${project.id}`} onClick={() => props.reload()} target="_blank">
                            {project.name}
                        </Link>
                        </td>
                        <td>{project.totalHours}</td>
                        <td>{`${project.projectManager.fname} ${project.projectManager.lname}`}</td>
                        <td>
                            {managerCheck(props.user) ?
                                <button className="btn btn-primary" value="" onClick={() => markAsSimilar(project.id)}>{useSimilar ? 'Not Similar' : 'Similar'}</button>
                                :
                                <button className="btn btn-primary" value="" onClick={() => markAsSimilar(project.id)} disabled>{useSimilar ? 'Not Similar' : 'Similar'}</button>}
                        </td>
                    </tr>
                ))}
            </>
        )
    }

    return (
        <>
            <div className="row">
                <div className="col">
                <h4>Projects With This Feature</h4>
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={() => setUseSimilar(!useSimilar)}>{useSimilar ? "View Projects That Aren't Similar" : 'View Projects Marked As Similar'}</button>
                </div>
            </div>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Total Hours</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">{useSimilar ? "Unmark As Similar" : "Mark As Similar"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProjectDisplay projects={useSimilar ? props.similarProjects.filter(check) : props.nonSimilarProjects.filter(check)} reload={props.reload} user={props.user}/>
                    </tbody>
                </table>
            </>
    )
}