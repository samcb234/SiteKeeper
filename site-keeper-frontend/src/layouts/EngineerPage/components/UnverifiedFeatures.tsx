import React, { useEffect, useState } from "react";
import FeatureModel from "../../../models/Feature/FeatureModel";
import { config } from "../../../config/Constants";
import { TabPane } from "../../FeaturePage/components/TabPane";
import Terminal from "../../../models/Inventory/Terminal";
import { VerificationModal } from "./VerificationModal";

export const UnverifiedFeatures = () => {

    const [features, setFeatures] = useState<FeatureModel[]>([]);
    const [unverifiedFeatures, setUnverifiedFeatures] = useState<FeatureModel[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<FeatureModel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchFeatures = async () => {
            const url = config.API_URL + '/api/feature/getUnverifiedFeatures';

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            setUnverifiedFeatures(await response.json())

        }

        fetchFeatures()
    }, [refresh])

    const handleRowClick = (feature: FeatureModel) => {
        console.log('Row clicked', feature)
        setSelectedFeature(feature);
        setIsModalOpen(true);

    };
    const handleVerifyFeature = (feature: FeatureModel) => {
        const updatedFeatures = unverifiedFeatures.map((f) => f.id === feature.id ? { ...f, isVerified: true } : f);
        setUnverifiedFeatures(updatedFeatures);
        setIsModalOpen(false);

    };


    const submitVerification = async() =>{
        const updatedFeature = selectedFeature
        if(updatedFeature !== null){
            updatedFeature.verifiedByEngineer = true
            console.log(updatedFeature)
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFeature)
            }
            console.log(requestOptions)
            const url = config.API_URL + `/api/feature/updateFeature?id=${updatedFeature.id}`
            const response = await fetch(url, requestOptions)
            if(!response.ok){
                throw new Error("something went wrong")
            }

            setSelectedFeature(null)
            setIsModalOpen(false)
            setRefresh(!refresh)
        }
    }

    return (
        <div className="container mt-16">
            <div>
                <h2> Select Features to Verify</h2>

            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"> Image </th>
                        <th scope="col"> Name </th>
                        <th scope="col"> Description </th>
                    </tr>
                </thead>
                <tbody>

                    {unverifiedFeatures.map(feature => (
                        <tr key={feature.id} onClick={() => handleRowClick(feature)}>
                            <td><img src={feature.img} width={'50'} height={'5'} alt={'terminal'} /> </td>
                            <td> {feature.name}</td>
                            <td> {feature.description}

                            </td>
                            <td>

                            </td>
                        </tr>


                    ))}
                </tbody>
            </table>
            {isModalOpen ?

                // <VerificationModal feature={selectedFeature}
                //     onClose={() => setIsModalOpen(false)}
                //     onVerify={handleVerifyFeature} /> : <></>}

                <div>
                        <h2>Verify Feature</h2>
                        <p>Do you want to verify the feature: {selectedFeature?.name}?</p>
                        <button onClick={() => submitVerification()}>Verify</button>
                        <button onClick={() =>setIsModalOpen(false)}>Cancel</button>
                    </div>
                    
                :
                <></>}
        </div>
    );
}