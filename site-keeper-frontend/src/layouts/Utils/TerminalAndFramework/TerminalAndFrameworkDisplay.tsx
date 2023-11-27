import React, { useState, useEffect } from 'react';
import FrameworkModel from '../../../models/Inventory/FrameworkModel';
import { config } from "../../../config/Constants";
import Terminal from '../../../models/Inventory/Terminal';
import { TerminalAndFrameworkCard } from './TerminalAndFrameworkCard';
import UserModel from '../../../models/User/UserModel';

//used to display frameworks since they are slightly unique
//POSSIBLE REVIEW NEEDED
export const TerminalAndFrameworkDisplay: React.FC<{ terminals: Terminal[], frameworks: FrameworkModel[], boms: string[], action: string,
reload: any, refresh: boolean, submitBom: any, user: UserModel | undefined }> = (props) => {

    return (
        <div className='row'>
            <div className='col'>

                {props.terminals.map(terminal => (
                    <TerminalAndFrameworkCard key={props.terminals.indexOf(terminal)} terminal={terminal} framework={props.frameworks[props.terminals.indexOf(terminal)]}
                        bom={props.action === 'site' ? props.boms[props.terminals.indexOf(terminal)] : undefined} reload={props.reload}
                        refresh={props.refresh} siteId={props.terminals.indexOf(terminal)} submitBom={props.submitBom} user={props.user}/> 
                ))}

            </div>
        </div>
    )
}