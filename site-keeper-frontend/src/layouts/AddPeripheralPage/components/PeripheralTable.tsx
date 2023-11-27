import React, { useEffect, useState } from "react"
import UserRequestModel from "../../../models/User/UserRequestModel";
import SiteRequestModel from "../../../models/Site/SiteRequestModel";
import Terminal from "../../../models/Inventory/Terminal";
import {config} from "../../../config/Constants";
import PeripheralModel from "../../../models/Inventory/PeripheralModel";

export const PeripheralTable = ()=>{

    const [peripherals, setPeripherals] = useState<PeripheralModel[]>([]);


    useEffect (() => {
        const fetchPeripherals = async () =>{
            const url = config.API_URL+'/api/peripheral/getAllPeripherals';

            const response = await fetch(url)

            if(!response.ok){
                throw new Error ("something went wrong")
            }

            const responseJson = await response.json()
            
            console.log(responseJson)

            const newPeripherals: PeripheralModel[] = []
            for(let t in responseJson){
                newPeripherals.push(new PeripheralModel(responseJson[t].id,
                    responseJson[t].img,
                    responseJson[t].name,
                    responseJson[t].description,
                    ))
            }


            setPeripherals(newPeripherals)
        }
        fetchPeripherals();
    },[])
    return(
        <div className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col"> Image </th>
                    <th scope="col"> Name </th>
                    <th scope="col"> Description </th>
                </tr>
                </thead>
                <tbody>
                
                {peripherals.map(peripheral => (
                  <tr key = {peripheral.id} >
                      <td><img src={peripheral.img}width={'50'} height={'50'} alt={'terminal'}/> </td>
                      <td> {peripheral.name}</td>
                      <td> {peripheral.description}</td>
                  </tr>

                ))}
                </tbody>
            </table>
        </div>
    );
}