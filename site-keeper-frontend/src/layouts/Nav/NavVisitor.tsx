import React from "react";
import { Link } from "react-router-dom";

export const NavVisitor: React.FC<{}> = () =>{
    return(
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <img src={require('../../images/IGTLOGO.png')} width={'250'} height={'100'} alt='logo'/>
                <div className="row justify-content-start me-1">
                    <ul className="nav navbar-nav navbar-right">
                       <li className = "text-white">
                           <Link to = '/admin' className="text-white">
                               <h5> Login </h5>
                           </Link>

                       </li>
                    </ul>
                </div>
            </div>
        </nav>
    )


}