package com.tln.trustestatego.blockchain;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.DynamicStruct;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/LFDT-web3j/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.14.0.
 */
@SuppressWarnings("rawtypes")
public class PropertyRegistry extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_VERIFYPROPERTY = "verifyProperty";

    public static final String FUNC_GETPROPERTYHISTORY = "getPropertyHistory";

    public static final String FUNC_PROPERTYHISTORY = "propertyHistory";

    public static final Event PROPERTYVERIFIED_EVENT = new Event("PropertyVerified", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}));
    ;

    @Deprecated
    protected PropertyRegistry(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected PropertyRegistry(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected PropertyRegistry(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected PropertyRegistry(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<PropertyVerifiedEventResponse> getPropertyVerifiedEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PROPERTYVERIFIED_EVENT, transactionReceipt);
        ArrayList<PropertyVerifiedEventResponse> responses = new ArrayList<PropertyVerifiedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            PropertyVerifiedEventResponse typedResponse = new PropertyVerifiedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.propertyId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.hashValue = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.verifiedBy = (String) eventValues.getNonIndexedValues().get(2).getValue();
            typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static PropertyVerifiedEventResponse getPropertyVerifiedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PROPERTYVERIFIED_EVENT, log);
        PropertyVerifiedEventResponse typedResponse = new PropertyVerifiedEventResponse();
        typedResponse.log = log;
        typedResponse.propertyId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.hashValue = (String) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.verifiedBy = (String) eventValues.getNonIndexedValues().get(2).getValue();
        typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
        return typedResponse;
    }

    public Flowable<PropertyVerifiedEventResponse> propertyVerifiedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getPropertyVerifiedEventFromLog(log));
    }

    public Flowable<PropertyVerifiedEventResponse> propertyVerifiedEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PROPERTYVERIFIED_EVENT));
        return propertyVerifiedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> verifyProperty(BigInteger _propertyId,
            String _hashValue) {
        final Function function = new Function(
                FUNC_VERIFYPROPERTY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_propertyId), 
                new org.web3j.abi.datatypes.Utf8String(_hashValue)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<List> getPropertyHistory(BigInteger _propertyId) {
        final Function function = new Function(FUNC_GETPROPERTYHISTORY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_propertyId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<PropertyRecord>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>> propertyHistory(
            BigInteger param0, BigInteger param1) {
        final Function function = new Function(FUNC_PROPERTYHISTORY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0), 
                new org.web3j.abi.datatypes.generated.Uint256(param1)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>>(function,
                new Callable<Tuple4<BigInteger, String, String, BigInteger>>() {
                    @Override
                    public Tuple4<BigInteger, String, String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, String, String, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    @Deprecated
    public static PropertyRegistry load(String contractAddress, Web3j web3j,
            Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new PropertyRegistry(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static PropertyRegistry load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new PropertyRegistry(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static PropertyRegistry load(String contractAddress, Web3j web3j,
            Credentials credentials, ContractGasProvider contractGasProvider) {
        return new PropertyRegistry(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static PropertyRegistry load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new PropertyRegistry(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class PropertyRecord extends DynamicStruct {
        public BigInteger propertyId;

        public String hashValue;

        public String verifiedBy;

        public BigInteger timestamp;

        public PropertyRecord(BigInteger propertyId, String hashValue, String verifiedBy,
                BigInteger timestamp) {
            super(new org.web3j.abi.datatypes.generated.Uint256(propertyId), 
                    new org.web3j.abi.datatypes.Utf8String(hashValue), 
                    new org.web3j.abi.datatypes.Address(160, verifiedBy), 
                    new org.web3j.abi.datatypes.generated.Uint256(timestamp));
            this.propertyId = propertyId;
            this.hashValue = hashValue;
            this.verifiedBy = verifiedBy;
            this.timestamp = timestamp;
        }

        public PropertyRecord(Uint256 propertyId, Utf8String hashValue, Address verifiedBy,
                Uint256 timestamp) {
            super(propertyId, hashValue, verifiedBy, timestamp);
            this.propertyId = propertyId.getValue();
            this.hashValue = hashValue.getValue();
            this.verifiedBy = verifiedBy.getValue();
            this.timestamp = timestamp.getValue();
        }
    }

    public static class PropertyVerifiedEventResponse extends BaseEventResponse {
        public BigInteger propertyId;

        public String hashValue;

        public String verifiedBy;

        public BigInteger timestamp;
    }
}
