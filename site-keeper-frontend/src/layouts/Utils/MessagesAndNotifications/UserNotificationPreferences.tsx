import { useState } from "react";
import UserModel from "../../../models/User/UserModel";
import UserRequestModel from "../../../models/User/UserRequestModel";
import { httpBodyRequest } from "../TsFunctions";
import { config } from "../../../config/Constants";

export const UserNotificationPreferences: React.FC<{reload: any, refresh: boolean, user: UserModel | undefined}> = (props) => {
    const [duration, setDuration] = useState(0)
    const [timeFrame, setTimeframe] = useState('Never')

    async function updateUserNotification() {
        const date: Date = new Date()
        
        if (duration <= 0 && timeFrame !== 'Never') {
            throw new Error("need to have a contact date")
        }

        if (props.user !== undefined) {
            const userRequestModel: UserRequestModel = new UserRequestModel(props.user.id,
                props.user.fname,
                props.user.lname,
                props.user.role.id,
                props.user.contactDate,
                props.user.contactInfo,
                props.user.contactPeriod)
            switch (timeFrame.toLowerCase()) {
                case 'never': {
                    userRequestModel.contactDate = 'never'
                    userRequestModel.contactPeriod = 0
                    break
                }
                case 'days': {
                    date.setDate(date.getDate() + duration)
                    userRequestModel.contactDate = date.toLocaleDateString()
                    userRequestModel.contactPeriod = duration
                    break
                }
                case 'weeks': {
                    date.setDate(date.getDate() + (duration * 7))
                    userRequestModel.contactDate = date.toLocaleDateString()
                    userRequestModel.contactPeriod = duration * 7
                    break
                }
                case 'months': {
                    date.setMonth(date.getMonth() + +duration)
                    userRequestModel.contactDate = date.toLocaleDateString()
                    userRequestModel.contactPeriod = duration * 30
                    break
                }
                case 'years': {
                    date.setFullYear(date.getFullYear() + duration)
                    userRequestModel.contactDate = date.toLocaleDateString()
                    userRequestModel.contactPeriod = duration * 365
                    break
                }
            }
            
            await httpBodyRequest(config.API_URL + `/api/user/updateUser?id=${userRequestModel.id}`, 'error updating user', userRequestModel, 'PUT')
            props.reload()
        }
    }

    return(
        <div className="row mt-2">
                        <div className="col">
                            Provide Site Updates Every:
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" placeholder="Time Between Notifications"
                                onChange={e => setDuration(Number(e.target.value))} value={duration} />
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn btn-primary" type="button" id="timeDropDown"
                                    data-bs-toggle="dropdown" aria-expanded="false">{timeFrame}</button>
                                <ul className="dropdown-menu" aria-labelledby="timeDropDown">
                                    <li onClick={() => setTimeframe('Never')}>
                                        <a className="dropdown-item" href="#">
                                            Never
                                        </a>
                                    </li>
                                    <li onClick={() => setTimeframe('Days')}>
                                        <a className="dropdown-item" href="#">
                                            Days
                                        </a>
                                    </li>
                                    <li onClick={() => setTimeframe('Weeks')}>

                                        <a className="dropdown-item" href="#">
                                            Weeks
                                        </a>
                                    </li>
                                    <li onClick={() => setTimeframe('Months')}>
                                        <a className="dropdown-item" href="#">
                                            Months
                                        </a>
                                    </li>
                                    <li onClick={() => setTimeframe('Years')}>
                                        <a className="dropdown-item" href="#">
                                            Years
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-secondary" onClick={() => updateUserNotification()}>Configure Notifications</button>
                        </div>
                    </div>
    )
}