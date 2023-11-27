import '../../styles/NavAdmin.css';

import React, { useEffect, useState } from "react";
import { config } from "../../config/Constants";
import { Link, useLocation } from "react-router-dom";
import NotificationModel from "../../models/NotificationModel";
import { DisplayNotifications } from "./components/DisplayNotifications";
import { toast, Toaster } from "react-hot-toast";
import { Client } from "@stomp/stompjs";
import UserModel from '../../models/User/UserModel';
import { Edit } from "@mui/icons-material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SiteRequestModel from "../../models/Site/SiteRequestModel";
import ProjectModel from "../../models/Project/ProjectModel";
import { adminCheck, engineerCheck, httpGetRequest, managerCheck } from "../Utils/TsFunctions";

interface stateType {
    site: SiteRequestModel;
    project: ProjectModel;
}

export const NavAdmin: React.FC<{ user: UserModel | undefined }> = (props) => {
    const [notifications, setNotifications] = useState<NotificationModel[]>([])
    const [refresh, setRefresh,] = useState(true)
    const [clientConnected, setClientConnected] = useState(false)
    const [notificationCounter, setNotificationCounter] = useState(0)

    async function logout() {
        const responseJson = await httpGetRequest(config.API_URL + `/logout`, "error fetching all sites");

        window.open("/clogout", '_self');
    }

    function Breadcrumbs() {
        const location = useLocation<stateType>();

        return (
            <nav>
                <Link to="/" className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}>
                    <HomeIcon className={"mb-2"} />
                </Link>

                {
                    (location.state?.hasOwnProperty("site") && Object.keys(location.state).length !== 0) ?
                        <Link to={{
                            pathname: `/site/${location.state.site?.id}`,
                            state: {
                                site: location.state.site
                            }
                        }}
                            className={location.pathname === "/site/" + location.state ? "breadcrumb-active" : "breadcrumb-not-active"}>
                            {` / ${location.state.site.name}`}
                        </Link>
                        : ""
                }
                {
                    (location.state?.hasOwnProperty("project") && Object.keys(location.state).length !== 0) ?
                        <Link to={{
                            pathname: `/project/${location.state.project?.id}`,
                            state: {
                                site: location.state.site,
                                project: location.state.project
                            }
                        }}
                            className={location.pathname === "/project/" + location.state.project.id + "" ? "breadcrumb-active" : "breadcrumb-not-active"}>
                            {` / ${location.state.project.name}`}
                        </Link>
                        : ""
                }
            </nav>
        );
    }

    const fetchNotifications = async () => {
        if (props.user !== undefined) {
            const response = await fetch(config.API_URL + `/api/message/getNotificationsByUserAndRead?user=${props.user?.id}&read=false`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const notifications = await response.json();
            setNotifications(notifications);
            setNotificationCounter(notifications.length);
        }
    }

    const stompClient = new Client({
        brokerURL: config.API_WS,
    });

    stompClient.onConnect = (event) => {
        setClientConnected(true);
        console.log("connected!");

        stompClient.subscribe('/topic/newMessageNotification', (notificationMsg) => {
            const notification: NotificationModel = JSON.parse(notificationMsg.body);

            if (notification.user.id === props.user?.id) { // only notify if we got a message for this user
                notify(`You got a new message from ${notification.user.fname}  ${notification.user.lname} !`);
                fetchNotifications();
            }
        });
    };

    const notify = (text: string) => toast.success(text, {
        duration: 2000,
        position: 'top-center',
        style: {
            top: '300px',
        }
    });

    useEffect(() => {
        if (!clientConnected) {
            stompClient.activate();
        }

        fetchNotifications();
    }, [refresh, props.user])

    function reloadPage() {
        setRefresh(!refresh)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <Toaster
                containerStyle={{
                    top: 80,
                    left: 20,
                    bottom: 20,
                    right: 20,
                }} />
            <div className="navbar-collapse collapse order-1 order-md-0 dual-collapse">
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-5"}>
                            <div className={"container-fluid"}>
                                <div className={"row"}>
                                    <div className={"col-6"} style={{ maxWidth: "190px" }}>
                                        <a href="/#" className="navbar-brand">
                                            <img src={require('../../images/IGTLOGO.png')} width={'190'} height={'75'} alt='logo' />
                                        </a>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className={"container"}>
                                            {engineerCheck(props.user) ?
                                                <div className={"row"}>
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle text-white" data-bs-auto-close="outside" href="#"
                                                                role="button" data-bs-toggle="dropdown">
                                                                <button className="btn btn-warning dropdown-toggle menu-sk" type="button" id="dropdownMenuButton"
                                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: "30px", padding: 2, fontWeight: "bolder" }}>
                                                                    <ArrowDropDownIcon /> Settings <SettingsIcon style={{ height: "20px" }} />
                                                                </button>
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-primary dropdown-menu-sk menu-sk" >
                                                                {adminCheck(props.user) ?
                                                                    <>
                                                                        <li><Link className="dropdown-item" to="/editinfo">Edit Site Info</Link></li>
                                                                        <div className="dropdown-divider"></div>
                                                                    </>
                                                                    :
                                                                    <></>}

                                                                <li className="dropend">
                                                                    <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Terminal data</a>
                                                                    <ul className="dropdown-menu sub dropdown-menu-sk menu-sk">
                                                                        <li><Link className="dropdown-item" to="/addTerminal">Add Terminal</Link></li>
                                                                        <li><Link className="dropdown-item" to="/addFramework">Add Framework</Link></li>
                                                                        <li><Link className="dropdown-item" to='/addPeripheral'>Add Peripheral</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link className="dropdown-item" to="/addFeature">Add Feature</Link></li>
                                                                {adminCheck(props.user) ?
                                                                <>
                                                                <li><Link className="dropdown-item" to="/admin">Add Sites</Link></li>
                                                                <li><Link className="dropdown-item" to="/admin">Add Users</Link></li>
                                                                </>
                                                                :
                                                                <></>}
                                                                {managerCheck(props.user) ?
                                                                <li><Link className='dropdown-item' to='/createProject'>Add Projects</Link></li>
                                                            :
                                                            <></>}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                :
                                                <></>}
                                            <div className={"row d-flex justify-content-lg-start"} style={{ float: "left", minWidth: "220px" }}>
                                                <div className={"col-12"}>
                                                    <Breadcrumbs />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={"col-2 text-center m-0 p-0"}>
                            <span className={"title"}>Site Keeper</span>
                        </div>
                        <div className={"col-5"}>
                            <div className={"container-fluid"}>
                                <div className={"row"}>
                                    <div className="col-12">
                                        {
                                            (props.user != null) ?
                                                <span className={"text-light push-right"} style={{ fontSize: "13px" }}>Welcome <span style={{ fontWeight: "bolder" }}>{`${props.user?.fname} ${props.user?.lname}`}</span>!</span> : ""
                                        }
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col-12 m-0 p-0">
                                        {
                                            (props.user != null) ?
                                                <ul className="navbar-nav navbar-right push-right">
                                                    <li className="nav-item dropdown">
                                                        <a className="nav-link dropdown-toggle text-white" data-bs-auto-close="outside" href="#"
                                                            role="button" data-bs-toggle="dropdown" id="toastBtn">
                                                            <NotificationsActiveIcon className={"user-menu-icon"} sx={{ stroke: "#000", strokeWidth: 1 }} />
                                                            <span className="position-absolute translate-middle badge bg-danger notification-badge ">{notificationCounter}</span>
                                                        </a>
                                                        <ul className="dropdown-menu display-notification" >
                                                            {notifications.map(notification => (
                                                                <li key={notification.id} className={"display-notification-line"}>
                                                                    <DisplayNotifications notification={notification} refresh={reloadPage} />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                    <li className={"userIcon"}>
                                                        <Link to={'/userSettings'}>
                                                            <ManageAccountsIcon className={"user-menu-icon"} sx={{ stroke: "#000", strokeWidth: 1 }} />
                                                        </Link>
                                                    </li>
                                                    <li className={"userIcon ml-20"}>
                                                        <a href={"#"} onClick={() => logout()}>
                                                            <LogoutIcon className={"logout-icon"} sx={{ stroke: "#000", strokeWidth: 1 }} />
                                                        </a>
                                                    </li>
                                                </ul>
                                                :
                                                <button className={"btn btn-light login-button push-right mb-2"} onClick={() => window.open("/sson", '_self')}><AccountCircleIcon /> Login</button>
                                        }
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col m-0 p-0">
                                        <span className={"app-version push-right"}>v{config.API_VER}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}