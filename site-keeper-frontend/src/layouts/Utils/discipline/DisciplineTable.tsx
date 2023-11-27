
import { AssociateExistingDiscipline } from "../../ProjectPage/components/AssociateExistingDiscipline"
import { DisciplineRow } from "./DisciplineRow";
import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import ProjectModel from "../../../models/Project/ProjectModel";
import UserModel from "../../../models/User/UserModel";
import { managerCheck } from "../TsFunctions";

export const DisciplineTable: React.FC<{ site: SearchSiteModel | undefined, project: ProjectModel | undefined, action: string, reload: any,
user: UserModel | undefined, refresh: boolean }> = (props) => {

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">type</th>
                        <th scope="col">Lead Engineer</th>
                        <th scope="col">Estimated By</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Verified</th>
                        <th scope="col">Verified By</th>
                    </tr>
                </thead>
                <tbody>
                    {props.action === 'site' ?
                        <>
                            {props.site?.disciplines.map(discipline => (
                                <DisciplineRow discipline={discipline} key={discipline.discipline.id} user={props.user} action="site"
                                projectId={props.site?.id} reload={props.reload} refresh={props.refresh} cost={discipline.totalCost}/>
                            ))}</>
                        :
                        <>
                            {props.project?.disciplines.map(discipline => (
                                <DisciplineRow discipline={discipline} key={discipline.discipline.id} user={props.user} action="project"
                                projectId={props.project?.id} reload={props.reload} refresh={props.refresh} cost={discipline.costing?.cost}/>
                            ))}</>}
                </tbody>
            </table>
            {props.action === 'project' && managerCheck(props.user) ?
                <>
                    <AssociateExistingDiscipline project={props.project} refresh={props.reload}/>
                    
                </>
                :
                <></>}
        </div>
    )
}