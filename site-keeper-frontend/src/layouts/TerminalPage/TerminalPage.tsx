import React, {useEffect, useState} from "react";
import terminal from "../../models/Inventory/Terminal";
import {TerminalTable} from "./components/TerminalTable";
import Terminal from "../../models/Inventory/Terminal";
import { TerminalForm } from "./components/TerminalForm";
import {Button, Modal} from "@mui/material";
import {UploadFile} from "@mui/icons-material";
import {TerminalDropDown} from "./components/TerminalDropDown";



export const TerminalPage = () =>{



    const [uploadClicked, setUploadClicked] = useState(false)
    const [reload, setReload] = useState(true)


    const submitImage = () =>{
        setUploadClicked(false);
    }

    function refresh(){
        setReload(!reload)
    }

    return(
        <div className = "container">

            <div className = "d-flex justify-content-between mt-16">


                <Button variant="contained" startIcon={<UploadFile />} onClick={e => setUploadClicked(true)}>
                    Upload Terminal Image
                </Button>

                <Modal open={uploadClicked == true} onClose = {e => setUploadClicked(false)} >

                        <TerminalDropDown refresh={refresh}/>

                </Modal>


                <button className="btn  btn-lg text-white bg-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div className=" d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                             fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="6" fill={"#66FF99"} />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>

                        Add Terminal
                    </div>
                </button>

            </div>

            <div className="modal fade" id="exampleModal" tabIndex= {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Terminal Information</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          <TerminalForm reload={reload} refresh={refresh}/>
                        </div>
                  
                    </div>
                </div>
            </div>
               <TerminalTable refresh={reload} />
        </div>

    );
}