package com.tln.trustestatego.configuration;

import com.tln.trustestatego.blockchain.PropertyRegistry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

@Configuration

public class Web3jConfig {

    @Value("${web3.rpc-url}")
    private String rpcUrl;

    @Value("${web3.private-key}")
    private String privateKey;

    @Value("${web3.contract-address}")
    private String contractAddress;

    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(rpcUrl));
    }

    @Bean
    public Credentials credentials() {
        return Credentials.create(privateKey);
    }

    @Bean
    public PropertyRegistry propertyRegistry(Web3j web3j, Credentials credentials) {
        return PropertyRegistry.load(contractAddress, web3j, credentials, new DefaultGasProvider());
    }
}
