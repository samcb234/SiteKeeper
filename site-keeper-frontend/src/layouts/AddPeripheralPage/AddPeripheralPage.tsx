import React, {useEffect, useState} from "react";
import {PeripheralTable} from "./components/PeripheralTable";
import { PeripheralForm } from "./components/PeripheralForm";
import { AddPeripheralToTerminal } from "./components/AddPeripheralToTerminal";



export const AddPeripheralPage = () =>{
    return(
        <div className = "container">
            
            <div className = "d-flex justify-content-end mt-16">
                <button className="btn  btn-lg text-white bg-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div className=" d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                             fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="6" fill={"#66FF99"} />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>

                        Add Peripheral
                    </div>
                </button>
            </div>

            <div className = "d-flex justify-content-end mt-16">
                <button className="btn  btn-lg text-white bg-primary"  data-bs-toggle="modal" data-bs-target="#updatePeripheral">
                    <div className=" d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                             fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="6" fill={"#66FF99"} />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>

                        Assign Peripheral to Terminal
                    </div>
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex= {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Peripheral Information</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          <PeripheralForm/>
                        </div>
                  
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updatePeripheral" tabIndex= {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Assign Peripheral to Terminal</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        </div>
                            <AddPeripheralToTerminal/>
                    </div>
                </div>
            </div>
               <PeripheralTable />
        </div>

    );
}