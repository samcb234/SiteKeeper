import { useEffect, useState } from "react"
import { httpGetRequest } from "../Utils/TsFunctions"
import { config } from "../../config/Constants"
import { Barplot } from "./BarPlot"


export const PictographExample = () =>{
    const [data, setData] = useState<{name: string; value: number}[]>([])

 

    useEffect(() =>{
        const fetchData = async ()=>{
            const response = await httpGetRequest(config.API_URL+'/api/feature/getFeatureCount', 'error fetching statistics')
            setData(response)
        }
        fetchData()
    }, [])

    return (
        <>
        <Barplot width={700} height={400} data={data}/>
        </>
    )
}