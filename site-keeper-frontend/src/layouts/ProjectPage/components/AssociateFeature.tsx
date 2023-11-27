import { useEffect, useState } from "react"
import { config } from "../../../config/Constants";
import FeatureModel from "../../../models/Feature/FeatureModel";
import { findSimilarSearchItems } from "../../Utils/JsFunctions";
export const AssociateExistingFeature: React.FC<{ project: string, existingIds: number[], reload: any, refresh: boolean }> = (props) => {
    
    const [search, setSearch] = useState('')
    const [allFeatures, setAllFeatures] = useState<FeatureModel[]>([])
    const [similarTerms, setSimilarTerms] = useState<string[]>([])

    //useEffect that gets all features
    useEffect(() => {
        const fetchFeature = async () => {
            const response = await fetch(config.API_URL + '/api/feature/getAllFeatures')
            if (!response.ok) {
                throw new Error("something went wrong fetching all features")
            }
            const responseJson = await response.json()
            const newFeatures: FeatureModel[] = []

            for (let f in responseJson) {
                if (props.existingIds.indexOf(responseJson[f].id) === -1) {
                    newFeatures.push(responseJson[f])
                }
            }
            
            setAllFeatures(newFeatures)
        }
        if(props.existingIds !== undefined){
            fetchFeature()
        }
    }, [props.existingIds])



    function findPotentialFeatures(value: string) {
        setSearch(value)
        const lowerCaseVal = value.toLowerCase()
        const out: string[] = []
        if(value !== ''){
            for(let i = 0; i < allFeatures.length; i++){
                if(allFeatures[i].name.toLowerCase().includes(lowerCaseVal)){
                    out.push(allFeatures[i].name)
                }
            }
        }
        setSimilarTerms(out)
        return out
    }

    async function submitRelation() {
        let feature: FeatureModel | undefined = undefined

        for(let f in allFeatures){
            if(allFeatures[f].name === search){
                feature = allFeatures[f]
            }
        }

        const submitRequest = async () => {

            
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "feature": feature?.id, "project": Number(props.project) })
            }

            const response = await fetch(config.API_URL + '/api/project/associateAdditionalFeature', requestOptions)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            setSearch('')
            props.reload()
        }

        if (feature !== undefined && props.existingIds.indexOf(feature.id) == -1) {
            submitRequest().catch((error: any) => {
                setSearch('')
            })//NEED TO HAVE MORE ROBUST ERROR MESSAGE IF DISCIPLINE DOESN'T EXIST!
        }
    }

   function selectFullName(value: string){
    setSimilarTerms([])
    setSearch(value)
   }

    return (
        <div className="container">
            <h4 className="text-warning">
                Add feature
            </h4>
            <span className="input-group-text">Feature</span>
            <input type="text" className="form-control" placeholder=""
                aira-label='start date' onChange={e => findPotentialFeatures(e.target.value)} value={search} />
            <>{similarTerms.map(similarTerm => (
                <span key={similarTerms.indexOf(similarTerm)} className="input-group-text" onClick={() => selectFullName(similarTerm)}>{similarTerm}</span>

            ))}
            </>
            <button className="btn btn-primary" onClick={() => submitRelation()}>Add</button>
        </div>
    )
}