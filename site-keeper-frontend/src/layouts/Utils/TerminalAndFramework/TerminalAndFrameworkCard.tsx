import { useEffect, useState } from "react";
import FrameworkModel from "../../../models/Inventory/FrameworkModel";
import Terminal from "../../../models/Inventory/Terminal";
import UserModel from "../../../models/User/UserModel";
import { engineerCheck } from "../TsFunctions";

const reactExcelRenderer = require('react-excel-renderer')

export const TerminalAndFrameworkCard: React.FC<{
    terminal: Terminal | undefined, framework: FrameworkModel | undefined, bom: any,
    reload: any, refresh: boolean, siteId: number, submitBom: any, user: UserModel | undefined
}> = (props) => {

    const [bom, setBom] = useState<any>()
    const [rows, setRows] = useState<any>()
    const [cols, setCols] = useState<any>()

    const [displayTable, setDisplayTable] = useState(false)


    useEffect(() => {
        if (props.bom !== '' && props.bom !== null && props.bom !== undefined && props.bom !== 'null') {
            console.log(props.bom === 'null')
            const split: string[] = props.bom.split(',')

            let b = null
            if (split[0].includes('application/vnd.ms-excel')) {
                b = new Blob([atob(split[1])], { type: 'application/vnd.ms-excel' })
            }
            else if (split[0].includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {

                const s = atob(split[1])
                const byteNumbers = new ArrayBuffer(s.length)
                const int8Array = new Uint8Array(byteNumbers)
                for (let i: number = 0; i < s.length; i++) {
                    int8Array[i] = s.charCodeAt(i)
                }
                b = new Blob([int8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            }
            else {
                console.log('something else')
            }


            reactExcelRenderer.ExcelRenderer(b, (err: any, resp: any) => {
                if (err) {
                    console.log(err);
                }
                else {
                    setCols(resp.cols)
                    setRows(resp.rows)
                }
            });
        }

    }, [props.refresh, props.terminal])

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader()


        reader.readAsDataURL(file)
        reader.onload = function () {
            setBom(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error', error)
        }
    }

    async function submit() {
        props.submitBom(bom, props.siteId)
    }


    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        {props.terminal?.img ?
                            <img src={props.terminal?.img} width='50' height='50' alt="img" />
                            :
                            <img src={require('../../../images/terminalplaceholder.jpg')} width='150' height='150' alt='terminal' />
                        }
                    </div>
                    <div className="col">
                        <h4 className="text-warning font-weight-bold">
                            {props.terminal?.name}
                        </h4>
                        <p>{props.terminal?.description}</p>
                    </div>
                    <div className='col'>
                        <div className="row">
                            <div className="col">
                                <h4 className="text-warning font-weight-bold">
                                    {props.framework?.name === undefined ?
                                        <></>
                                        :
                                        <>{props.framework?.name}</>}
                                </h4>
                                <p>{props.framework?.description === undefined ?
                                    <></>
                                    :
                                    <>{props.framework?.description}</>}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {engineerCheck(props.user) ?
                <><div className="form-group mt-16">
                <label htmlFor="inputPeripheral">
                    Upload BOM file here
                </label>
                <input
                    type="file"
                    className="form-control mt-8"
                    id="customFile"
                    onChange={(e) => base64ConversionForImages(e)}
                />

            </div></>
            :
            <></>}
                <div className="row mt-2">
                    <div className="col">
                        {engineerCheck(props.user) ?
                        <button className="btn btn-primary mt-2" onClick={() => submit()}>submit</button>
                    :
                    <></>}
                    </div>
                    <div className="col">
                        {rows !== undefined && cols !== undefined ?
                            <button className="btn btn-primary mt-2" onClick={() => setDisplayTable(!displayTable)}>{displayTable? 'Hide Bom': 'Show Bom'}</button> :
                            <button className="btn btn-primary mt-2" onClick={() => setDisplayTable(!displayTable)} disabled>{displayTable? 'Hide Bom': 'Show Bom'}</button>}
                    </div>
                </div>
                <div className={"mt-3"} />
                {rows !== undefined && cols !== undefined ?
                    <>
                        {displayTable ?
                            <div className="overflow-table2">
                                <reactExcelRenderer.OutTable data={rows} columns={cols}
                                    tableClassName="table table-striped table-bordered table-hover table-sm bom-display" />
                            </div>
                            :
                            <></>}
                    </>
                    :
                    <div>No BOM file to display</div>}
            </div>
        </div>
    )
}