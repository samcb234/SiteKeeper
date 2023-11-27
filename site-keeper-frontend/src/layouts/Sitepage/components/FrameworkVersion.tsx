import React, {useEffect, useState} from "react";
import {config} from "../../../config/Constants";
import FrameworkRequest from "../../../models/Inventory/FrameworkRequestModel";

export const FrameworkVersion: React.FC<{ terminal: number }> = (props) => {


    const [framework, setFramework] = useState<FrameworkRequest[]>([]);

    useEffect(() => {
        const fetchFrameworks = async () => {
            const url = config.API_URL+`/api/framework/getFrameworkByTerminal?terminalId=${props.terminal}`;

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()


            console.log(responseJson)

            const newFramework: FrameworkRequest[] = []

            for(let t in responseJson){
                newFramework.push(new FrameworkRequest(responseJson[t].description,
                    responseJson[t].terminalId,
                    responseJson[t].name,
                ))
            }

            setFramework(newFramework)
        }
        fetchFrameworks();
    }, [])


    return(
      <div  >

              {framework.map(f => (
                  <label  key={f.name} >
                      {f.name}
                  </label>

              ))}


      </div>
    );

}
