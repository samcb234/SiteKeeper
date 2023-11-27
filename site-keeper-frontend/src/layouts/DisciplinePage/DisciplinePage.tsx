import {ContactForm} from "./components/ContactForm";
import {TabPane} from "../Sitepage/components/TabPane";
import {EditInfo} from "./components/EditInfo";
import { Link } from "react-router-dom";

export const DisciplinePage = () =>{
    /**
     * Tertiary to determine wether a site is active or not
     *
     */
    return(
      <div className="container">
          <div className="row mt-8 mb-8">
              <div className="col-sm">
                  <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                          <li className="breadcrumb-item"><Link to="#">Site Name</Link></li>
                          <li className="breadcrumb-item active" aria-current="page">Project Name</li>
                      </ol>
                  </nav>
              </div>
              <div className="col-sm">
                  <h5>
                      Active
                  </h5>
              </div>

          </div>
          <h3>
              Contact Manager
          </h3>
          <h6>
              Send a message to your manager if you have a question about any of the costings
          </h6>
          <ContactForm/>
          <div className="d-flex justify-content-end">
              <div className="row mt-8 mb-8">
                  <div className="col-sm">
                      <button className="bg-white">
                          Cancel
                      </button>
                  </div>
                  <div className="col-sm">
                      <button className="bg-primary rounded-lg">
                          Submit
                      </button>
                  </div>

              </div>
          </div>
          <EditInfo/>



      </div>
    );
}