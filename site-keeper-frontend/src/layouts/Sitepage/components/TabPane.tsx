import React from "react";
import { ProjectList } from "./ProjectList";
import { SiteInfoPane } from './SiteInfoPane';
import { Engineers } from "./engineerComponents/Engineers";
import { Betslip } from "./betslipComponents/Betslip";
import { DropDownPane } from "../../Utils/DropDownPane";
import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import UserModel from "../../../models/User/UserModel";

export const TabPane: React.FC<{ site: SearchSiteModel |undefined, reload: any, refresh: boolean,
user: UserModel | undefined}> = (props) => {
    return (

        <div>
            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-site-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true"> Site Information
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-ft-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-ft" type="button" role="tab" aria-controls="pills-ft"
                        aria-selected="false"> Inventory
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-bet-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false"> Bet Slip
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                        aria-selected="false"> Projects
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-eng-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-eng" type="button" role="tab" aria-controls="pills-eng"
                        aria-selected="false"> Engineers
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                    aria-labelledby="pills-site-tab">
                        <SiteInfoPane site={props.site} reload={props.reload} refresh={props.refresh} user={props.user}/>
                </div>
                <div className="tab-pane fade" id="pills-ft" role="tabpanel" aria-labelledby="pills-ft-tab">
                    <DropDownPane site={props.site} project={undefined} action="site" reload={props.reload} refresh={props.refresh} user={props.user}/>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-bet-tab">
                    <Betslip site={props.site?.betslipId}/>
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-project-tab">
                    <ProjectList site={props.site} user={props.user}/>
                </div>
                <div className="tab-pane fade" id="pills-eng" role='tabpanel' aria-labelledby="pills-eng-tab">
                    <Engineers site={props.site} reload={props.reload} refresh={props.refresh} user={props.user}/>
                </div>
            </div>
        </div>
    );
}