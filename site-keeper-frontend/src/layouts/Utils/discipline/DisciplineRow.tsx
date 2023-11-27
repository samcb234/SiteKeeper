import { useEffect, useState } from "react";
import { config } from "../../../config/Constants";
import BaseDisciplineModel from "../../../models/Disciplines/BaseDisciplineModel";
import UserModel from "../../../models/User/UserModel";
import { httpGetRequest, httpBodyRequest, managerCheck } from "../TsFunctions";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { UserSearch } from "../UserSearch";

export const DisciplineRow: React.FC<{
    key: number, discipline: BaseDisciplineModel, user: UserModel | undefined, action: string,
    projectId: number | undefined, reload: any, refresh: boolean, cost: number | undefined
}> = (props) => {

    const [engineerEmail, setEngineerEmail] = useState('')
    const [readyToAdd, setReadyToAdd] = useState(false)

    function selectEngineer(user: UserModel){
        setEngineerEmail(user.contactInfo)
        setReadyToAdd(true)
    }

    async function verify() {
        if (props.projectId !== undefined && props.action === 'project') {
            await httpBodyRequest(config.API_URL + `/api/project/verifyDiscipline?projectId=${props.projectId}&disciplineId=${props.discipline.discipline.id}&userId=${props.user?.id}`,
                "error marking estimation as verified", null, 'PUT')
            props.reload()
        }
    }

    async function requestVerification() {
        if (props.projectId !== undefined && props.action === 'project') {
            await httpBodyRequest(config.API_URL + `/api/project/requestVerification?projectId=${props.projectId}&disciplineId=${props.discipline.discipline.id}`,
                "error requesting discipline verification", null, 'PUT')
            props.reload()
        }
    }

    async function removeLeadEngineer(userId: number) {
        if (props.projectId !== undefined) {
            const url = config.API_URL + `/api/${props.action}/removeLeadEngineer?${props.action}Id=${props.projectId}&discipline=${props.discipline.discipline.type}&userId=${userId}`
            await httpBodyRequest(url, 'error updating lead engineers', null, 'PUT')
            props.reload()
        }
    }

    async function addLeadEngineer() {
        if (props.projectId !== undefined) {
            const url = config.API_URL + `/api/${props.action}/addLeadEngineer?${props.action}Id=${props.projectId}&discipline=${props.discipline.discipline.type}&email=${engineerEmail}`
            await httpBodyRequest(url, 'error updating lead engineers', null, 'PUT')
            setEngineerEmail('')
            setReadyToAdd(false)
            props.reload()
        }
    }

    const LeadEngineer: React.FC<{ engineer: UserModel, remove: any, user: UserModel | undefined }> = (props) => {
        return (
            <>
                {managerCheck(props.user) ?
                    <div onClick={() => props.remove(props.engineer.id)}>{`${props.engineer.fname} ${props.engineer.lname} `}<PersonRemoveIcon /></div>
                    :
                    <div>{`${props.engineer.fname} ${props.engineer.lname} `}</div>}
            </>
        )
    }

    return (
        <tr>
            <th scope="row">
                {props.discipline.discipline.id}
            </th>
            <td>{props.discipline.discipline.type}</td>
            <td>
                <>
                    {props.discipline.leadEngineers !== undefined ?
                        <>
                            {props.discipline.leadEngineers.map(engineer => (
                                <LeadEngineer engineer={engineer} remove={removeLeadEngineer} user={props.user} key={engineer.id}/>
                            ))}
                        </>
                        :
                        <p>Role not assigned</p>}
                </>
                {managerCheck(props.user) ?
                    <>
                        <div className="row">
                            <div className="col">
                                <UserSearch provideUserEmail={selectEngineer} role="engineer"/>
                            </div>
                            <div className="col">
                                {readyToAdd ?
                                <button type="button" className="btn btn-info btn-excel" onClick={() => addLeadEngineer()}><PersonAddAlt1Icon /></button>
                            :
                            <button type="button" className="btn btn-info btn-excel disable" onClick={() => addLeadEngineer()}><PersonAddAlt1Icon /></button>}
                            </div>
                        </div>
                    </>
                    :
                    <></>}
            </td>
            <td>{props.discipline.estimatedBy !== undefined && props.discipline.estimatedBy !== null ?
                <p>{`${props.discipline.estimatedBy?.fname} ${props.discipline.estimatedBy?.lname}`}</p>
                :
                <p>Role not assigned</p>}</td>
            <td>{props.cost}</td>
            <td>{props.discipline.isVerified ?
                <p className="text-success">Verified</p>
                :
                <p className="text-danger">Not Verified</p>}</td>
            <td>{props.discipline.verifiedBy !== undefined && props.discipline.verifiedBy !== null ?
                <p>{`${props.discipline.verifiedBy?.fname} ${props.discipline.verifiedBy?.lname}`}</p>
                :
                <>
                    {props.user?.role.id === 2 ?
                        <>
                            {props.discipline.verificationPending ?
                                <p>Pending Verification From Engineer</p>
                                :
                                <button className="btn btn-primary" role="button" onClick={() => requestVerification()}>Request Verification</button>}
                        </>
                        :
                        <>
                            {props.user?.role.id === 3 ?
                                <button className="btn btn-primary" role="button" onClick={() => verify()}>Verify</button>
                                :
                                <p>Not Verified Yet</p>}
                        </>}
                </>
            }</td>
        </tr>
    )
}