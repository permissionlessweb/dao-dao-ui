
import {
  JUNO_SHITSTRAP_MANAGER,
  OSMOSIS_SHITSTRAP_MANAGER,
  STARGAZE_SHITSTRAP_MANAGER,
  NEUTRON_SHITSTRAP_MANAGER,
  JACKAL_SHITSTRAP_MANAGER,
  TERP_SHITSTRAP_MANAGER,
  BITCANNA_SHITSTRAP_MANAGER,
  BITSONG_SHITSTRAP_MANAGER,
  OMNIFLIX_SHITSTRAP_MANAGER,
  KUJIRA_SHITSTRAP_MANAGER,
  MIGALOO_SHITSTRAP_MANAGER,
  ORAICHAIN_SHITSTRAP_MANAGER,
} from './env'

const stringMap = new Map<string, string>([
    ['juno-1', JUNO_SHITSTRAP_MANAGER],
    ['uni-6', 'juno15jy44q3p0a5lgtpuye36dna03q7xgdkqypd6qps8mjen57l7pqnqd2emz0'],
    ['bitsong-2b', BITSONG_SHITSTRAP_MANAGER],
    ['stargaze-1', STARGAZE_SHITSTRAP_MANAGER],
    ['osmosis-1', OSMOSIS_SHITSTRAP_MANAGER],
    ['neutron-1', NEUTRON_SHITSTRAP_MANAGER],
    ['morocco-1', TERP_SHITSTRAP_MANAGER],
    ['bitcanna-1',BITCANNA_SHITSTRAP_MANAGER],
    ['jackal-1', JACKAL_SHITSTRAP_MANAGER],
    ['omniflix-1', OMNIFLIX_SHITSTRAP_MANAGER],
    ['kujira-1', KUJIRA_SHITSTRAP_MANAGER],
    ['migaloo-1', MIGALOO_SHITSTRAP_MANAGER],
    ['oraichain-1', ORAICHAIN_SHITSTRAP_MANAGER],
    // ['dydx-1','Dy]
    // add more mappings as needed
  ]);

  // TODO: set as env variables in docker file
  export function mapShitstrapManagers(chainId: string): string | undefined {
    return stringMap.get(chainId);
  }