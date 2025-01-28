import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as switcheoCarbonCdpTxRegistry from "./carbon/cdp/tx.registry";
import * as switcheoCarbonCdpTxAmino from "./carbon/cdp/tx.amino";
export const switcheoAminoConverters = {
  ...switcheoCarbonCdpTxAmino.AminoConverter
};
export const switcheoProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...switcheoCarbonCdpTxRegistry.registry];
export const getSigningSwitcheoClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...switcheoProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...switcheoAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningSwitcheoClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningSwitcheoClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};