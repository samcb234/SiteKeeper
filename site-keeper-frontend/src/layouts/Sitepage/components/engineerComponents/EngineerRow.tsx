import { useEffect, useState } from "react"
import UserRequestModel from "../../../../models/User/UserRequestModel"
import { config } from '../../../../config/Constants';
import { Link } from "react-router-dom"
import SearchSiteModel from "../../../../models/Site/SearchSiteModel";
import { httpBodyRequest, managerCheck } from "../../../Utils/TsFunctions";
import UserModel from "../../../../models/User/UserModel";

export const EngineerRow: React.FC<{ user: UserRequestModel, site: SearchSiteModel | undefined, reload: any, refresh: boolean, loggedInUser: UserModel | undefined}> = (props) => {

    const [active, setActive] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const baseUrl = config.API_URL + '/api/'
            const response = await fetch(`${baseUrl}user/isUserActiveOnSite?userId=${props.user?.id}&siteId=${props.site?.id}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            setActive(responseJson)
        }

        fetchUser()
    }, [props.refresh])

    function toggleActive(){
        const submitChange = async () => {
           if(props.site !== undefined){
            const response = await httpBodyRequest(config.API_URL + `/api/site/addUserToSite?siteId=${props.site.id}&userId=${props.user.id}`, 'error adding user to a site', null, 'PUT')
            props.reload()
           }
        }

        submitChange()
    }

    return (
        <tr>
            <th scope="row">
                {props.user?.id}
            </th>
            <td>
                <Link to={`/user/${props.user?.id}`}>
                    {`${props.user?.fname} ${props.user?.lname}`}
                </Link>
            </td>
            <td>{props.user?.contactInfo}</td>
            <td >
                {managerCheck(props.loggedInUser) ?
                <>
                {active ?
                <button className="btn btn-success" onClick={() => toggleActive()}>Active</button>
                :
                <button className="btn btn-danger" onClick={() => toggleActive()}>Inactive</button>}
                </>
                :
                <>
                {active ?
                <button className="btn btn-success" onClick={() => toggleActive()} disabled>Active</button>
                :
                <button className="btn btn-danger" onClick={() => toggleActive()} disabled>Inactive</button>}
                </>}
            </td>
        </tr>
    )
}