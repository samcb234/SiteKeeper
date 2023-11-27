import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserRequestModel from "../../../models/User/UserRequestModel";
import { config } from "../../../config/Constants";
import SiteRequestModel from "../../../models/Site/SiteRequestModel";
import { ManagerDropDown } from "./ManagerDropDown";
import UserModel from "../../../models/User/UserModel";

// interface SiteModalProps {
//     site: SiteRequestModel | null;
//     onClose: () => void; // Add onClick prop
// }

export const SiteModal: React.FC<{ site: SiteRequestModel | undefined, onClose: any, refresh: any }> = (props) => {

    const [newManager, setNewManager] = useState<UserModel>()

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

    function updateManager(managerId: UserModel) {
        console.log(newManager)
        setNewManager(managerId)
        console.log(newManager)
        console.log(newManager)
    }


    const submitChanges = async () => {
        if (props.site !== undefined) {
            const updateSite: SiteRequestModel = props.site
            
            if (newManager !== null && newManager !== undefined) {
                updateSite.siteManager = newManager
            }

            if(img !== null){
                updateSite.logo = img
            }
            
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateSite)
            }
            console.log(requestOptions)
            const response = await fetch(config.API_URL+`/api/site/updateSite?id=${updateSite.id}`, requestOptions)
            if(!response.ok){
                throw new Error("something went wrong")
            }
            props.refresh()
        }
    }



    return (
        <Modal open={props.site !== null} onClose={props.onClose}>

            {props.site ? (
                <div className="modal-size">
                    <h2>{props.site.name}</h2>

                    <p>Manager: {`${props.site.siteManager.fname} ${props.site.siteManager.lname}`}</p>

                    <p>Location: {props.site.location}</p>

                    <div className="form-group ">
                        <label htmlFor="inputPeripheral">
                            Edit Site Responsible
                        </label>
                        <div className=" col-md-9 mt-8">
                            <ManagerDropDown updateManager={setNewManager} />
                        </div>

                    </div>

                    <div className="form-group mt-16">
                        <label htmlFor="inputPeripheral">
                            Upload Site Logo
                        </label>
                        <input
                            type="file"
                            className="form-control mt-8"
                            id="customFile"
                            onChange={(e) => base64ConversionForImages(e)}
                        />

                    </div>

                    <div className="mt-8 justify-content-end">
                        <Button variant="contained" onClick={() => submitChanges()}>Save</Button>
                    </div>


                </div>
            )
                :
                <div>
                    No Site Selected
                </div>
            }
        </Modal>
    );
}