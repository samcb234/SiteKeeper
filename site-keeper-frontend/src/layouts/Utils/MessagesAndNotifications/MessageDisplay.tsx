import { useEffect, useState } from "react"
import MessageModel from "../../../models/Message/MessageModel"
import UserRequestModel from "../../../models/User/UserRequestModel"
import { config } from "../../../config/Constants"

export const MessageDisplay: React.FC<{message: MessageModel|undefined}> = (props) => {
    return(
        <>
            <div className="card">
                <div className="card-body">
                    <p><b>{props.message?.sender.fname} {props.message?.sender.lname}</b></p>
                    <p>{props.message?.message}</p>
                </div>
            </div>
        </>
    )
}