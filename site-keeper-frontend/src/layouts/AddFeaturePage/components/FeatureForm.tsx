import React, { useState, useEffect } from "react";
import FeatureModel from "../../../models/Feature/FeatureModel";
import DisciplineModel from "../../../models/Disciplines/DisciplineModel";
import {config} from "../../../config/Constants";
import DisciplineType from "../../../models/Disciplines/DisciplineTypeModel";
import { SelectFeature } from "./SelectFeature";

export const FeatureForm:React.FC<{reload:any, features: FeatureModel[]}> = (props) => {
    const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineType>();
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [img, setImg] = useState<any>(null)
    const [name, setName] = useState("");
    const [isVerified, setVerified] = useState(false)
    
    const [parentFeature, setParentFeature] = useState<FeatureModel>()

    useEffect(() => {
        // Fetch the list of disciplines when the component mounts
        const fetchDisciplines = async () => {
            const url = config.API_URL+"/api/discipline/getAllDisciplines";
            const response = await fetch(url);
            const disciplines = await response.json();
            setDisciplines(disciplines);
        }
        fetchDisciplines();
    }, []);

    

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
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


    // async function addFeatureToDiscipline(discipline: DisciplineModel) {


    //     setSelectedDiscipline(discipline.type);
    //     const url = config.API_URL+`/api/disciplines/addNewDisciplineByFeature?discipline=${selectedDiscipline}`;
    //     const requestOptions = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(discipline),
    //     };

    //     const response = await fetch(url, requestOptions);

    //     if (!response.ok) {
    //         throw new Error("Something went wrong");
    //     }

    //     setSelectedDiscipline('');
    //     setDescription("");
    //     setName("");
    //     setImg('');
    //     setId(0);

    //     props.reload()
    // }

    async function submitNewFeature() {
        if(selectedDiscipline !== undefined){
            const feature: FeatureModel = new FeatureModel(id, description, img, name, isVerified, [selectedDiscipline], null);
        if (parentFeature !== undefined) {
            feature.parentFeature = parentFeature
        }

        const url = config.API_URL + "/api/feature/addNewFeature";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feature),
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        setDescription("");
        setName("");
        setImg('');
        setId(0);

        setParentFeature(undefined)

        props.reload();
        }
    }

    function chooseDiscipline(val: String){
        for(let i = 0; i < disciplines.length; i++){
            if(disciplines[i].type === val.toLocaleLowerCase()){
                setSelectedDiscipline(disciplines[i])
                return
            }
        }
    }

    return (
        <form className="mt-16">


            <div className="col-md-8">
                <div className="form-group">
                    <label htmlFor="inputTerminal">Name</label>
                    <input
                        type="text"
                        className="form-control mt-8"
                        id="editInput"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
            </div>

            <div className="col mt-16">
                <div className="form-group ">
                    <label htmlFor="inputPeripheral">Description</label>
                    <textarea
                        className="form-control-modal"
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </div>
            </div>

            <div className="row mt-16">
                <div className="col-md-8">
                    <label className="form-label" htmlFor="customFile">
                        Upload Feature Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="customFile"
                        onChange={(e) => base64ConversionForImages(e)}
                    />
                </div>
            </div>

            <div className="row mt-16">
                <div className="col-md-8">
                    <label htmlFor="selectDiscipline">Select a Discipline</label>
                    <select
                        className="form-control"
                        id="selectDiscipline"
                        onChange={e => chooseDiscipline(e.target.value)}
                        value={selectedDiscipline?.type}
                    >

                        <option value="">Select a Discipline</option>
                        <option value="Terminal">Terminal</option>
                        <option value="Middleware">Middleware</option>
                        <option value="Host">Host</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3">
                <SelectFeature features={props.features} dropdownString={parentFeature === undefined ? 'select parent feature if needed' : parentFeature.name} action={setParentFeature}/>
            </div>

            <div className="d-flex flex-row justify-content-end mt-8">
                <button
                    type="button"
                    className="btn btn-secondary mr-20"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={(e) => submitNewFeature()}
                >
                    Save
                </button>
            </div>
        </form>
    );
};
