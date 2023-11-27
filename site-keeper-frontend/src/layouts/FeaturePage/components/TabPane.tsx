import { ProjectTable } from "./ProjectTable"
import { SiteTable } from "./SiteTable"

export const TabPane: React.FC<{feature: string}> = (props) => {
    return (
        <div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-site-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true"> Sites
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-ft-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-ft" type="button" role="tab" aria-controls="pills-ft"
                        aria-selected="false"> Projects
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                    aria-labelledby="pills-site-tab">
                        <SiteTable feature={props.feature}/>
                </div>
                <div className="tab-pane fade" id="pills-ft" role="tabpanel" aria-labelledby="pills-ft-tab">
                    <ProjectTable feature={props.feature}/>
                </div>
            </div>
        </div>
    )
}