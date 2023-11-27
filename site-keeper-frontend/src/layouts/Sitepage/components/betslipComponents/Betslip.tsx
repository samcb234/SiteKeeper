import '../../../../styles/Betslip.css';

import { useEffect, useState } from "react"
import BetslipModel from "../../../../models/BetslipModel"
import { MarksPreview } from "./MarksPreview"
import {config} from "../../../../config/Constants";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const Betslip: React.FC<{ site: number | undefined}> = (props) => {
    const [betslips, setBetslips] = useState<BetslipModel[]>([])

    const columns: GridColDef[] = [
        { field: 'status', headerName: 'Active', minWidth: 100,
            renderCell: (params: GridRenderCellParams<any, Date>) => (
                (String(params.value) === 'true') ? <DangerousIcon className={"not-active"}/> : <TaskAltIcon className={"active"}/>
            ), },
        { field: 'name', minWidth: 250, headerName: 'Slip Name' },
        { field: 'dateOfAddition', minWidth: 250, headerName: 'Date of addition' },
        { field: 'slipIdBin', minWidth: 250, headerName: 'Binary' },
        { field: 'slipIdHex', minWidth: 150,headerName: 'Hex'},
        { field: 'slipIdDec', minWidth: 250, headerName: 'Marks',
            renderCell: (params: GridRenderCellParams<any, any>) => (
                <strong>
                    <MarksPreview value={params.value} />
                </strong>
            ),
        },
    ];


    useEffect(() => {
        const fetchBetslips = async () => {
            const response = await fetch(config.API_BETSLIPS+`/api/v1/betslip/getBetslipsBySiteIdentifier/${props.site}`)
            if (!response.ok) {
                console.error("Could not retrieve betslips from server");
            }

            const responseJson = await response.json()

            const newBetslips: BetslipModel[] = []
            for (let b in responseJson) {
                newBetslips.push(new BetslipModel(responseJson[b].id,
                    responseJson[b].gameName,
                    responseJson[b].isDisabled,
                    responseJson[b].idBin,
                    responseJson[b].idHex,
                    responseJson[b].betslipId,
                    responseJson[b].dateOfAddition))
            }

            setBetslips(newBetslips)
        }

        if(props.site !== undefined){
            fetchBetslips().catch((error: any) => {
                console.log(error.message)
            })
        }
    }, [props.site])

    return (
        <div className="container-fluid" style={{height: 650}}>
            <DataGrid rows={betslips} columns={columns} />
        </div>
    )
}