import { useEffect, useState } from "react"
import Terminal from "../../../models/Inventory/Terminal"
import {config} from "../../../config/Constants";
import InventoryModel from "../../../models/Inventory/InventoryModel";

export const InventoryDisplay: React.FC<{ inventory: InventoryModel[] }> = (props) => {

    return (
        <div>

            {props.inventory.map(i => (
                <div key={i.id} className="container">
                    <div className="row">
                        <div className="col-4">
                            {i?.img ? 
                                <img src={i?.img} width='50' height='50' alt="img"/>
                                :
                                <img src={require('../../../images/terminalplaceholder.jpg')} width='150' height='150' alt='terminal'/>
                        }
                        </div>
                        <div className="col">
                            <h4 className="text-warning font-weight-bold">
                                {i.name}
                            </h4>
                            <p>{i.description}</p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}