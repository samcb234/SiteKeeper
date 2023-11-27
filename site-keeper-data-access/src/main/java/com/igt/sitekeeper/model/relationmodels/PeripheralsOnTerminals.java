package com.igt.sitekeeper.model.relationmodels;

import com.igt.sitekeeper.model.relationmodels.relationshipids.PeripheralsOnTerminalsId;
import lombok.Data;
import org.opensaml.xmlsec.signature.P;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "peripherals_on_terminals")
@Data
@IdClass(PeripheralsOnTerminalsId.class)
public class PeripheralsOnTerminals implements Serializable {


    public PeripheralsOnTerminals(){}

    public PeripheralsOnTerminals(Long peripheral, Long terminal){
        this.peripheral = peripheral;
        this.terminal = terminal;
    }

    @Id
    @Column(name = "peripheral")
    private Long peripheral;

    @Id
    @Column(name = "terminal")
    private Long terminal;
}
