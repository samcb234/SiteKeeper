import { useState } from "react";
import FeatureModel from "../../../models/Feature/FeatureModel";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const SelectFeature: React.FC<{features: FeatureModel[], dropdownString: string, action: any}> = (props) =>{
    
    return(
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle='dropdown' aria-expanded='false'>
                <>
                {props.dropdownString} <ArrowDropDownIcon/>
                </>
            </button>
            <ul className="dropdown-menu">
                {props.features.map(feature =>(
                    <li key={feature.id} onClick={()=>props.action(feature)}>
                        <a className="dropdown-item" href="#">{feature.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}