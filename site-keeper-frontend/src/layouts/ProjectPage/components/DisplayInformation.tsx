import { useState } from "react"
import InformationModel from "../../../models/Information/InformationModel"
import {useEffect} from 'react';
import { config } from "../../../config/Constants";
import UserModel from "../../../models/User/UserModel";
import { engineerCheck } from "../../Utils/TsFunctions";
import { InformationCard } from "../../Utils/Information/InformationCard";

export const DisplayInformation: React.FC<{project: string, discipline: number, refresh: boolean, user: UserModel | undefined, reload: any}> = (props) => {

    const [information, setInformation] = useState<InformationModel[]>([])

    useEffect(() => {
        const fetchInformation = async () => {
            const response = await fetch(config.API_URL + `/api/information/getInformationByDisciplineAndProject?discipline=${props.discipline}&project=${props.project}`)
            if(!response.ok){
                throw new Error("something went wrong")
            }
            setInformation(await response.json())
        }

        if(props.discipline !== undefined && props.project !== undefined){
            fetchInformation()
        }
    }, [props.discipline, props.project, props.refresh])

    return (
        <>
        {information.map(i => (
            <InformationCard user={props.user} information={i} refresh={props.refresh} reload={props.reload}/>
        ))}
        </>
    )
}