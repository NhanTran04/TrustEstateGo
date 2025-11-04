package com.tln.trustestatego.service;

import java.util.Optional;

public interface GeoapifyService {
    Optional<double[]> geocode(String address);
}
