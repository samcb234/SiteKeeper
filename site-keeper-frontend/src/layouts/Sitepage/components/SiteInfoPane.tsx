
import { DisciplineTable } from "../../Utils/discipline/DisciplineTable";
import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import UserModel from "../../../models/User/UserModel";
import { UserNotificationPreferences } from "../../Utils/MessagesAndNotifications/UserNotificationPreferences";


export const SiteInfoPane: React.FC<{ site: SearchSiteModel | undefined, reload: any, refresh: boolean, user: UserModel | undefined }> = (props) => {

    return (
        <>
            <div className="row d-flex ">
                <div className="col-8">
                    <DisciplineTable site={props.site} project={undefined} action="site" reload={props.reload} refresh={props.refresh} user={props.user}/>
                </div>
                <div className="col-4 align-items-center">
                    <div className="card text-center align-items-center">
                        {props.site?.logo ?
                            <img src={require('./../../../images/'+props.site?.logo)} width={'250'} height={'250'}  alt="logo" className="logo" />
                            :
                            <img src={require('./../../../images/logo.png')} alt="logo" className="logo" />}
                        <div className="card-body">
                            <h3 className="card-title">Manager: {props.site?.siteManager !== null ?
                                <>{`${props.site?.siteManager.fname} ${props.site?.siteManager.lname}`}</>
                                :
                                <p>No manager assigned</p>}</h3>
                            <p className="card-text">Location: {props.site?.location}</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}