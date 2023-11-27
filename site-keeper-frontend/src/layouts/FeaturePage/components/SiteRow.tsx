import { useEffect, useState } from "react"
import SiteRequestModel from "../../../models/Site/SiteRequestModel"
import UserRequestModel from "../../../models/User/UserRequestModel"
import {config} from "../../../config/Constants";
import { Link } from "react-router-dom";

export const SiteRow: React.FC<{ site: SiteRequestModel }> = (props) => {

    const [siteManager, setSiteManager] = useState<UserRequestModel>()

    useEffect(() => {
        if (props.site?.siteManager !== null) {
            const fetchManager = async () => {
                const response = await fetch(config.API_URL+`/api/user/getUserById?id=${props.site?.siteManager}`)
                if (!response.ok) {
                    throw new Error("something went wrong")
                }


                const responseJson = await response.json()

                setSiteManager(new UserRequestModel(responseJson.id,
                    responseJson.fname,
                    responseJson.lname,
                    responseJson.role,
                    responseJson.contactDate,
                    responseJson.contactInfo,
                    responseJson.contactPeriod))
            }

            fetchManager()
        }
    }, [])

    return (
        <tr>
            <th scope="row">
                {props.site?.logo ?
                    <>
                        <img src={props.site?.logo} width={'50'} height={'50'} alt='logo' />
                    </>
                    :
                    <h4>{props.site?.name}</h4>}
            </th>
            <td>
                <Link to={`/site/${props.site?.id}`}>{props.site?.name}</Link>
            </td>
            <td>{siteManager !== undefined ?
                <p>{`${siteManager?.fname} ${siteManager?.lname}`}</p>
                :
                <p>No manager assigned</p>}</td>
            <td>{props.site?.location}</td>
        </tr>
    )
}