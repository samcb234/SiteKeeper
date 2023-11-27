import { useEffect, useState } from "react"
import MessageModel from "../../../models/Message/MessageModel"
import { config } from "../../../config/Constants"
import MessageRequestModel from "../../../models/Message/MessageRequestModel"
import CostingModel from "../../../models/CostingModel"
import UserModel from "../../../models/User/UserModel"
import { engineerCheck } from "../TsFunctions"
import { MessageDisplay } from "../MessagesAndNotifications/MessageDisplay"

 
export const Conversation: React.FC<{ costing: CostingModel | undefined, action: string, id: number|undefined,
user: UserModel|undefined }> = (props) => {
    
    const [updateCosting, setUpdateCosting] = useState(false)
    const [cost, setCost] = useState(0)

    const [messages, setMessages] = useState<MessageModel[]>([])
    const [newMessage, setNewMessage] = useState('')

    const [refresh, setRefresh] = useState(true)


    useEffect(() => {
        if(props.costing !== undefined && props.costing.cost !== undefined){
            setCost(props.costing.cost)
        }
    }, [props.costing])

    useEffect(() => {
        const fetchMessages = async () => {
            if (props.costing !== undefined) {
                const response = await fetch(config.API_URL + `/api/message/getMessagesByCosting?costing=${props.costing.id}`)
                if (!response.ok) {
                    throw new Error("something went wrong")
                }
                setMessages(await response.json())
            }

        }
        fetchMessages()
    }, [props.costing, refresh])

    async function submitNewMessage() {
        if (newMessage !== '' && props.costing !== undefined) {
            let userObj: any = {
                id: props.user?.id
            }
            let costingObj: any = {
                id: props.costing.id
            }

            const m = new MessageRequestModel(userObj,
                costingObj,
                newMessage,
                'today') //please use backend timestamp here as Date

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(m)
            }

            let a = ''
            if (props.action === 'site') {
                a = 'site'
            } else if (props.action === 'project') {
                a = 'project'
            }

            const response = await fetch(config.API_URL + `/api/message/addNewMessage?action=${a}&id=${props.id}`, requestOptions)
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            setRefresh(!refresh)
            setNewMessage('')
        }
    }

    async function submitUpdatedCosting(){
        if(props.costing !== undefined && updateCosting){
            props.costing.cost = cost
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.costing)
            }
            const url = config.API_URL + `/api/message/updateCosting`
            const response = await fetch(url, requestOptions)
            if(!response.ok){
                throw new Error("something went wrong")
            }
            
        }
        setUpdateCosting(!updateCosting)
    }

    return (
        <>
            <div>
                Cost in hours for this project:
                {updateCosting ?
                    <input className="form-control" type="number" value={cost} aria-label="readonly input example" onChange={e => setCost(Number(e.target.value))}/>
                    :
                    <input className="form-control" type="number" value={cost} aria-label="readonly input example" readOnly />

                }
                {engineerCheck(props.user) ?
                <button className="btn btn-primary mt-2" onClick={() => submitUpdatedCosting()}>{updateCosting ? 'save costing' : 'edit costing'}</button>
            :
            <button className="btn btn-primary mt-2" onClick={() => submitUpdatedCosting()} disabled>{updateCosting ? 'save costing' : 'edit costing'}</button>}
            </div>
            {messages.map(message => (
                <MessageDisplay message={message} key={message.id}/>
            ))}
            {engineerCheck(props.user) ?
            <>
            <div className="col mt-16">
            <div className="form-group ">
                <label htmlFor="inputPeripheral">
                    New Message
                </label>
                <textarea className="form-control" rows={3}
                    onChange={e => setNewMessage(e.target.value)} value={newMessage} >
                </textarea>
            </div>
        </div>
        <button className="btn btn-primary mt-2" onClick={() => submitNewMessage()}>send</button>
        </>
    :
    <></>}
        </>
    )
}