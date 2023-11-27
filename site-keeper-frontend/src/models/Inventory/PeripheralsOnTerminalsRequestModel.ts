class PeripheralsOnTerminalsRequest{
    peripheral: number|undefined
    terminal: number|undefined

    constructor(peripheral: number|undefined, terminal: number|undefined){
        this.peripheral = peripheral
        this.terminal = terminal
    }
}

export default PeripheralsOnTerminalsRequest