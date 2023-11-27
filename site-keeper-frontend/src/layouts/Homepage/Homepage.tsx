import '../../styles/Homepage.css';

import { useEffect, useState } from "react";
import { config } from "../../config/Constants";
import SearchSiteModel from "../../models/Site/SearchSiteModel";
import { httpGetRequest } from "../Utils/TsFunctions";
import { SearchThroughSites } from "./components/SearchThroughSites";
import { SearchForStrings } from "./components/SearchForStrings";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const Homepage: React.FC<{}> = (props) => {

    const [sites, setSites] = useState<SearchSiteModel[]>([])

    useEffect(() => {
        const fetchSites = async () => {

            const responseJson = await httpGetRequest(config.API_URL + `/api/site/getAllSites`, "error fetching all sites")
            setSites(responseJson)

        }

        fetchSites()
    }, [])


    if (document.title !== `IGT - Site Keeper - Home`) {
        document.title = `IGT - Site Keeper - Home`
    }

    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-12"}>
                    <div className="d-flex flex-row justify-content-end">
                        <a className={"btn btn-info btn-excel mt-2"} href={config.API_URL + '/api/export/exportAllSites'}><CloudDownloadIcon/> Export All Site Data</a>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-12"}>
                    <ul className="nav nav-tabs tabs" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-site-tab" data-bs-toggle="tab"
                                    data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                    aria-selected="true"> Search Sites
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-string-search" data-bs-toggle="tab"
                                    data-bs-target="#pills-string-search-button" type="button" role="tab" aria-controls="pills-string-search-button"
                                    aria-selected="false"> Search Text
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                             aria-labelledby="pills-site-tab">
                            <SearchThroughSites sites={sites}/>
                        </div>
                        <div className="tab-pane fade" id="pills-string-search-button" role="tabpanel"
                             aria-labelledby="pills-string-search">
                            <SearchForStrings sites={sites}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}