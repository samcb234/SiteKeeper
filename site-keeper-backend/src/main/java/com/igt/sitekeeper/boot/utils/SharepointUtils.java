package com.igt.sitekeeper.boot.utils;

import sharepoint.beans.igt.com.User;
import sharepoint.igt.com.connection.SharepointContext;

import java.util.List;

public class SharepointUtils {

    private SharepointContext sharepointContext;

    public SharepointUtils(){
        this.sharepointContext = new SharepointContext("07c9e4d7-623f-459e-951a-d41479a0b3c3", "VYVWuWV6lyqkkAvF3mo7LmU2C278zH0iH3feoMVWLts=",
                "gtechcorp.sharepoint.com", "ATSTerminalSoftwareEngineers");
    }

    public User getUserByEmail(String email){
        return sharepointContext.getUser(email);
    }

    public List<User> getUsersByStartOfEmail(String email){
        return sharepointContext.getUsers(email);
    }
}
