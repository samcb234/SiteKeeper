import React from "react";

export const NavUser: React.FC<{}> = () =>{
    return(
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <img src={require('../../images/IGTLOGO.png')} width={'190'} height={'75'} alt='logo'/>
                <div className="row justify-content-start me-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <img src={require('../../images/user.png')} width={'50'} height={'50'} alt='logo'/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )


}