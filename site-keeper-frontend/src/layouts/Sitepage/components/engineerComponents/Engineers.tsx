import { useEffect, useState } from "react"
import { EngineerRow } from "./EngineerRow"
import { AddEngineersToSite } from "./AddEngineersToSite"
import SearchSiteModel from "../../../../models/Site/SearchSiteModel"
import UserModel from "../../../../models/User/UserModel"
import { managerCheck } from "../../../Utils/TsFunctions"

export const Engineers: React.FC<{ site: SearchSiteModel | undefined, reload: any, refresh: boolean, user: UserModel | undefined }> = (props) => {

    
    const [existingIds, setExistingIds] = useState<number[]>([])


    useEffect(() => {
        if (props.site !== undefined) {
            const newIds: number[] = []
            const engineers = props.site?.users
            for (let i = 0; i < engineers.length; i ++) {
                newIds.push(engineers[i].id)
            }
            setExistingIds(newIds)
        }

    }, [props.refresh])

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {props.site?.users.map(engineer => (
                        <EngineerRow key={engineer.id} user={engineer} site={props.site} reload={props.reload} refresh={props.refresh} loggedInUser={props.user}/>
                    ))}
                </tbody>
            </table>
            {managerCheck(props.user) ? 
            <AddEngineersToSite site={props.site} existingIds={existingIds} reload={props.reload} refresh={props.refresh}/>
        :
        <></>}
        </div>
    )
}