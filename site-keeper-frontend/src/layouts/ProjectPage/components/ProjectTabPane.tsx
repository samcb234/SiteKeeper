import React from "react";
import { DropDownPane } from "../../Utils/DropDownPane";
import { DisciplineTable } from "../../Utils/discipline/DisciplineTable";
import { DisciplineDiscussion } from "./Costings/DisciplineDiscussion";
import { Information } from "./Information";
import { SimilarProjects } from "./SimilarProjects";
import ProjectModel from "../../../models/Project/ProjectModel";
import UserModel from "../../../models/User/UserModel";

export const ProjectTabPane: React.FC<{ project: ProjectModel | undefined, reload: any, refresh: boolean, user: UserModel | undefined }> = (props) => {
    return (

        <div>
            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-site-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true"> Disciplines
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-bet-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false"> Inventory
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                        aria-selected="false"> Costings
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-information-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-information" type="button" role="tab" aria-controls="pills-information"
                        aria-selected="false"> Information
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-similar-tab" data-bs-toggle="tab"
                        data-bs-target="#pills-similar" type="button" role="tab" aria-controls="pills-similar"
                        aria-selected="false"> Similar Projects
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                    aria-labelledby="pills-site-tab">
                    <DisciplineTable site={undefined} project={props.project} action="project" reload={props.reload} 
                    user={props.user} refresh={props.refresh}/>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-bet-tab">
                    <DropDownPane site={undefined} project={props.project} action="project" reload={props.reload} refresh={props.refresh} user={props.user}/>
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-project-tab">
                    <DisciplineDiscussion project={props.project} user={props.user}/>
                </div>
                <div className="tab-pane fade" id="pills-information" role="tabpanel" aria-labelledby="pills-project-tab">
                    <Information project={props.project} user={props.user}/>
                </div>
                <div className="tab-pane fade" id="pills-similar" role="tabpanel" aria-labelledby="pills-project-tab">
                    <SimilarProjects project={props.project} reload={props.reload}/>
                </div>
            </div>
        </div>
    );
}