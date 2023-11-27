package com.igt.sitekeeper.components;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.KeyStore;
import java.text.ParseException;

@Component
public class KeystoreHandler {
    static Logger logger = LoggerFactory.getLogger(KeystoreHandler.class);

    @Value("password")
    String cameleonPass;
    @Value("user")
    String cameleonUser;

    @EventListener
    public void appReady(ApplicationReadyEvent event) throws ParseException {
        try {
            KeyStore keyStore = KeyStore.getInstance("JCEKS");
            keyStore.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("keystore.jks"), "password".toCharArray());

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBE");
            KeyStore.SecretKeyEntry skePass = (KeyStore.SecretKeyEntry) keyStore.getEntry("cameleonpass",
                    new KeyStore.PasswordProtection("password".toCharArray()));
            PBEKeySpec keySpec = (PBEKeySpec) factory.getKeySpec(
                    skePass.getSecretKey(), PBEKeySpec.class);

            KeyStore.SecretKeyEntry skeUser = (KeyStore.SecretKeyEntry) keyStore.getEntry("cameleonuser",
                    new KeyStore.PasswordProtection("password".toCharArray()));
            PBEKeySpec keySpecUser = (PBEKeySpec) factory.getKeySpec(
                    skeUser.getSecretKey(), PBEKeySpec.class);

            this.cameleonPass = new String(keySpec.getPassword());
            this.cameleonUser = new String(keySpecUser.getPassword());
        } catch (Exception e) {
            logger.error("Some error happened when decoding keystore: " + e.getClass().toString());
            e.printStackTrace();
        }
    }

    public String getPassword() {
        return cameleonPass;
    }

    public String getUser() {
        return cameleonUser;
    }
}
