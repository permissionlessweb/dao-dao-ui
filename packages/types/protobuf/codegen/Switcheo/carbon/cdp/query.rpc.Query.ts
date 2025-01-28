import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryRateStrategyRequest, QueryRateStrategyResponse, QueryRateStrategyAllRequest, QueryRateStrategyAllResponse, QueryAccountDataRequest, QueryAccountDataResponse, QueryAccountCollateralRequest, QueryAccountCollateralResponse, QueryAccountCollateralAllRequest, QueryAccountCollateralAllResponse, QueryAccountDebtRequest, QueryAccountDebtResponse, QueryAccountDebtAllRequest, QueryAccountDebtAllResponse, QueryAccountStablecoinRequest, QueryAccountStablecoinResponse, QueryAssetRequest, QueryAssetResponse, QueryAssetAllRequest, QueryAssetAllResponse, QueryTokenDebtRequest, QueryTokenDebtResponse, QueryTokenDebtAllRequest, QueryTokenDebtAllResponse, QueryStablecoinDebtRequest, QueryStablecoinDebtResponse, QueryRewardSchemesAllRequest, QueryRewardSchemesAllResponse, QueryRewardDebtsRequest, QueryRewardDebtsResponse, QueryRewardDebtsAllRequest, QueryCdpPositionsRequest, QueryCdpPositionsResponse, QueryCdpPositionRequest, QueryCdpPositionResponse, QueryHealthFactorRequest, QueryHealthFactorResponse, QueryEModeRequest, QueryEModeResponse, QueryEModeAllRequest, QueryEModeAllResponse, QueryAccountEModeRequest, QueryAccountEModeResponse, QueryStablecoinInterestRequest, QueryStablecoinInterestResponse, QueryCDPLiquidationsAllRequest, QueryCDPLiquidationsAllResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a RateStrategy item. */
  rateStrategy(request: QueryRateStrategyRequest): Promise<QueryRateStrategyResponse>;
  /** Queries a list of RateStrategy items. */
  rateStrategyAll(request?: QueryRateStrategyAllRequest): Promise<QueryRateStrategyAllResponse>;
  /** Queries a AccountData items. */
  accountData(request: QueryAccountDataRequest): Promise<QueryAccountDataResponse>;
  /** Queries a list of AccountCollateral items. */
  accountCollateral(request: QueryAccountCollateralRequest): Promise<QueryAccountCollateralResponse>;
  /** Queries a list of AccountCollaterals items. */
  accountCollateralAll(request: QueryAccountCollateralAllRequest): Promise<QueryAccountCollateralAllResponse>;
  /** Queries a list of AccountDebt items. */
  accountDebt(request: QueryAccountDebtRequest): Promise<QueryAccountDebtResponse>;
  /** Queries a list of AccountDebtAll items. */
  accountDebtAll(request: QueryAccountDebtAllRequest): Promise<QueryAccountDebtAllResponse>;
  /** Queries a list of AccountStablecoin items. */
  accountStablecoin(request: QueryAccountStablecoinRequest): Promise<QueryAccountStablecoinResponse>;
  /** Queries a list of Asset items. */
  asset(request: QueryAssetRequest): Promise<QueryAssetResponse>;
  /** Queries a list of AssetsAll items. */
  assetAll(request?: QueryAssetAllRequest): Promise<QueryAssetAllResponse>;
  /** Queries a list of TokenDebt items. */
  tokenDebt(request: QueryTokenDebtRequest): Promise<QueryTokenDebtResponse>;
  /** Queries a list of TokenDebtsAll items. */
  tokenDebtAll(request?: QueryTokenDebtAllRequest): Promise<QueryTokenDebtAllResponse>;
  /** Queries a list of StablecoinDebt items. */
  stablecoinDebt(request?: QueryStablecoinDebtRequest): Promise<QueryStablecoinDebtResponse>;
  /** Queries a list of all RewardSchemes. */
  rewardSchemesAll(request?: QueryRewardSchemesAllRequest): Promise<QueryRewardSchemesAllResponse>;
  /** Queries a list of RewardDebt items for an address */
  rewardDebts(request: QueryRewardDebtsRequest): Promise<QueryRewardDebtsResponse>;
  /** Queries a list of all RewardDebts */
  rewardDebtsAll(request?: QueryRewardDebtsAllRequest): Promise<QueryRewardDebtsResponse>;
  /** Queries a list of CDP Positions */
  positionsAll(request: QueryCdpPositionsRequest): Promise<QueryCdpPositionsResponse>;
  position(request: QueryCdpPositionRequest): Promise<QueryCdpPositionResponse>;
  healthFactor(request: QueryHealthFactorRequest): Promise<QueryHealthFactorResponse>;
  /** Queries a list of EMode items. */
  eMode(request: QueryEModeRequest): Promise<QueryEModeResponse>;
  /** Queries a list of EModeAll items. */
  eModeAll(request?: QueryEModeAllRequest): Promise<QueryEModeAllResponse>;
  /** Queries a list of AccountEMode items. */
  accountEMode(request: QueryAccountEModeRequest): Promise<QueryAccountEModeResponse>;
  /** Queries StablecoinInterest. */
  stablecoinInterest(request?: QueryStablecoinInterestRequest): Promise<QueryStablecoinInterestResponse>;
  /** Queries a list of CDPLiquidations items. */
  cDPLiquidationsAll(request?: QueryCDPLiquidationsAllRequest): Promise<QueryCDPLiquidationsAllResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.rateStrategy = this.rateStrategy.bind(this);
    this.rateStrategyAll = this.rateStrategyAll.bind(this);
    this.accountData = this.accountData.bind(this);
    this.accountCollateral = this.accountCollateral.bind(this);
    this.accountCollateralAll = this.accountCollateralAll.bind(this);
    this.accountDebt = this.accountDebt.bind(this);
    this.accountDebtAll = this.accountDebtAll.bind(this);
    this.accountStablecoin = this.accountStablecoin.bind(this);
    this.asset = this.asset.bind(this);
    this.assetAll = this.assetAll.bind(this);
    this.tokenDebt = this.tokenDebt.bind(this);
    this.tokenDebtAll = this.tokenDebtAll.bind(this);
    this.stablecoinDebt = this.stablecoinDebt.bind(this);
    this.rewardSchemesAll = this.rewardSchemesAll.bind(this);
    this.rewardDebts = this.rewardDebts.bind(this);
    this.rewardDebtsAll = this.rewardDebtsAll.bind(this);
    this.positionsAll = this.positionsAll.bind(this);
    this.position = this.position.bind(this);
    this.healthFactor = this.healthFactor.bind(this);
    this.eMode = this.eMode.bind(this);
    this.eModeAll = this.eModeAll.bind(this);
    this.accountEMode = this.accountEMode.bind(this);
    this.stablecoinInterest = this.stablecoinInterest.bind(this);
    this.cDPLiquidationsAll = this.cDPLiquidationsAll.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rateStrategy(request: QueryRateStrategyRequest, useInterfaces: boolean = true): Promise<QueryRateStrategyResponse> {
    const data = QueryRateStrategyRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "RateStrategy", data);
    return promise.then(data => QueryRateStrategyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rateStrategyAll(request: QueryRateStrategyAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryRateStrategyAllResponse> {
    const data = QueryRateStrategyAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "RateStrategyAll", data);
    return promise.then(data => QueryRateStrategyAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountData(request: QueryAccountDataRequest, useInterfaces: boolean = true): Promise<QueryAccountDataResponse> {
    const data = QueryAccountDataRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountData", data);
    return promise.then(data => QueryAccountDataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountCollateral(request: QueryAccountCollateralRequest, useInterfaces: boolean = true): Promise<QueryAccountCollateralResponse> {
    const data = QueryAccountCollateralRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountCollateral", data);
    return promise.then(data => QueryAccountCollateralResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountCollateralAll(request: QueryAccountCollateralAllRequest, useInterfaces: boolean = true): Promise<QueryAccountCollateralAllResponse> {
    const data = QueryAccountCollateralAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountCollateralAll", data);
    return promise.then(data => QueryAccountCollateralAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountDebt(request: QueryAccountDebtRequest, useInterfaces: boolean = true): Promise<QueryAccountDebtResponse> {
    const data = QueryAccountDebtRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountDebt", data);
    return promise.then(data => QueryAccountDebtResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountDebtAll(request: QueryAccountDebtAllRequest, useInterfaces: boolean = true): Promise<QueryAccountDebtAllResponse> {
    const data = QueryAccountDebtAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountDebtAll", data);
    return promise.then(data => QueryAccountDebtAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountStablecoin(request: QueryAccountStablecoinRequest, useInterfaces: boolean = true): Promise<QueryAccountStablecoinResponse> {
    const data = QueryAccountStablecoinRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountStablecoin", data);
    return promise.then(data => QueryAccountStablecoinResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  asset(request: QueryAssetRequest, useInterfaces: boolean = true): Promise<QueryAssetResponse> {
    const data = QueryAssetRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "Asset", data);
    return promise.then(data => QueryAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  assetAll(request: QueryAssetAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAssetAllResponse> {
    const data = QueryAssetAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AssetAll", data);
    return promise.then(data => QueryAssetAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tokenDebt(request: QueryTokenDebtRequest, useInterfaces: boolean = true): Promise<QueryTokenDebtResponse> {
    const data = QueryTokenDebtRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "TokenDebt", data);
    return promise.then(data => QueryTokenDebtResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tokenDebtAll(request: QueryTokenDebtAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryTokenDebtAllResponse> {
    const data = QueryTokenDebtAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "TokenDebtAll", data);
    return promise.then(data => QueryTokenDebtAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stablecoinDebt(request: QueryStablecoinDebtRequest = {}, useInterfaces: boolean = true): Promise<QueryStablecoinDebtResponse> {
    const data = QueryStablecoinDebtRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "StablecoinDebt", data);
    return promise.then(data => QueryStablecoinDebtResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rewardSchemesAll(request: QueryRewardSchemesAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryRewardSchemesAllResponse> {
    const data = QueryRewardSchemesAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "RewardSchemesAll", data);
    return promise.then(data => QueryRewardSchemesAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rewardDebts(request: QueryRewardDebtsRequest, useInterfaces: boolean = true): Promise<QueryRewardDebtsResponse> {
    const data = QueryRewardDebtsRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "RewardDebts", data);
    return promise.then(data => QueryRewardDebtsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rewardDebtsAll(request: QueryRewardDebtsAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryRewardDebtsResponse> {
    const data = QueryRewardDebtsAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "RewardDebtsAll", data);
    return promise.then(data => QueryRewardDebtsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  positionsAll(request: QueryCdpPositionsRequest, useInterfaces: boolean = true): Promise<QueryCdpPositionsResponse> {
    const data = QueryCdpPositionsRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "PositionsAll", data);
    return promise.then(data => QueryCdpPositionsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  position(request: QueryCdpPositionRequest, useInterfaces: boolean = true): Promise<QueryCdpPositionResponse> {
    const data = QueryCdpPositionRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "Position", data);
    return promise.then(data => QueryCdpPositionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  healthFactor(request: QueryHealthFactorRequest, useInterfaces: boolean = true): Promise<QueryHealthFactorResponse> {
    const data = QueryHealthFactorRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "HealthFactor", data);
    return promise.then(data => QueryHealthFactorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  eMode(request: QueryEModeRequest, useInterfaces: boolean = true): Promise<QueryEModeResponse> {
    const data = QueryEModeRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "EMode", data);
    return promise.then(data => QueryEModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  eModeAll(request: QueryEModeAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryEModeAllResponse> {
    const data = QueryEModeAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "EModeAll", data);
    return promise.then(data => QueryEModeAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountEMode(request: QueryAccountEModeRequest, useInterfaces: boolean = true): Promise<QueryAccountEModeResponse> {
    const data = QueryAccountEModeRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "AccountEMode", data);
    return promise.then(data => QueryAccountEModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stablecoinInterest(request: QueryStablecoinInterestRequest = {}, useInterfaces: boolean = true): Promise<QueryStablecoinInterestResponse> {
    const data = QueryStablecoinInterestRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "StablecoinInterest", data);
    return promise.then(data => QueryStablecoinInterestResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cDPLiquidationsAll(request: QueryCDPLiquidationsAllRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryCDPLiquidationsAllResponse> {
    const data = QueryCDPLiquidationsAllRequest.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Query", "CDPLiquidationsAll", data);
    return promise.then(data => QueryCDPLiquidationsAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    rateStrategy(request: QueryRateStrategyRequest, useInterfaces: boolean = true): Promise<QueryRateStrategyResponse> {
      return queryService.rateStrategy(request, useInterfaces);
    },
    rateStrategyAll(request?: QueryRateStrategyAllRequest, useInterfaces: boolean = true): Promise<QueryRateStrategyAllResponse> {
      return queryService.rateStrategyAll(request, useInterfaces);
    },
    accountData(request: QueryAccountDataRequest, useInterfaces: boolean = true): Promise<QueryAccountDataResponse> {
      return queryService.accountData(request, useInterfaces);
    },
    accountCollateral(request: QueryAccountCollateralRequest, useInterfaces: boolean = true): Promise<QueryAccountCollateralResponse> {
      return queryService.accountCollateral(request, useInterfaces);
    },
    accountCollateralAll(request: QueryAccountCollateralAllRequest, useInterfaces: boolean = true): Promise<QueryAccountCollateralAllResponse> {
      return queryService.accountCollateralAll(request, useInterfaces);
    },
    accountDebt(request: QueryAccountDebtRequest, useInterfaces: boolean = true): Promise<QueryAccountDebtResponse> {
      return queryService.accountDebt(request, useInterfaces);
    },
    accountDebtAll(request: QueryAccountDebtAllRequest, useInterfaces: boolean = true): Promise<QueryAccountDebtAllResponse> {
      return queryService.accountDebtAll(request, useInterfaces);
    },
    accountStablecoin(request: QueryAccountStablecoinRequest, useInterfaces: boolean = true): Promise<QueryAccountStablecoinResponse> {
      return queryService.accountStablecoin(request, useInterfaces);
    },
    asset(request: QueryAssetRequest, useInterfaces: boolean = true): Promise<QueryAssetResponse> {
      return queryService.asset(request, useInterfaces);
    },
    assetAll(request?: QueryAssetAllRequest, useInterfaces: boolean = true): Promise<QueryAssetAllResponse> {
      return queryService.assetAll(request, useInterfaces);
    },
    tokenDebt(request: QueryTokenDebtRequest, useInterfaces: boolean = true): Promise<QueryTokenDebtResponse> {
      return queryService.tokenDebt(request, useInterfaces);
    },
    tokenDebtAll(request?: QueryTokenDebtAllRequest, useInterfaces: boolean = true): Promise<QueryTokenDebtAllResponse> {
      return queryService.tokenDebtAll(request, useInterfaces);
    },
    stablecoinDebt(request?: QueryStablecoinDebtRequest, useInterfaces: boolean = true): Promise<QueryStablecoinDebtResponse> {
      return queryService.stablecoinDebt(request, useInterfaces);
    },
    rewardSchemesAll(request?: QueryRewardSchemesAllRequest, useInterfaces: boolean = true): Promise<QueryRewardSchemesAllResponse> {
      return queryService.rewardSchemesAll(request, useInterfaces);
    },
    rewardDebts(request: QueryRewardDebtsRequest, useInterfaces: boolean = true): Promise<QueryRewardDebtsResponse> {
      return queryService.rewardDebts(request, useInterfaces);
    },
    rewardDebtsAll(request?: QueryRewardDebtsAllRequest, useInterfaces: boolean = true): Promise<QueryRewardDebtsResponse> {
      return queryService.rewardDebtsAll(request, useInterfaces);
    },
    positionsAll(request: QueryCdpPositionsRequest, useInterfaces: boolean = true): Promise<QueryCdpPositionsResponse> {
      return queryService.positionsAll(request, useInterfaces);
    },
    position(request: QueryCdpPositionRequest, useInterfaces: boolean = true): Promise<QueryCdpPositionResponse> {
      return queryService.position(request, useInterfaces);
    },
    healthFactor(request: QueryHealthFactorRequest, useInterfaces: boolean = true): Promise<QueryHealthFactorResponse> {
      return queryService.healthFactor(request, useInterfaces);
    },
    eMode(request: QueryEModeRequest, useInterfaces: boolean = true): Promise<QueryEModeResponse> {
      return queryService.eMode(request, useInterfaces);
    },
    eModeAll(request?: QueryEModeAllRequest, useInterfaces: boolean = true): Promise<QueryEModeAllResponse> {
      return queryService.eModeAll(request, useInterfaces);
    },
    accountEMode(request: QueryAccountEModeRequest, useInterfaces: boolean = true): Promise<QueryAccountEModeResponse> {
      return queryService.accountEMode(request, useInterfaces);
    },
    stablecoinInterest(request?: QueryStablecoinInterestRequest, useInterfaces: boolean = true): Promise<QueryStablecoinInterestResponse> {
      return queryService.stablecoinInterest(request, useInterfaces);
    },
    cDPLiquidationsAll(request?: QueryCDPLiquidationsAllRequest, useInterfaces: boolean = true): Promise<QueryCDPLiquidationsAllResponse> {
      return queryService.cDPLiquidationsAll(request, useInterfaces);
    }
  };
};