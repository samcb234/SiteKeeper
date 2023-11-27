package com.igt.sitekeeper.boot.utils;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;


public class EmailUtils extends Thread{

    private String body, to, subject, port, host;



    public static void sendMessage(String to, String body, String subject, String port, String host){
        EmailUtils e = new EmailUtils(to, body, subject, port, host);

        e.start();
    }

    private EmailUtils(String to, String body, String subject, String port, String host){
        this.body = body;
        this.to = to;
        this.subject = subject;
        this.port = port;
        this.host = host;
    }

    public void run(){
        Properties prop = new Properties();
        prop.setProperty("mail.smtp.port", this.port); //becomes 25 for sending actual emails
        prop.setProperty("mail.smtp.host", this.host); //becomes edgemail.igt.com for actual emails
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.setProperty("mail.debug", "true");
        prop.setProperty("mail.smtp.auth", "false");
        prop.setProperty("mail.smtp.starttls.enable", "false");

        Session session = Session.getInstance(prop, null);

        try{
            MimeMessage message = new MimeMessage(session);
            message.addHeader("Content-Type", "text/HTML; charset=UTF-8");
            message.addHeader("format", "flowed");
            message.addHeader("Content-Transfer-Encoding", "8bit");

            message.setFrom(new InternetAddress("sitekeeper-no-reply@igt.com", "Sitekeeper_No_Reply"));

            message.setReplyTo(InternetAddress.parse("sitekeeper-no-reply@igt.com", false));

            message.setSubject(this.subject, "UTF-8");
            message.setContent(this.body, "text/html");
            message.setSentDate(new Date());

            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(this.to, false));
            Transport.send(message);
        } catch (Exception mex){
            mex.printStackTrace();
        }
    }
}
