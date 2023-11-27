//this is subject to change but I'm making an extra nav file
//this should probably get changed soon lmao

import React from "react";

export const NavManager: React.FC<{}> = () =>{
    return(
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <img src={require('../../images/IGTLOGO.png')} width={'190'} height={'75'} alt='logo'/>
                <div className="row justify-content-start me-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <button className="btn btn-secondary">Create Project</button>
                        </li>
                        <li>
                            <img src={require('../../images/user.png')} width={'50'} height={'50'} alt='logo'/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )


}