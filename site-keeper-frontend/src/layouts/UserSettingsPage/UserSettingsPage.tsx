import { useState } from "react";
import UserModel from "../../models/User/UserModel";
import { UserNotificationPreferences } from "../Utils/MessagesAndNotifications/UserNotificationPreferences";

export const UserSettingsPage: React.FC<{user: UserModel|undefined, refresh: boolean, reload: any}> = (props) =>{
    return(
        <div className="container-fluid">
            <div className={"row text-center"}>
                <div className={"col-12"}>
                    <h3>User preferences</h3>
                </div>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-6"}>
                    <h3>Email Notification Preferences</h3>
                </div>
                <div className={"col-6"}>
                    <UserNotificationPreferences user={props.user} refresh={props.refresh} reload={props.reload}/>
                </div>
            </div>
        </div>
    )
}