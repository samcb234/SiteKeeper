import SiteRequestModel from "../../../models/Site/SiteRequestModel"
import { Link } from "react-router-dom";

export const SiteRow: React.FC<{ site: SiteRequestModel}> = (props) => {

    return (
        <tr>
            <th scope="row">
                {props.site?.logo ?
                    <>
                        <img  src={require('../../../images/'+props.site.logo)}  width={'50'} height={'50'} alt='logo' />
                    </>
                    :
                    <h4>{props.site?.abbreviation}</h4>}
            </th>
            <td>
                <Link to={{
                    pathname: `/site/${props.site?.id}`,
                    state: {site: props.site}}}>{props.site?.name}
                </Link>
            </td>
            <td>{props.site.siteManager !== null ?
            <>{`${props.site.siteManager.fname} ${props.site.siteManager.lname}`}</>
            :
            <p>No manager assigned</p>}</td>
            <td>{props.site?.location}</td>
        </tr>
    )
}