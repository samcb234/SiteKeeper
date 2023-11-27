import React from "react";
import FeatureModel from "../../../models/Feature/FeatureModel";


export const VerificationModal: React.FC <{feature: FeatureModel|null, onClose: any, onVerify:any}> =
    (props) =>{

    if(!props.feature){
        console.log('here')
        return null;
    }
    console.log('here 2')
        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Verify Feature</h2>
                    <p>Do you want to verify the feature: {props.feature.name}?</p>
                    <button onClick={() => props.onVerify(props.feature as FeatureModel)}>Verify</button>
                    <button onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        );
}