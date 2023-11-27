import { useState } from "react"
import Terminal from "../../../models/Inventory/Terminal"
import { config } from "../../../config/Constants";
import PeripheralRequestModel from "../../../models/Inventory/PeripheralRequestModel";

export const PeripheralForm = () => {


    const [description, setDescription] = useState('')
    const [img, setImg] = useState<any>(null)
    const [name, setName] = useState('')

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0])
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error', error)
        }
    }

    async function submitNewPeripheral() {
        const url = config.API_URL + '/api/peripheral/addNewPeripheral'
        const peripheral: PeripheralRequestModel = new PeripheralRequestModel(img, description, name)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peripheral)
        }

        const response = await fetch(url, requestOptions)

        if (!response.ok) {
            throw new Error("something went wrong")
        }

        setDescription('')
        setName('')
        setImg(null)

        window.location.reload();
    }



    return (
        <form className="mt-16">
            <div className="col-md-8">
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="inputTerminal">ID</label>*/}
                {/*    <input type="text" className="form-control mt-8" id="editInput"*/}
                {/*    onChange={e => setId(Number(e.target.value))} value = {id}/>*/}
                {/*</div>*/}
            </div>

            <div className="col-md-8">
                <div className="form-group">
                    <label htmlFor="inputTerminal">Name</label>
                    <input type="text" className="form-control mt-8" id="editInput"
                        onChange={e => setName(e.target.value)} value={name} />
                </div>
            </div>

            <div className="col mt-16">
                <div className="form-group ">
                    <label htmlFor="inputPeripheral">
                        Description
                    </label>
                    <textarea className="form-control-modal" rows={3}
                        onChange={e => setDescription(e.target.value)} value={description} >
                    </textarea>
                </div>
            </div>

            <div className="row mt-16">
                <div className="col-md-8">
                    <label className="form-label" htmlFor="customFile">Upload Terminal Image</label>
                    <input type="file" className="form-control" id="customFile"
                        onChange={e => base64ConversionForImages(e)} />
                </div>
            </div>

            <div className="d-flex flex-row justify-content-end mt-8  ">
                <button type="button" className="btn btn-secondary mr-20" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                    onClick={e => submitNewPeripheral()}>Save</button>
            </div>

        </form>
    );
}