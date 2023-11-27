import React from "react";
import { Link } from "react-router-dom";

export const NavEngineer = () =>{
    return(
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse">
                <Link to = "/#" className="navbar-brand ml-20">
                    <img src={require('../../images/IGTLOGO.png')} width={'190'} height={'75'} alt='logo'/>
                </Link>
                <ul className="navbar-nav ml-20">
                    <li className="nav-item dropdown ml-100 ">
                        <Link className="nav-link dropdown-toggle text-white" to="/admin" id="navbarDarkDropdownMenuLink"
                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <h3>
                                Home
                            </h3>
                        </Link>

                    </li>
                    <li className="nav-item dropdown ml-100 ">
                        <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDarkDropdownMenuLink"
                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <h3>
                                Project Information
                            </h3>

                        </Link>
                        <ul className="dropdown-menu dropdown-menu-primary w-100 "
                            aria-labelledby="navbarDarkDropdownMenuLink" >
                            <li><Link className="dropdown-item" to="/editProjectInfo">Edit Project Information</Link></li>
                            <li><Link className="dropdown-item" to="/verifyFeature">Verify Feature</Link></li>
                        </ul>



                    </li>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <ul className="navbar-nav navbar-right mr-20">
                    <li>
                        <img src={require('../../images/bell.png')} width={'50'} height={'50'} alt='logo'/>
                    </li>
                    <li>
                        <img src={require('../../images/user.png')} width={'50'} height={'50'} alt='logo'/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}