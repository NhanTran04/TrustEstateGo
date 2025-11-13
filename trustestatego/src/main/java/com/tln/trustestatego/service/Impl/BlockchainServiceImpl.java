package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.blockchain.PropertyRegistry;
import com.tln.trustestatego.service.BlockchainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlockchainServiceImpl implements BlockchainService {

    private final Web3j web3j;
    private final Credentials credentials;
    private final PropertyRegistry propertyRegistry;

    // Băm dữ liệu tin đăng thành hash
    public String generateHash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encoded = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(encoded);
        } catch (Exception e) {
            throw new RuntimeException("Error generating hash", e);
        }
    }

    // Ghi dữ liệu xác thực lên blockchain
    public String verifyProperty(BigInteger propertyId, String hashValue) {
        try {
            TransactionReceipt tx = propertyRegistry.verifyProperty(propertyId, hashValue).send();
            return tx.getTransactionHash();
        } catch (Exception e) {
            throw new RuntimeException("Blockchain transaction failed", e);
        }
    }

    public String getPropertyHistory(BigInteger propertyId) {
        try {
            var records = propertyRegistry.getPropertyHistory(propertyId).send();
            return records.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching property history", e);
        }
    }
}
