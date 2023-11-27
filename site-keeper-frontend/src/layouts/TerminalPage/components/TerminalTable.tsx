import React, { useEffect, useState } from "react"
import UserRequestModel from "../../../models/User/UserRequestModel";
import SiteRequestModel from "../../../models/Site/SiteRequestModel";
import Terminal from "../../../models/Inventory/Terminal";
import {config} from "../../../config/Constants";

export const TerminalTable: React.FC<{refresh: boolean}> = (props)=>{

    const [terminals, setTerminals] = useState<Terminal[]>([]);


    useEffect (() => {
        const fetchTerminals = async () =>{
            const url = config.API_URL+'/api/terminal/getAllTerminals';

            const response = await fetch(url)

            if(!response.ok){
                throw new Error ("something went wrong")
            }

            const responseJson = await response.json()
            
            console.log(responseJson)

            const newTerminals: Terminal[] = []
            for(let t in responseJson){
                newTerminals.push(new Terminal(responseJson[t].id,
                    responseJson[t].img,
                    responseJson[t].description,
                    responseJson[t].name,
                    ))
            }


            setTerminals(newTerminals)
        }
        fetchTerminals();
    },[props.refresh])




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

                {terminals.map(terminal => (
                  <tr key = {terminal.id} >
                      <td><img src={terminal.img}width={'50'} height={'50'} alt={'terminal'}/> </td>
                      <td> {terminal.name}</td>
                      <td> {terminal.description}</td>
                  </tr>

                ))}
                </tbody>
            </table>
        </div>
    );
}