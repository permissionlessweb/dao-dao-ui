import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryConsumerGenesisRequest, QueryConsumerGenesisResponse, QueryConsumerChainsRequest, QueryConsumerChainsResponse, QueryValidatorConsumerAddrRequest, QueryValidatorConsumerAddrResponse, QueryValidatorProviderAddrRequest, QueryValidatorProviderAddrResponse, QueryThrottleStateRequest, QueryThrottleStateResponse, QueryRegisteredConsumerRewardDenomsRequest, QueryRegisteredConsumerRewardDenomsResponse, QueryAllPairsValConsAddrByConsumerRequest, QueryAllPairsValConsAddrByConsumerResponse, QueryParamsRequest, QueryParamsResponse, QueryConsumerChainOptedInValidatorsRequest, QueryConsumerChainOptedInValidatorsResponse, QueryConsumerChainsValidatorHasToValidateRequest, QueryConsumerChainsValidatorHasToValidateResponse, QueryValidatorConsumerCommissionRateRequest, QueryValidatorConsumerCommissionRateResponse, QueryConsumerValidatorsRequest, QueryConsumerValidatorsResponse, QueryBlocksUntilNextEpochRequest, QueryBlocksUntilNextEpochResponse, QueryConsumerIdFromClientIdRequest, QueryConsumerIdFromClientIdResponse, QueryConsumerChainRequest, QueryConsumerChainResponse } from "./query";
export interface Query {
  /**
   * ConsumerGenesis queries the genesis state needed to start a consumer chain
   * whose proposal has been accepted
   */
  queryConsumerGenesis(request: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponse>;
  /**
   * ConsumerChains queries active consumer chains supported by the provider
   * chain
   */
  queryConsumerChains(request: QueryConsumerChainsRequest): Promise<QueryConsumerChainsResponse>;
  /**
   * QueryValidatorConsumerAddr queries the address
   * assigned by a validator for a consumer chain.
   */
  queryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponse>;
  /**
   * QueryProviderAddr returns the provider chain validator
   * given a consumer chain validator address
   */
  queryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponse>;
  /**
   * QueryThrottleState returns the main on-chain state relevant to currently
   * throttled slash packets
   */
  queryThrottleState(request?: QueryThrottleStateRequest): Promise<QueryThrottleStateResponse>;
  /**
   * QueryRegisteredConsumerRewardDenoms returns a list of consumer reward
   * denoms that are registered
   */
  queryRegisteredConsumerRewardDenoms(request?: QueryRegisteredConsumerRewardDenomsRequest): Promise<QueryRegisteredConsumerRewardDenomsResponse>;
  /**
   * QueryAllPairsValConsAddrByConsumer returns a list of pair valconsensus address
   * between provider and consumer chain
   */
  queryAllPairsValConsAddrByConsumer(request: QueryAllPairsValConsAddrByConsumerRequest): Promise<QueryAllPairsValConsAddrByConsumerResponse>;
  /** QueryParams returns all current values of provider parameters */
  queryParams(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * QueryConsumerChainOptedInValidators returns a list of validators consensus addresses
   * that opted-in to the given consumer chain
   */
  queryConsumerChainOptedInValidators(request: QueryConsumerChainOptedInValidatorsRequest): Promise<QueryConsumerChainOptedInValidatorsResponse>;
  /**
   * QueryConsumerChainsValidatorHasToValidate returns a list of consumer chains
   * that a given validator must validate
   */
  queryConsumerChainsValidatorHasToValidate(request: QueryConsumerChainsValidatorHasToValidateRequest): Promise<QueryConsumerChainsValidatorHasToValidateResponse>;
  /**
   * QueryValidatorConsumerCommissionRate returns the commission rate a given
   * validator charges on a given consumer chain
   */
  queryValidatorConsumerCommissionRate(request: QueryValidatorConsumerCommissionRateRequest): Promise<QueryValidatorConsumerCommissionRateResponse>;
  /**
   * QueryConsumerValidators returns the latest set consumer-validator set for a given consumer ID
   * Note that this does not necessarily mean that the consumer chain is using this validator set at this exact moment
   * because a VSCPacket could be delayed to be delivered on the consumer chain.
   */
  queryConsumerValidators(request: QueryConsumerValidatorsRequest): Promise<QueryConsumerValidatorsResponse>;
  /**
   * QueryBlocksUntilNextEpoch returns the number of blocks until the next epoch
   * starts and validator updates are sent to the consumer chains
   */
  queryBlocksUntilNextEpoch(request?: QueryBlocksUntilNextEpochRequest): Promise<QueryBlocksUntilNextEpochResponse>;
  /**
   * QueryConsumerIdFromClientId returns the consumer id of the chain
   * associated with the provided client id
   */
  queryConsumerIdFromClientId(request: QueryConsumerIdFromClientIdRequest): Promise<QueryConsumerIdFromClientIdResponse>;
  /**
   * QueryConsumerChain returns the consumer chain
   * associated with the provided consumer id
   */
  queryConsumerChain(request: QueryConsumerChainRequest): Promise<QueryConsumerChainResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.queryConsumerGenesis = this.queryConsumerGenesis.bind(this);
    this.queryConsumerChains = this.queryConsumerChains.bind(this);
    this.queryValidatorConsumerAddr = this.queryValidatorConsumerAddr.bind(this);
    this.queryValidatorProviderAddr = this.queryValidatorProviderAddr.bind(this);
    this.queryThrottleState = this.queryThrottleState.bind(this);
    this.queryRegisteredConsumerRewardDenoms = this.queryRegisteredConsumerRewardDenoms.bind(this);
    this.queryAllPairsValConsAddrByConsumer = this.queryAllPairsValConsAddrByConsumer.bind(this);
    this.queryParams = this.queryParams.bind(this);
    this.queryConsumerChainOptedInValidators = this.queryConsumerChainOptedInValidators.bind(this);
    this.queryConsumerChainsValidatorHasToValidate = this.queryConsumerChainsValidatorHasToValidate.bind(this);
    this.queryValidatorConsumerCommissionRate = this.queryValidatorConsumerCommissionRate.bind(this);
    this.queryConsumerValidators = this.queryConsumerValidators.bind(this);
    this.queryBlocksUntilNextEpoch = this.queryBlocksUntilNextEpoch.bind(this);
    this.queryConsumerIdFromClientId = this.queryConsumerIdFromClientId.bind(this);
    this.queryConsumerChain = this.queryConsumerChain.bind(this);
  }
  queryConsumerGenesis(request: QueryConsumerGenesisRequest, useInterfaces: boolean = true): Promise<QueryConsumerGenesisResponse> {
    const data = QueryConsumerGenesisRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerGenesis", data);
    return promise.then(data => QueryConsumerGenesisResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryConsumerChains(request: QueryConsumerChainsRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainsResponse> {
    const data = QueryConsumerChainsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChains", data);
    return promise.then(data => QueryConsumerChainsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest, useInterfaces: boolean = true): Promise<QueryValidatorConsumerAddrResponse> {
    const data = QueryValidatorConsumerAddrRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorConsumerAddr", data);
    return promise.then(data => QueryValidatorConsumerAddrResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest, useInterfaces: boolean = true): Promise<QueryValidatorProviderAddrResponse> {
    const data = QueryValidatorProviderAddrRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorProviderAddr", data);
    return promise.then(data => QueryValidatorProviderAddrResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryThrottleState(request: QueryThrottleStateRequest = {}, useInterfaces: boolean = true): Promise<QueryThrottleStateResponse> {
    const data = QueryThrottleStateRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryThrottleState", data);
    return promise.then(data => QueryThrottleStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryRegisteredConsumerRewardDenoms(request: QueryRegisteredConsumerRewardDenomsRequest = {}, useInterfaces: boolean = true): Promise<QueryRegisteredConsumerRewardDenomsResponse> {
    const data = QueryRegisteredConsumerRewardDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryRegisteredConsumerRewardDenoms", data);
    return promise.then(data => QueryRegisteredConsumerRewardDenomsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryAllPairsValConsAddrByConsumer(request: QueryAllPairsValConsAddrByConsumerRequest, useInterfaces: boolean = true): Promise<QueryAllPairsValConsAddrByConsumerResponse> {
    const data = QueryAllPairsValConsAddrByConsumerRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryAllPairsValConsAddrByConsumer", data);
    return promise.then(data => QueryAllPairsValConsAddrByConsumerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryParams(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryParams", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryConsumerChainOptedInValidators(request: QueryConsumerChainOptedInValidatorsRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainOptedInValidatorsResponse> {
    const data = QueryConsumerChainOptedInValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChainOptedInValidators", data);
    return promise.then(data => QueryConsumerChainOptedInValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryConsumerChainsValidatorHasToValidate(request: QueryConsumerChainsValidatorHasToValidateRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainsValidatorHasToValidateResponse> {
    const data = QueryConsumerChainsValidatorHasToValidateRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChainsValidatorHasToValidate", data);
    return promise.then(data => QueryConsumerChainsValidatorHasToValidateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryValidatorConsumerCommissionRate(request: QueryValidatorConsumerCommissionRateRequest, useInterfaces: boolean = true): Promise<QueryValidatorConsumerCommissionRateResponse> {
    const data = QueryValidatorConsumerCommissionRateRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorConsumerCommissionRate", data);
    return promise.then(data => QueryValidatorConsumerCommissionRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryConsumerValidators(request: QueryConsumerValidatorsRequest, useInterfaces: boolean = true): Promise<QueryConsumerValidatorsResponse> {
    const data = QueryConsumerValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerValidators", data);
    return promise.then(data => QueryConsumerValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryBlocksUntilNextEpoch(request: QueryBlocksUntilNextEpochRequest = {}, useInterfaces: boolean = true): Promise<QueryBlocksUntilNextEpochResponse> {
    const data = QueryBlocksUntilNextEpochRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryBlocksUntilNextEpoch", data);
    return promise.then(data => QueryBlocksUntilNextEpochResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryConsumerIdFromClientId(request: QueryConsumerIdFromClientIdRequest, useInterfaces: boolean = true): Promise<QueryConsumerIdFromClientIdResponse> {
    const data = QueryConsumerIdFromClientIdRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerIdFromClientId", data);
    return promise.then(data => QueryConsumerIdFromClientIdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryConsumerChain(request: QueryConsumerChainRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainResponse> {
    const data = QueryConsumerChainRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChain", data);
    return promise.then(data => QueryConsumerChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    queryConsumerGenesis(request: QueryConsumerGenesisRequest, useInterfaces: boolean = true): Promise<QueryConsumerGenesisResponse> {
      return queryService.queryConsumerGenesis(request, useInterfaces);
    },
    queryConsumerChains(request: QueryConsumerChainsRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainsResponse> {
      return queryService.queryConsumerChains(request, useInterfaces);
    },
    queryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest, useInterfaces: boolean = true): Promise<QueryValidatorConsumerAddrResponse> {
      return queryService.queryValidatorConsumerAddr(request, useInterfaces);
    },
    queryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest, useInterfaces: boolean = true): Promise<QueryValidatorProviderAddrResponse> {
      return queryService.queryValidatorProviderAddr(request, useInterfaces);
    },
    queryThrottleState(request?: QueryThrottleStateRequest, useInterfaces: boolean = true): Promise<QueryThrottleStateResponse> {
      return queryService.queryThrottleState(request, useInterfaces);
    },
    queryRegisteredConsumerRewardDenoms(request?: QueryRegisteredConsumerRewardDenomsRequest, useInterfaces: boolean = true): Promise<QueryRegisteredConsumerRewardDenomsResponse> {
      return queryService.queryRegisteredConsumerRewardDenoms(request, useInterfaces);
    },
    queryAllPairsValConsAddrByConsumer(request: QueryAllPairsValConsAddrByConsumerRequest, useInterfaces: boolean = true): Promise<QueryAllPairsValConsAddrByConsumerResponse> {
      return queryService.queryAllPairsValConsAddrByConsumer(request, useInterfaces);
    },
    queryParams(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.queryParams(request, useInterfaces);
    },
    queryConsumerChainOptedInValidators(request: QueryConsumerChainOptedInValidatorsRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainOptedInValidatorsResponse> {
      return queryService.queryConsumerChainOptedInValidators(request, useInterfaces);
    },
    queryConsumerChainsValidatorHasToValidate(request: QueryConsumerChainsValidatorHasToValidateRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainsValidatorHasToValidateResponse> {
      return queryService.queryConsumerChainsValidatorHasToValidate(request, useInterfaces);
    },
    queryValidatorConsumerCommissionRate(request: QueryValidatorConsumerCommissionRateRequest, useInterfaces: boolean = true): Promise<QueryValidatorConsumerCommissionRateResponse> {
      return queryService.queryValidatorConsumerCommissionRate(request, useInterfaces);
    },
    queryConsumerValidators(request: QueryConsumerValidatorsRequest, useInterfaces: boolean = true): Promise<QueryConsumerValidatorsResponse> {
      return queryService.queryConsumerValidators(request, useInterfaces);
    },
    queryBlocksUntilNextEpoch(request?: QueryBlocksUntilNextEpochRequest, useInterfaces: boolean = true): Promise<QueryBlocksUntilNextEpochResponse> {
      return queryService.queryBlocksUntilNextEpoch(request, useInterfaces);
    },
    queryConsumerIdFromClientId(request: QueryConsumerIdFromClientIdRequest, useInterfaces: boolean = true): Promise<QueryConsumerIdFromClientIdResponse> {
      return queryService.queryConsumerIdFromClientId(request, useInterfaces);
    },
    queryConsumerChain(request: QueryConsumerChainRequest, useInterfaces: boolean = true): Promise<QueryConsumerChainResponse> {
      return queryService.queryConsumerChain(request, useInterfaces);
    }
  };
};