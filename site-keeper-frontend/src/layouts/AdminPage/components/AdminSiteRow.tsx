import React, { useEffect, useState } from "react";
import SiteRequestModel from "../../../models/Site/SiteRequestModel";
import { config } from "../../../config/Constants";
import { Link } from "react-router-dom";
import UserRequestModel from "../../../models/User/UserRequestModel";

interface AdminSiteProps {
    site: SiteRequestModel;
    onClick: () => void; // Add onClick prop
}

export const AdminSiteRow: React.FC<AdminSiteProps> = ({ site, onClick }) => {
    const [siteManager, setSiteManager] = useState<UserRequestModel>();

    useEffect(() => {
        if (site.siteManager !== null) {
            const fetchManager = async () => {
                try {
                    const response = await fetch(config.API_URL + `/api/user/getUserById?id=${site?.siteManager.id}`);
                    if (!response.ok) {
                        throw new Error("something went wrong");
                    }
                    const responseJson = await response.json();

                    setSiteManager(new UserRequestModel(
                        responseJson.id,
                        responseJson.fname,
                        responseJson.lname,
                        responseJson.role,
                        responseJson.contactDate,
                        responseJson.contactInfo,
                        responseJson.contactPeriod
                    ));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchManager();
        }
    }, [site.siteManager]);
    
    return (
        <tr onClick={onClick}>
            <th scope="row">
                {site.logo ? <><img src={site.logo} width={'50'} height={'50'} alt='logo' /></> : <h4>{site.name}</h4>}
            </th>
            <td>
                {site.name}
            </td>
            <td>
                {siteManager !== null ? <p>{`${siteManager?.fname} ${siteManager?.lname}`}</p> : <p>No manager assigned</p>}
            </td>
            <td>{site.location}</td>
        </tr>
    );
};
