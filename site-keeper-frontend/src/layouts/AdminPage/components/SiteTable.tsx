import React, { useEffect, useState } from "react";
import SiteRequestModel from "../../../models/Site/SiteRequestModel";
import { config } from "../../../config/Constants";
import { Modal } from "@mui/material";
import { AdminSiteRow } from "./AdminSiteRow";
import { FrameworkForm } from "../../FrameworkPage/components/FrameworkForm";
import { SiteModal } from "./SiteModal";


export const SiteTable = () => {
    const [sites, setSites] = useState<SiteRequestModel[]>([]);
    const [selectedSite, setSelectedSite] = useState<SiteRequestModel>();
    const [refresh, setRefresh] = useState(true)

    function reload(){
        setRefresh(!refresh)
    }


    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await fetch(config.API_URL + '/api/site/getAllSites');
                if (!response.ok) {
                    throw new Error("something went wrong here");
                }
                const responseJson = await response.json();

                const newSites: SiteRequestModel[] = []

                for(let r in responseJson){
                    newSites.push(new SiteRequestModel(
                        responseJson[r].id,
                        responseJson[r].name,
                        responseJson[r].siteManager,
                        responseJson[r].logo,
                        responseJson[r].location,
                        responseJson[r].abbreviation,
                        responseJson[r].betslipId
                    ))
                }

                setSites(newSites);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSites();
    }, [refresh]);

    const handleRowClick = (site: SiteRequestModel) => {
        setSelectedSite(site); // Set the selected site when a row is clicked
    };

    const handleCloseModal = () => {
        setSelectedSite(undefined);
    };

    console.log(sites)
    return (
        <div className="container">
            <table className="table caption-top">
                <thead>
                    <tr>
                        <th scope="col">Logo</th>
                        <th scope="col">Site Name</th>
                        <th scope="col">Manager</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map(site => (
                        <AdminSiteRow site={site} key={site.id} onClick={() => handleRowClick(site)} /> // Pass the onClick handler
                    ))}
                </tbody>
            </table>

            {selectedSite !== undefined ?
                <SiteModal site={selectedSite} onClose={handleCloseModal} refresh={reload}/> :
                <></>}
        </div>
    );
};


