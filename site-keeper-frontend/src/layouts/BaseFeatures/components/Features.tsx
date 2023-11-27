import { useEffect, useState } from "react"
import BaseFeatureModel from "../../../models/Feature/BaseFeatureModel"
import {config} from "../../../config/Constants";

export const Features: React.FC<{refresh:boolean}> = (props) => {

    const [features, setFeatures] = useState<BaseFeatureModel[]>([])
    
    useEffect(() => {
        const baseUrl = config.API_URL+'/api/'
        const fetchFeatures = async () => {
            const url = `${baseUrl}feature/baseFeature/getAllFeatures`

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            
            setFeatures(responseJson)
        }

        fetchFeatures()
    }, [props.refresh])


    return (
        <>
        <div>

            {features.map(feature => (
                <div key={feature.id} className="container">
                    <div className="row">
                        <div className="col-4">
                            {feature?.img ? 
                                <img src={feature?.img} width='50' height='50' alt="img"/>
                                :
                                <img src={require('../../../images/terminalplaceholder.jpg')} width='150' height='150' alt='feature'/>
                        }
                        </div>
                        <div className="col">
                            <h4 className="text-warning font-weight-bold">
                                {feature.name}
                            </h4>
                            <p>{feature.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        
        </div>
        </>
    )
}