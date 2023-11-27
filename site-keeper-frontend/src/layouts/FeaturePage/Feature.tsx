import { useEffect, useState } from "react"
import FeatureModel from "../../models/Feature/FeatureModel"
import { TabPane } from "./components/TabPane"
import { config } from "../../config/Constants"

export const Feature = () => {

    const featureId = (window.location.pathname).split('/')[2]

    const [feature, setFeature] = useState<FeatureModel>()

    useEffect(() => {
        const fetchFeature = async () => {
            const response = await fetch(config.API_URL+`/api/feature/getFeatureById?featureId=${featureId}`)
            if(!response.ok){
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            setFeature(new FeatureModel(responseJson.id,
                responseJson.description,
                responseJson.img,
                responseJson.name,
                responseJson.isVerified,
                responseJson.disciplines,
                responseJson.parentFeature))
        }

        fetchFeature()
    }, [])
    return(
        <div className="container mt-5">
            <div className="container">
                    <div className="row">
                        <div className="col-4">
                            {feature?.img ? 
                                <img src={feature?.img} width='50' height='50' alt="img"/>
                                :
                                <img src={require('./../../images/terminalplaceholder.jpg')} width='150' height='150' alt='feature'/>
                        }
                        </div>
                        <div className="col">
                            <h4 className="text-warning font-weight-bold">
                                {feature?.name}
                            </h4>
                            <p>{feature?.description}</p>
                        </div>
                    </div>
                </div>
            <div className="mt-5">
            <TabPane feature={featureId}/>
            </div>
        </div>
    )
}