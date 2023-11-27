import React, {useState} from "react";
import {SiteTable} from "./SiteTable";
import {ManagerDropDown} from "./ManagerDropDown";



export const AdminSite = () =>{




    return(

        <div className = "container mt-24">
            <label>
                <h5>
                    Current Sites
                </h5>
            </label>
            <SiteTable/>

        </div>


    );
}