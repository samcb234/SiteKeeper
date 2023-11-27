import { config } from "../../../config/Constants";
import MessageModel from "../../../models/Message/MessageModel";
import NotificationModel from "../../../models/NotificationModel";
import { useState, useEffect } from 'react';
import { MessageDisplay } from "../../Utils/MessagesAndNotifications/MessageDisplay";
import { Link } from "react-router-dom";

export const DisplayNotifications: React.FC<{ notification: NotificationModel, refresh: any }> = (props) => {
    const [message, setMessage] = useState<MessageModel>()

    useEffect(() => {
        const fetchMessage = async () => {
            const response = await fetch(config.API_URL + `/api/message/getMessageById?id=${props.notification.message}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            setMessage(await response.json())
        }

        fetchMessage();
    }, [])

    async function submitReadNotification() {
        if (props.notification !== undefined) {
            props.notification.seenByUser = true
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.notification)
            }

            const response = await fetch(config.API_URL + '/api/message/updateNotification', requestOptions);
            if (!response.ok) {
                throw new Error("something went wrong");
            }

            props.refresh();
        }
    }

    return (
        <>
            <div id="liveToast" className="toast show notification-toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">Costing: {message?.costing?.costingIdentifier}</strong>
                    <small>{message?.dateSent}</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                            aria-label="Close" />
                </div>
                <Link to={props.notification.link} onClick={()=>submitReadNotification()}>
                <div className="toast-body">
                    <MessageDisplay message={message}/>
                </div>
                </Link>
                <div className="toast-button-container">
                    <button className="btn btn-primary toast-button" onClick={()=> submitReadNotification()}>Mark as read</button>
                </div>
            </div>
        </>
    )
}