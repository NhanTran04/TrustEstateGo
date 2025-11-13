package com.tln.trustestatego;

import com.tln.trustestatego.service.Impl.PropertyCoordinateUpdater;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.TimeZone;

@SpringBootApplication
@RequiredArgsConstructor
public class TrustEstateGoApplication {// implements CommandLineRunner
	private final PropertyCoordinateUpdater coordinateUpdater;

	public static void main(String[] args) {
		SpringApplication.run(TrustEstateGoApplication.class, args);
	}
//	@Override
//	public void run(String... args) {
//		coordinateUpdater.updateAllCoordinates();
//	}

}
