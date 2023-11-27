import React, {useEffect, useState} from "react"
import FrameworkRequest from "../../../models/Inventory/FrameworkRequestModel";
import Terminal from "../../../models/Inventory/Terminal";
import terminal from "../../../models/Inventory/Terminal";
import {config} from "../../../config/Constants";

export const FrameworkForm = () => {
    const [description, setDescription] = useState('')
    const [terminalId, setTerminalId] = useState(0)
    const [name, setName] = useState('')


    async function submitNewFramework() {
        const url = config.API_URL+'/api/framework/addNewFramework'
        const framework: FrameworkRequest = new FrameworkRequest(description,terminalId,name)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(framework)
        }

        const response = await fetch(url, requestOptions)
        console.log(response)


        if (!response.ok) {
            throw new Error("something went wrong")
        }

        setDescription('')
        setTerminalId(0)
        setName('')

        window.location.reload();
    }

    return(
        <form className = "mt-16">

            <div className = "col-md-8">
                <div className="form-group">

                    <label htmlFor="inputTerminal">Name </label>
                    <input type="text" className="form-control mt-8" id="editInput"
                           onChange={e => setName(e.target.value)} value = {name}/>


                </div>
            </div>

            <div className = "col-md-8">
                <div className="form-group">
                    <label htmlFor="inputTerminal">Terminal Id</label>
                    <input type="text" className="form-control mt-8" id="editInput"
                           onChange={e => setTerminalId(Number(e.target.value))} value = {terminalId}/>
                </div>
            </div>


            <div className = "col mt-16">
                <div className = "form-group ">
                    <label htmlFor = "inputPeripheral">
                        Description
                    </label>
                    <textarea className = "form-control-modal" rows = {3}
                              onChange={e => setDescription(e.target.value)} value={description} >
                </textarea>
                </div>
            </div>


            <div className="d-flex flex-row justify-content-end mt-8  ">
                <button type="button" className="btn btn-secondary mr-20" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss = "modal"
                        onClick={e => submitNewFramework()}>Save</button>
            </div>

        </form>
    );
}