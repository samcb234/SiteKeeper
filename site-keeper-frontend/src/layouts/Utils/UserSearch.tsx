import { useEffect, useState } from "react"
import UserModel from "../../models/User/UserModel"
import { httpBodyRequest, httpGetRequest } from "./TsFunctions"
import { config } from "../../config/Constants"

export const UserSearch: React.FC<{provideUserEmail: any, role: string}> = (props) =>{
    const [user, setUser] = useState<UserModel>()
    const [email, setEmail] = useState('')
    const [suggestedEmails, setSuggestedEmails] = useState<string[]>([])
    const [sendRequest, setSendRequest] = useState(true)

    useEffect(()=>{
        const fetchSuggestedUsers = async () =>{
            const response = await httpGetRequest(config.API_URL + `/api/user/getSuggestedUsers?email=${email}`, 'error fetching suggested users')
            setSuggestedEmails(response)
        }

        if(email.length >= 3 && sendRequest){
            fetchSuggestedUsers()
            setSendRequest(false)
        }
        if(email.length < 3){
            setSuggestedEmails([])
            setSendRequest(true)
        }
    }, [email])

    function search(val: string): string[]{
        if(suggestedEmails!== undefined && suggestedEmails !== null && suggestedEmails.length > 0){
            const inputVal = val.toLowerCase()
            const inputLength = inputVal.length
            const sugLength = suggestedEmails.length < 5 ? suggestedEmails.length : 5

            const out = inputLength < 3 ? [] : suggestedEmails.filter(suggestion => suggestion.slice(0, inputLength) === inputVal).slice(0, sugLength)
            if(out.length === 1 && out[0] === email){
                return []
            }
            return out
        }
        return []
    }

    async function selectSuggestion(val: string){
        setEmail(val)
        const response = await httpBodyRequest(config.API_URL + `/api/user/addNewUserFromEmail?email=${val}&role=${props.role}`,
        'error creating new user', null, 'POST')
        props.provideUserEmail(response)
    }

    return(
        <>
            <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} value={email}/>
            {search(email).map(suggestion => (
                <span className="input-group-text" onClick={()=>selectSuggestion(suggestion)}>{suggestion}</span>
            ))}
        </>
    )
}