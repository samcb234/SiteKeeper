import { useEffect, useState } from "react"
import PeripheralModel from "../../../models/Inventory/PeripheralModel"
import Terminal from "../../../models/Inventory/Terminal"
import PeripheralsOnTerminalsRequest from "../../../models/Inventory/PeripheralsOnTerminalsRequestModel"
import { config } from "../../../config/Constants"

export const AddPeripheralToTerminal = () => {

    const [peripheral, setPeripheral] = useState(0)
    const [searchPeripheral, setSearchPeripheral] = useState('')
    const [potentialPeripherals, setPotentialPeripherals] = useState<PeripheralModel[]>([])

    const [terminal, setTerminal] = useState(0)
    const [searchTerminal, setSearchTerminal] = useState('')
    const [potentialTerminals, setPotentialTerminals] = useState<Terminal[]>([])

    const submitRelation = async () => {
        const responseOptions = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(new PeripheralsOnTerminalsRequest(peripheral, terminal))
        }
        const response = await fetch(config.API_URL+`/api/peripheral/addNewPeripheralsOnTerminals`, responseOptions)
        if(!response.ok){
            throw new Error("something went wrong")
        }
        setPeripheral(0)
        setSearchPeripheral('')
        setPotentialPeripherals([])

        setTerminal(0)
        setSearchTerminal('')
        setPotentialTerminals([])
    }

    useEffect(() => {
        const fetchPotentialPeripherals = async () => {
            const url = config.API_URL+`/api/peripheral/getPeripheralsByStartOfName?name=${searchPeripheral}`
            const response = await fetch(url)
            if(!response.ok){
                throw new Error("something went wrong")
            }
            setPotentialPeripherals(await response.json())

            if(potentialPeripherals.length == 1 && potentialPeripherals[0].name === searchPeripheral){
                setPeripheral(potentialPeripherals[0].id)
                setPotentialPeripherals([])
            }
        }
        if(searchPeripheral !== ''){
            fetchPotentialPeripherals()
        }else{
            setPotentialPeripherals([])
        }

        

    }, [searchPeripheral])

    useEffect(() => {
        const fetchPotentialTerminals = async () => {
            
            const url = config.API_URL+`/api/terminal/getTerminalsByStartOfName?name=${searchTerminal}`
            const response = await fetch(url)
            if(!response.ok){
                throw new Error("something went wrong")
            }
            setPotentialTerminals(await response.json())
            console.log(potentialTerminals.length)
            if(potentialTerminals.length == 1 && potentialTerminals[0].name === searchTerminal){
                setTerminal(potentialTerminals[0].id)
                setPotentialTerminals([])
                console.log('set to 0')
            }
        }
        if(searchTerminal !== ''){
            fetchPotentialTerminals()
        }
        else{
            setPotentialTerminals([])
        }

        
    }, [searchTerminal])

    function selectPeripheral(p: PeripheralModel){
        setSearchPeripheral(p.name)
        setPeripheral(p.id)
    }

    function selectTerminal(t: Terminal){
        setSearchTerminal(t.name)
        setTerminal(t.id)
    }

    return(
        <div className="container mb-3">
            <h4 className="text-warning">Assign Peripheral to Terminal</h4>
            <span className="input-group-text mb-1">Peripheral</span>
            <input type="text" className="form-control mb-1" placeholder=""
                aira-label='start date' onChange={e => setSearchPeripheral(e.target.value)} value={searchPeripheral} />
                {potentialPeripherals.map(p => (
                    <span onClick={() => selectPeripheral(p)} 
                    className="input-group-text" key={p.id}>{p.name}</span>
                ))}
                <div className="mb-3"></div>
                <span className="input-group-text mb-1">Terminal</span>
            <input type="text" className="form-control mb-1 " placeholder=""
                aira-label='start date' onChange={e => setSearchTerminal(e.target.value)} value={searchTerminal} />
                {potentialTerminals.map(p => (
                    <span onClick={() => selectTerminal(p)} 
                    className="input-group-text" key={p.id}>{p.name}</span>
                ))}
                <div className="mb-3"></div>
            <button className="btn btn-primary mt-1" onClick={() => submitRelation()}>Add</button>
        </div>
    )
}