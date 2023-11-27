import { useState } from 'react';
import InformationRequestModel from '../../../models/Information/InformationRequestModel';
import { config } from '../../../config/Constants';
export const AddNewInformation: React.FC<{ project: string, discipline: number, refresh: any }> = (props) => {
    const [input, setInput] = useState('')
    const [name, setName] = useState('')

    async function submitNewInformation() {
        if (input !== '') {
            const newInfo: InformationRequestModel = new InformationRequestModel(Number(props.project), props.discipline, input, name)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
            }

            const response = await fetch(config.API_URL + `/api/information/addNewInformation`, requestOptions)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            setInput('')
            props.refresh()

        }
    }

    return (
        <>
            <input type="text" className="form-control" placeholder="Enter information name" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setName(e.target.value)} value={name}/>
            <input type="text" className="form-control" placeholder="Enter new information" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setInput(e.target.value)} value={input}/>
            <button className='btn btn-primary mt-2' onClick={()=> submitNewInformation()}>Submit</button>
        </>
    )
}