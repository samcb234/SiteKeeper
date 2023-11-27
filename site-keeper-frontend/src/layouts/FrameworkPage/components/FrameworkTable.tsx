import React, { useEffect, useState } from "react"
import Terminal from "../../../models/Inventory/Terminal";
import FrameworkRequest from "../../../models/Inventory/FrameworkRequestModel";
import {config} from "../../../config/Constants";

export const FrameworkTable = () => {

    const [framework, setFramework] = useState<FrameworkRequest[]>([]);

    useEffect(() => {
        const fetchFrameworks = async () => {
            const url = config.API_URL+'/api/framework/getAllFrameworks';

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            console.log(responseJson)

            const newFrameworks: FrameworkRequest[] = []

            for(let t in responseJson){
                newFrameworks.push(new FrameworkRequest(responseJson[t].description,
                    responseJson[t].terminalId,
                    responseJson[t].name,

                ))
            }

            setFramework(newFrameworks)
        }
        fetchFrameworks();
    }, [])

    return (
        <table className="table caption-top">
            <caption>
                <h5>
                    List of Frameworks
                </h5>

            </caption>
            <thead>
                <tr>
                    <th scope="col"> Terminal ID </th>
                    <th scope="col"> Name </th>
                    <th scope="col"> Description </th>
                </tr>
            </thead>

            <tbody>
                {framework.map(f => (
                    <tr key={f.terminalId} >
                        <td> {f.terminalId} </td>
                        <td> {f.name}</td>
                        <td> {f.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}