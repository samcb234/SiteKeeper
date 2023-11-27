package com.igt.sitekeeper.requestmodel;

import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.User;
import lombok.Data;

@Data
public class MessageRequestModel {
    private User sender;
    private Costing costing;
    private String dateSent;
    private String message;
}
