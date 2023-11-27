import { Homepage } from "../Homepage/Homepage";

import { EmailOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { UserTable } from "./components/User/UserTable";
export const AdminHome = () => {
    //Add css or add icon
    return (
        <>
            <div className="container mt-16">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="container-admin bg-primary">
                            <div className="card-body  text-white">
                                <div className="row d-flex align-items-center">
                                    <div className="col-sm-6">
                                        <h5 className="card-title"> Users </h5>
                                    </div>

                                </div>

                            </div>
                            <UserTable />
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <div className="container-admin" id="siteCard">
                            <div className="card-body text-white" id="siteCard">
                                <div className="row d-flex align-items-center">
                                    <div className="col-sm-6">
                                        <h5 className="card-title"> Sites </h5>
                                    </div>
                                    <div className="col-sm-6 align-top">
                                        <button className="btn  btn-lg text-white" id="siteCard">
                                            <div className=" align-items-top">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                    fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="6" fill={"#66FF99"} />
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                                Add Sites
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Homepage/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}