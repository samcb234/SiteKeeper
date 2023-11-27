package com.igt.sitekeeper;

import com.igt.sitekeeper.service.MailProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SiteKeeperApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiteKeeperApplication.class, args);
	}

}
