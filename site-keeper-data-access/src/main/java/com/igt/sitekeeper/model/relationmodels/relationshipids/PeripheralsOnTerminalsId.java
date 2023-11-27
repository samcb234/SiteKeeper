package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class PeripheralsOnTerminalsId implements Serializable {
    private Long peripheral;
    private Long terminal;

    public Long getPeripheral() {
        return peripheral;
    }

    public void setPeripheral(Long peripheral) {
        this.peripheral = peripheral;
    }

    public Long getTerminal() {
        return terminal;
    }

    public void setTerminal(Long terminal) {
        this.terminal = terminal;
    }
}
