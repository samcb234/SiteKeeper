import { useEffect, useState } from "react"
import AddBaseFeatureRequestModel from "../../models/Feature/AddBaseFeatureRequestModel"
import { Features } from "./components/Features"
import {config} from "../../config/Constants";

export const BaseFeatures = () => {
    const [description, setDescription] = useState('')
    const [img, setImg] = useState<any>(null)
    const [cost, setCost] = useState(0)
    const [name, setName] = useState('')
    const [refresh, setRefresh] = useState(true)


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

    async function submitNewBaseFeature() {
        const url = config.API_URL+'/api/feature/baseFeature/addFeature'

        const feature: AddBaseFeatureRequestModel = new AddBaseFeatureRequestModel(img, description, cost, name)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feature)
        }

        const response = await fetch(url, requestOptions)

        if (!response.ok) {
            throw new Error("something went wrong")
        }

        setDescription('')
        setCost(0)
        setImg(null)
        setName('')
        setRefresh(!refresh)
    }

    return (
        <div className="container mt-3">
            <div className="col justify-content-start">
                <h4 className="text-warning font-weight-bold">
                    Create Base Feature
                </h4>
            </div>
            <div className="row mt-3">
                <div className="row">
                <div className="col">
                    <label className="form-label">Name</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" onChange={e => setName(e.target.value)} value={name}></textarea>
                </div>
                    <div className="col-auto">
                        <label className="col-form-label">Cost (hours)</label>
                    </div>
                    <div className="col-auto">
                        <input type="number" className="form-control" onChange={e => setCost(Number(e.target.value))} value={cost} />

                    </div>
                    <div className="col-auto">
                        <input type='file' onChange={e => base64ConversionForImages(e)} />

                    </div>
                </div>
                <div className="col">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} onChange={e => setDescription(e.target.value)} value={description}></textarea>
                </div>
            </div>
            <div className="row mt-3 justify-content-end">
                <div className="col-1">
                    <button className="btn btn-primary" onClick={submitNewBaseFeature}>Create</button>
                </div>
            </div>
            <Features refresh={refresh}/>
        </div>
    )
}