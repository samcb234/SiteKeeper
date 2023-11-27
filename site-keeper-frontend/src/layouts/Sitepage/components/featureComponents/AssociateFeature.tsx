import { useEffect, useState } from "react"
import FeatureModel from "../../../../models/Feature/FeatureModel"
import {config} from "../../../../config/Constants";

export const AssociateExistingFeature: React.FC<{ site: string, existingIds: number[], reload: any, refresh: boolean }> = (props) => {

    const [feature, setFeature] = useState(0)
    const [searchFeature, setSearchFeature] = useState('')
    const [potentialFeatures, setPotentialFeatures] = useState<FeatureModel[]>([])

    async function submitRelation() {
        const submitRequest = async () => {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "feature": feature, "site": props.site })
            }

            const response = await fetch(config.API_URL+'/api/featuresOnSites/addFeaturesOnSites', requestOptions)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            props.reload()
            setFeature(0)
            setSearchFeature('')
            setPotentialFeatures([])
        }

        if (feature > 0 && props.existingIds.indexOf(feature) == -1) {
            submitRequest().catch((error: any) => {
                setFeature(0)
            })//NEED TO HAVE MORE ROBUST ERROR MESSAGE IF DISCIPLINE DOESN'T EXIST!
        }
    }

    function selectFeature(id: number, name: string) {
        setSearchFeature(name)
        setFeature(id)
        setPotentialFeatures([])
    }

    useEffect(() => {
        const fetchPotentialFeatures = async () => {
            const response = await fetch(config.API_URL+`/api/feature/getFeaturesByStartOfName?name=${searchFeature}&siteId=${props.site}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const responseJson = await response.json()

            const newFeatures: FeatureModel[] = []

            for (let f in responseJson) {
                newFeatures.push(new FeatureModel(responseJson[f].id,
                    responseJson[f].description,
                    responseJson[f].img,
                    responseJson[f].name,
                    responseJson[f].isVerified,
                    responseJson[f].disiplines,
                    responseJson[f].parentFeature))
            }

            if(newFeatures.length == 1 && newFeatures[0].name === searchFeature){
                setPotentialFeatures([])
                setFeature(newFeatures[0].id)
            }else{
                setPotentialFeatures(newFeatures)
                setFeature(0)
            }
            
        }
        if (searchFeature !== '') {
            fetchPotentialFeatures()
        }
        else{
            setPotentialFeatures([])
        }

    }, [searchFeature])

    return (
        <div className="container">
            <h4 className="text-warning mt-3">
                Add Feature
            </h4>
            <span className="input-group-text mb-1">Feature</span>
            <input type="text" className="form-control mb-1" placeholder=""
                aira-label='start date' onChange={e => setSearchFeature(e.target.value)} value={searchFeature} />
            {potentialFeatures.map(potentialFeature => (
                <span onClick={() => selectFeature(potentialFeature.id, potentialFeature.name)} 
                className="input-group-text" key={potentialFeature.id}>{potentialFeature.name}</span>
            ))}
            <button className="btn btn-primary mt-1" onClick={() => submitRelation()}>Add</button>
        </div>
    )
}