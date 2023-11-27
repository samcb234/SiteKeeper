import React, { useEffect, useState } from "react";
import Terminal from "../../../models/Inventory/Terminal";
import { config } from "../../../config/Constants";
import { Autocomplete, Button, TextField } from "@mui/material";

export const TerminalDropDown: React.FC<{refresh: any}> = (props) => {


    const [terminals, setTerminals] = useState<Terminal[]>([]);

    const [selectedTerminal, setSelectedTerminal] = useState('');

    const [selectedTerminalId, setSelectedTerminalId] = useState<Terminal>();

    const [img, setImg] = useState<any>(null)

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

    useEffect(() => {
        const fetchTerminals = async () => {
            const url = config.API_URL + `/api/terminal/getAllTerminals`;

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            console.log(responseJson)

            const newTerminals: Terminal[] = []
            for (let t in responseJson) {
                newTerminals.push(new Terminal(responseJson[t].id,
                    responseJson[t].img,
                    responseJson[t].description,
                    responseJson[t].name,
                ))
            }


            setTerminals(newTerminals)
        }
        fetchTerminals();
    }, [])




    let terms = new Array()


    const fetchTerminalId = async () => {
        console.log(selectedTerminal)
        const url = config.API_URL + `/api/terminal/getTerminalByName?name=${selectedTerminal}`;

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("something went wrong")
        }

        setSelectedTerminalId(await response.json())

    }

    const updateImage = async () => {
        let updateTerminal: Terminal|null = null
        for(let i = 0; i < terminals.length; i ++){
            console.log(terminals[i].name)
            if(terminals[i].name === selectedTerminal){
                updateTerminal = terminals[i]
                console.log('here')
            }
        }
        if (updateTerminal !== null && img !== null) {
            
    
            updateTerminal.img = img
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateTerminal)
            }
            const url = config.API_URL + `/api/terminal/updateTerminal?id=${updateTerminal.id}`;
            const response = await fetch(url, requestOptions)

            if (!response.ok) {
                throw new Error("something went wrong")
            }
            props.refresh()
        }
        else{
            console.log('terminal is')
            console.log(selectedTerminal)
        }
    }


    for (let i = 0; i < terminals.length; i++) {
        terms.push(terminals[i].name)
    }
    return (

        <div className="modal-upload">
            <h5 className="modal-title" id="exampleModalLabel">Upload Image</h5>

            <div className="admin-dropdown mt-16">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={terms}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Terminal" />}
                    onChange={(event, newValue) => {
                        setSelectedTerminal(newValue)
                    }}
                />
            </div>
            <input
                type="file"
                className="form-control mt-16"
                id="customFile"
                onChange={(e) => base64ConversionForImages(e)}
            />
            <div className="mt-24">
                <Button variant="contained" onClick={() => updateImage()}>Submit</Button>
            </div>
        </div>

    );
}