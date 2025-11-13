package com.tln.trustestatego.service;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigInteger;

public interface BlockchainService {
    String generateHash(String data);
    String verifyProperty(BigInteger propertyId, String hashValue);
    String getPropertyHistory(BigInteger propertyId);
}
