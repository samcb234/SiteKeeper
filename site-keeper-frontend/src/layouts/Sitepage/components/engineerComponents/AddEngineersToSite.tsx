import { useEffect, useState } from "react"
import UserRequestModel from "../../../../models/User/UserRequestModel"
import { config } from "../../../../config/Constants"
import SearchSiteModel from "../../../../models/Site/SearchSiteModel"

export const AddEngineersToSite:React.FC<{site: SearchSiteModel | undefined, existingIds: number[], reload: any, refresh: boolean}> = (props) => {

    const [engineer, setEngineer] = useState(0)
    const [searchEngineer, setSearchEngineer] = useState('')
    const [potentialEngineers, setPotentialEngineers] = useState<UserRequestModel[]>([])


    async function submitRelation() {
        const submitRequest = async () => {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "user": engineer, "site": props.site?.id, active: true})
            }

            const response = await fetch(config.API_URL+'/api/usersOnSites/addNewUsersOnSites', requestOptions)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            props.reload()
            setEngineer(0)
            setSearchEngineer('')
            setPotentialEngineers([])
        }

        if (engineer > 0 && props.existingIds.indexOf(engineer) == -1) {
            submitRequest().catch((error: any) => {
                setEngineer(0)
            })//NEED TO HAVE MORE ROBUST ERROR MESSAGE IF DISCIPLINE DOESN'T EXIST!
        }
    }

    function selectFeature(id: number, name: string) {
        setSearchEngineer(name)
        setEngineer(id)
        setPotentialEngineers([])
    }

    useEffect(() => {
        const fetchPotentialFeatures = async () => {
            const response = await fetch(config.API_URL+`/api/user/getUsersByContactInfoAndSite?contactInfo=${searchEngineer}&siteId=${props.site?.id}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const responseJson = await response.json()

            const newFeatures: UserRequestModel[] = []

            for (let f in responseJson) {
                newFeatures.push(new UserRequestModel(responseJson[f].id,
                    responseJson[f].fname,
                    responseJson[f].lname,
                    responseJson[f].role,
                    responseJson[f].contactDate,
                    responseJson[f].contactInfo,
                    responseJson[f].contactPeriod))
            }

            if(newFeatures.length == 1 && newFeatures[0].contactInfo === searchEngineer){
                setPotentialEngineers([])
                setEngineer(newFeatures[0].id)
            }else{
                setPotentialEngineers(newFeatures)
                setEngineer(0)
            }
            
        }
        if (searchEngineer !== '') {
            fetchPotentialFeatures()
        }
        else{
            setPotentialEngineers([])
        }

    }, [searchEngineer])
    return(
        <div className="container">
            <h4 className="text-warning mt-3">
                Add New Engineer
            </h4>
            <input type="text" className="form-control mb-1" placeholder="email@IGT.com"
                aira-label='start date' onChange={e => setSearchEngineer(e.target.value)} value={searchEngineer} />
            {potentialEngineers.map(potentialEngineer => (
                <span onClick={() => selectFeature(potentialEngineer.id, potentialEngineer.contactInfo)} 
                className="input-group-text" key={potentialEngineer.id}>{potentialEngineer.contactInfo}</span>
            ))}
            <button className="btn btn-primary mt-1" onClick={() => submitRelation()}>Add</button>
        </div>
    )
}