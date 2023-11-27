import FrameworkModel from './FrameworkModel';
import Terminal from './Terminal';
class TerminalsOnSites{
    terminal: Terminal
    site: number | undefined
    framework: FrameworkModel
    bom: string | undefined

    constructor(terminal: Terminal, site: number | undefined, framework: FrameworkModel, bom: string | undefined){
        this.terminal = terminal
        this.site = site
        this.framework = framework
        this.bom = bom
    }
}

export default TerminalsOnSites