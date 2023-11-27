import React, { useEffect, useState } from "react";
import { TabPane } from "./components/TabPane";
import { config } from "../../config/Constants";
import SearchSiteModel from "../../models/Site/SearchSiteModel";
import UserModel from "../../models/User/UserModel";
import { Link } from "react-router-dom";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { managerCheck } from "../Utils/TsFunctions";

export const SitePage: React.FC<{ user: UserModel | undefined }> = (props) => {

    const siteId = (window.location.pathname).split('/')[2]

    const [site, setSite] = useState<SearchSiteModel>()
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchSite = async () => {
            const response = await fetch(config.API_URL + `/api/site/getSiteById?id=${siteId}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()

            setSite(responseJson)

        }
        fetchSite()
    }, [refresh])

    function reload() {
        setRefresh(!refresh)
    }

    /** Action Items
     * Differentiate  between site name dependent on what site was clicked on
     * Tertiary statement to depended upon what user is logged in
     * Css color to get a better color
     */

    if (document.title !== `IGT - Site Keeper - ${site?.name}`) {
        document.title = `IGT - Site Keeper - ${site?.name}`
    }

    return (
        <div className="container-fluid">
            <div className="row mt-8 mb-8">
                <div className="col-sm">
                    <div className="row">
                        <div className="col">
                            <h4 className="text-warning font-weight-bold">
                                {site?.name}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <a className='btn btn-info btn-excel' href={config.API_URL + `/api/export/exportSite?siteId=${site?.id}`}><CloudDownloadIcon/> Download Site Information</a>
                </div>
                {managerCheck(props.user) ?
                <div className="col">
                <Link to={{pathname:'/createProject',
            state:{site:site}}}>
                    <button className="btn btn-success">Create New Project</button>
                </Link>
            </div>
            :
            <></>}

            </div>

            <TabPane site={site} reload={reload} refresh={refresh} user={props.user} />
        </div>

    );
}