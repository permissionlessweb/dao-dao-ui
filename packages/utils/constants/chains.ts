import { Chain } from '@chain-registry/types'

import {
  AnyChain,
  BaseChainConfig,
  ChainId,
  CodeHashConfig,
  CodeIdConfig,
  ContractVersion,
  PolytoneConfig,
  SupportedChainConfig,
  SupportedChainIndexerMode,
  TokenType,
} from '@dao-dao/types'

import { NftBasedCreatorId } from './adapters'
import _ALL_CODE_HASHES from './codeHashes.json'
import _ALL_CODE_IDS from './codeIds.json'
import { TEST_ENV } from './other'
import _ALL_POLYTONE from './polytone.json'
import { chains, convertChainRegistryChainToAnyChain } from './registry'
import morocco1Data from './terp-state.json'


const ALL_CODE_HASHES = _ALL_CODE_HASHES as unknown as Partial<
  Record<ChainId, Partial<Record<ContractVersion, CodeHashConfig>>>
>
const ALL_CODE_IDS = TEST_ENV
  ? // Fetched later in convertConfiguredChainToSupportedChain.
  {}
  : (_ALL_CODE_IDS as unknown as Partial<
    Record<ChainId, Partial<Record<ContractVersion, CodeIdConfig>>>
  >)
const ALL_POLYTONE = _ALL_POLYTONE as unknown as Partial<
  Record<ChainId, PolytoneConfig>
>

// // === Merge Code IDs from cw-orchestrator into ALL_CODE_IDS ===
// const moroccoCodeIdsRaw = morocco1Data['morocco-1']?.code_ids || {};

// const targetVersion = '2.7.1';
// const daoDaoCodeIds = {
//   "2.7.1": {
//     Cw1Whitelist: 2,
//     Cw4Group: 3,
//     CwAdminFactory: 176,
//     CwPayrollFactory: 177,
//     CwTokenSwap: 178,
//     CwTokenfactoryIssuer: 395,
//     CwVesting: 190,
//     DaoDaoCore: 179,
//     DaoPreProposeApprovalMultiple: 180,
//     DaoPreProposeApprovalSingle: 181,
//     DaoPreProposeApprover: 182,
//     DaoPreProposeMultiple: 183,
//     DaoPreProposeSingle: 184,
//     DaoProposalMultiple: 185,
//     DaoProposalSingle: 186,
//     DaoRewardsDistributor: 187,
//     DaoVoteDelegation: 188,
//     DaoVotingCw4: 189,
//     DaoVotingCw721Staked: 191,
//     DaoVotingTokenStaked: 192,
//     // Add future contracts here
//   },
// } as const;

// const allowedKeys = new Set(
//   Object.keys(daoDaoCodeIds[targetVersion] || {})
//     .map(snakeToCamel)   // normalize to camelCase
// );

// // Ensure structure exists
// if (!ALL_CODE_IDS[ChainId.TerpMainnet]) {
//   ALL_CODE_IDS[ChainId.TerpMainnet] = {};
// }
// if (!ALL_CODE_IDS[ChainId.TerpMainnet][targetVersion]) {
//   ALL_CODE_IDS[ChainId.TerpMainnet][targetVersion] = {} as CodeIdConfig;
// }

// const terpCodeIdConfig = ALL_CODE_IDS[ChainId.TerpMainnet][targetVersion]!;
// // Helper function: snake_case → camelCase
// function snakeToCamel(str: string): string {
//   return str
//     .replace(/[-_]+(.)/g, (_, char) => char.toUpperCase())
//     .replace(/^./, (char) => char.toLowerCase());
// }

// // 1. Merge ONLY expected contracts from orchestrator raw data
// Object.entries(moroccoCodeIdsRaw).forEach(([key, value]) => {
//   if (value == null) return;

//   const camelKey = snakeToCamel(key);

//   // ← This is the key filter
//   if (allowedKeys.has(camelKey)) {
//     terpCodeIdConfig[camelKey as keyof CodeIdConfig] = Number(value);
//   }
// });

// // 2. Merge/override with clean DAO DAO values (guaranteed to match type)
// const versionedDaoCodes = daoDaoCodeIds[targetVersion] || {};
// Object.entries(versionedDaoCodes).forEach(([key, value]) => {
//   const camelKey = snakeToCamel(key);
//   terpCodeIdConfig[camelKey as keyof CodeIdConfig] = Number(value);
// });

// console.log(`✅ Successfully merged Terp code IDs for ${ChainId.TerpMainnet} v${targetVersion}`);
// console.log(`   → Only ${allowedKeys.size} expected DAO contracts were curated.`);

/**
 * Chains where DAO DAO is deployed.
 */
const BASE_SUPPORTED_CHAINS: Omit<
  SupportedChainConfig,
  'codeIds' | 'allCodeIds' | 'codeHashes' | 'allCodeHashes' | 'polytone'
>[] = TEST_ENV
    ? []
    : [
      {
        chainId: ChainId.TerpMainnet,
        name: 'cosmos',
        mainnet: true,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#56f5da',
        factoryContractAddress:
          'terp1405rgu0e4rrzkwpvscl5xc8ypf6edseyjxljft4jp7qxrchqlnws28au53',
        explorerUrlTemplates: {
          tx: 'https://explorer.terp.network/tx/REPLACE',
          gov: 'https://explorer.terp.network/gov',
          govProp: 'https://explorer.terp.network/gov/REPLACE',
          wallet: 'https://explorer.terp.network/account/REPLACE',
        },
        latestVersion: ContractVersion.V300Terp,
      },
      {
        chainId: ChainId.CosmosHubMainnet,
        name: 'cosmos',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#5064fb',
        factoryContractAddress:
          'cosmos19jjaejvhfyqzjlgc6l2xa7w3gwwtvx4qvgad2gkw5dynxx2lmpxq9s5g3y',
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/cosmos/tx/REPLACE',
          gov: 'https://mintscan.io/cosmos/proposals',
          govProp: 'https://mintscan.io/cosmos/proposals/REPLACE',
          wallet: 'https://mintscan.io/cosmos/account/REPLACE',
        },
        latestVersion: ContractVersion.V271,
      },
      {
        chainId: ChainId.JunoMainnet,
        name: 'juno',
        mainnet: true,
        indexer: SupportedChainIndexerMode.All,
        accentColor: '#f74a49',
        factoryContractAddress:
          'juno1f3xxy7cw5lvljf38ehhcxavxlawpmkezq7qtrhesvympfudjvlaqzz6exr',
        kado: {
          network: 'JUNO',
        },
        subDaos: [
          'juno1nmezpepv3lx45mndyctz2lzqxa6d9xzd2xumkxf7a6r4nxt0y95qypm6c0',
          'juno1gyjl26rnqqyk6cuh6nqtvx8t885jgqagusvpqpvtgaygcjg2wjdqz0rzle',
          'juno1n34v729jqgysm5w0unukpt4kvqu4wqyacsv4krmd40f7pz5ruzwqau7e6m',
          'juno1mjsgk02jyn72jm2x7fgw72uu9wj7xy0v6pnuj2jd3aq7rgeqg5qq4dnhes',
        ],
        explorerUrlTemplates: {
          tx: 'https://ping.pub/juno/tx/REPLACE',
          gov: 'https://ping.pub/juno/gov',
          govProp: 'https://ping.pub/juno/gov/REPLACE',
          wallet: 'https://ping.pub/juno/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OsmosisMainnet,
        name: 'osmosis',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#5604e8',
        factoryContractAddress:
          'osmo1qpszqk458arkkdff5z4vrqlqv4k2n9a0tjme23vn00uyt30nrr7sfe87cv',
        kado: {
          network: 'OSMOSIS',
        },
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/osmosis/txs/REPLACE',
          gov: 'https://mintscan.io/osmosis/proposals',
          govProp: 'https://mintscan.io/osmosis/proposals/REPLACE',
          wallet: 'https://mintscan.io/osmosis/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.NeutronMainnet,
        name: 'neutron',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#000000',
        factoryContractAddress:
          'neutron1asszs9mjglv2rzpeu8fzlsa0cy55th0jkv27hsw3ulddt7f74gpsrqhatg',
        explorerUrlTemplates: {
          tx: 'https://neutron.celat.one/neutron-1/txs/REPLACE',
          wallet: 'https://neutron.celat.one/neutron-1/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V270,
        valence: {
          servicesManager:
            'neutron1gantvpnat0la8kkkzrnj48d5d8wxdjllh5r2w4r2hcrpwy00s69quypupa',
          rebalancer:
            'neutron1qs6mzpmcw3dvg5l8nyywetcj326scszdj7v4pfk55xwshd4prqnqfwc0z2',
        },
        other: {
          govSpamDb:
            'neutron1zgqhpaynwlfsgvlugjhv2wahdkfpfsvfl7x0n70syl680vx8ca0qzq6u9w',
        },
      },
      {
        chainId: ChainId.StargazeMainnet,
        name: 'stargaze',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#8ac3cc',
        factoryContractAddress:
          'stars1rncaxmp9n0cw6l5uw9qjwzptqjckdrk99hewh857j72pr3gv7tzqv5s88r',
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/stargaze/txs/REPLACE',
          gov: 'https://mintscan.io/stargaze/proposals',
          govProp: 'https://mintscan.io/stargaze/proposals/REPLACE',
          wallet: 'https://mintscan.io/stargaze/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.TerraMainnet,
        name: 'terra',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        overrideChainImageUrl: '/chains/terra.png',
        accentColor: '#113da5',
        factoryContractAddress:
          'terra1hm8w8474vq46fj4na9cjaud2ruzddhc0xttu87tg8s667ncsnhtq3l04mj',
        explorerUrlTemplates: {
          tx: 'https://chainsco.pe/terra2/tx/REPLACE',
          gov: 'https://chainsco.pe/terra2/governance',
          govProp: 'https://chainsco.pe/terra2/governance/proposal/REPLACE',
          wallet: 'https://chainsco.pe/terra2/address/REPLACE',
        },
        tokenDaoType: 'both',
        latestVersion: ContractVersion.V270,
      },
      {
        // Ensure this chain stays below Terra so that the logic in
        // makeGetDaoStaticProps works with Terra Classic fallback.
        chainId: ChainId.TerraClassicMainnet,
        name: 'terraclassic',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#ffd842',
        noInstantiate2Create: true,
        factoryContractAddress:
          'terra1utde3xa30zf6ntf0vz8wqd4ljplgpaztrkmp4x2vayaqq2kkyf6qmsz68l',
        explorerUrlTemplates: {
          tx: 'https://finder.terra-classic.hexxagon.io/mainnet/tx/REPLACE',
          gov: 'https://ping.pub/terra-luna/gov',
          govProp: 'https://ping.pub/terra-luna/gov/REPLACE',
          wallet:
            'https://finder.terra-classic.hexxagon.io/mainnet/address/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OraichainMainnet,
        name: 'oraichain',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        overrideChainImageUrl: '/chains/oraichain.svg',
        accentColor: '#ffffff',
        factoryContractAddress:
          'orai1wkmqccusdlnxpvwejpm73nlt3dqjrg5evyzld2kxgty3w4zfc4vsjrlrav',
        explorerUrlTemplates: {
          tx: 'https://scan.orai.io/txs/REPLACE',
          gov: 'https://scan.orai.io/proposals',
          govProp: 'https://scan.orai.io/proposals/REPLACE',
          wallet: 'https://scan.orai.io/account/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.KujiraMainnet,
        name: 'kujira',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#e53935',
        // Permissioned, only Kujira governance can create DAOs.
        factoryContractAddress:
          'kujira1d4zzt4y0meqr9m3k55w0k0zztpfwm8dulvv4zsnap8cd2na9uhdqemhppe',
        createViaGovernance: true,
        explorerUrlTemplates: {
          tx: 'https://finder.kujira.network/kaiyo-1/tx/REPLACE',
          gov: 'https://kujira.network/govern',
          govProp: 'https://kujira.network/govern/REPLACE',
          wallet: 'https://finder.kujira.network/kaiyo-1/address/REPLACE',
        },
        latestVersion: ContractVersion.V250,
      },
      {
        chainId: ChainId.ThorchainMainnet,
        name: 'thorchain',
        mainnet: true,
        noGov: true,
        indexer: SupportedChainIndexerMode.Tx,
        createSubDaoViaDao: true,
        accentColor: '#00eed1',
        factoryContractAddress:
          'thor1d8thneasuuhrflhel59hcvj77rj5vf6vjmz3njsu5n3ss94jjh5s73xqh5',
        explorerUrlTemplates: {
          tx: 'https://thorchain.net/tx/REPLACE',
          wallet: 'https://thorchain.net/address/REPLACE',
        },
        latestVersion: ContractVersion.V271,
      },
      {
        chainId: ChainId.BitsongMainnet,
        name: 'bitsong',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#c53381',
        factoryContractAddress:
          'bitsong1glrutywr7268g9ew0uwj6xq5z5hv7rv0t7pum9gyvpkj7egty5cqzf7rdt',
        tokenCreationFactoryAddress:
          'bitsong16jp4jd68hzpc9a88mqcg3mnktjhgrlyv96shx4zvt522zzq99afsdldd04',
        subDaos: [
          'bitsong1qfwdjcmxgjr9jwa2grhf7pce87afx57j2664tvhh29j7r68a9tgqj9kuf3',
        ],
        explorerUrlTemplates: {
          tx: 'https://explorer.chainroot.io/bitsong/transactions/REPLACE',
          gov: 'https://explorer.chainroot.io/bitsong/proposals',
          govProp: 'https://explorer.chainroot.io/bitsong/proposals/REPLACE',
          wallet: 'https://explorer.chainroot.io/bitsong/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.CosmosHubProviderTestnet,
        name: 'cosmosprovider',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#5064fb',
        factoryContractAddress:
          'cosmos1re4sge3zf9fr8g0j0q4lf6ks2gedq50qgp8jvhac7agavjvlhrdqqp5wqr',
        explorerUrlTemplates: {
          tx: 'https://explorer.polypore.xyz/provider/tx/REPLACE',
          gov: 'https://explorer.polypore.xyz/provider/gov',
          govProp: 'https://explorer.polypore.xyz/provider/gov/REPLACE',
          wallet: 'https://explorer.polypore.xyz/provider/account/REPLACE',
        },
        latestVersion: ContractVersion.V271,
      },
      {
        chainId: ChainId.JunoTestnet,
        name: 'juno',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#f74a49',
        factoryContractAddress:
          'juno10kkn698hpzm07kj0klhj3hrkxjsmngj9598esypm5kh9hfpealpq9vjvcw',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/juno/tx/REPLACE',
          gov: 'https://testnet.ping.pub/juno/gov',
          govProp: 'https://testnet.ping.pub/juno/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/juno/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OsmosisTestnet,
        name: 'osmosis',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#5604e8',
        factoryContractAddress:
          'osmo1em9rp0zucf9dm7luqf06n20ke9dj9q0yyyd26k5w348sm8rq7h4qwrx8uw',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/osmosis/tx/REPLACE',
          gov: 'https://testnet.ping.pub/osmosis/gov',
          govProp: 'https://testnet.ping.pub/osmosis/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/osmosis/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.StargazeTestnet,
        name: 'stargaze',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#8ac3cc',
        factoryContractAddress:
          'stars1ezkctzcnrvnwy94d6vjp2zkg68z272qndw688crzhh9nn4ud0q6sw8z03f',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/stargaze/tx/REPLACE',
          gov: 'https://testnet.ping.pub/stargaze/gov',
          govProp: 'https://testnet.ping.pub/stargaze/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/stargaze/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },

      {
        chainId: ChainId.NeutronTestnet,
        name: 'neutron',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#000000',
        factoryContractAddress:
          'neutron1caflev8smuslum9uque5z2qhma8xxxmap5dafeynekl37s966k8sq034r4',
        explorerUrlTemplates: {
          tx: 'https://neutron.celat.one/pion-1/txs/REPLACE',
          wallet: 'https://neutron.celat.one/pion-1/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },

      {
        chainId: ChainId.SecretTestnet,
        name: 'secret',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#000000',
        factoryContractAddress: 'secret1us532v7wpky7af5vhk68nj7th976d6lygpalaf',
        noInstantiate2Create: true,
        explorerUrlTemplates: {
          tx: 'https://secretnodes.com/pulsar/transactions/REPLACE',
          gov: 'https://secretnodes.com/pulsar/governance',
          govProp: 'https://secretnodes.com/pulsar/proposals/REPLACE',
          wallet: 'https://secretnodes.com/pulsar/accounts/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        latestVersion: ContractVersion.V242,
      },
      {
        chainId: ChainId.BabylonTestnet,
        name: 'babylon',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#ce6533',
        factoryContractAddress:
          'bbn1jwx9r9hcdmcag2zka3dwsg4ekx965ega3wd9gl90pd46gcp7ecnqh3se4m',
        explorerUrlTemplates: {
          tx: 'https://babylon-testnet.l2scan.co/tx/REPLACE',
          gov: 'https://babylon-testnet.l2scan.co/proposals',
          wallet: 'https://babylon-testnet.l2scan.co/address/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        noTokenCreation: true,
        latestVersion: ContractVersion.V260,
        daoCreatorDisabled: {
          // No NFTs on Babylon.
          [NftBasedCreatorId]: 'unsupported',
        },
      },
      {
        chainId: ChainId.ThorchainStagenet,
        name: 'thorchain',
        mainnet: false,
        noGov: true,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#00eed1',
        factoryContractAddress:
          'sthor122ht2h5ca482vlyqt22ecs6yw5n8f3rx6mwj9wu3jym99ct9xl2qj4cgrz',
        explorerUrlTemplates: {
          tx: 'https://runescan.io/tx/REPLACE?network=stagenet',
          wallet: 'https://runescan.io/address/REPLACE?network=stagenet',
        },
        latestVersion: ContractVersion.V271,
      },
      {
        chainId: ChainId.DaodiseoTestnet,
        name: 'daodiseo',
        mainnet: false,
        indexer: SupportedChainIndexerMode.None,
        accentColor: '#a454ac',
        factoryContractAddress:
          'odiseo124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqqgzgzrq',
        explorerUrlTemplates: {
          tx: 'https://testnet.explorer.chaintools.tech/odiseo/tx/REPLACE',
          gov: 'https://testnet.explorer.chaintools.tech/odiseo/gov',
          govProp:
            'https://testnet.explorer.chaintools.tech/odiseo/gov/REPLACE',
          wallet:
            'https://testnet.explorer.chaintools.tech/odiseo/account/REPLACE',
        },
        latestVersion: ContractVersion.V271,
      },
      {
        chainId: ChainId.KopiMainnet,
        name: 'kopi',
        mainnet: true,
        accentColor: '#b4e07c',
        factoryContractAddress:
          'kopi1gyh4td7v96mucr4eaksd2msg0jv0mcn9a5yj85vx5l7hty3tu9psxraxed',
        explorerUrlTemplates: {
          tx: 'https://explorer.kopi.money/luwak-1/tx/REPLACE',
          gov: 'https://explorer.kopi.money/luwak-1/gov',
          govProp: 'https://explorer.kopi.money/luwak-1/gov/REPLACE',
          wallet: 'https://explorer.kopi.money/luwak-1/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
        indexer: SupportedChainIndexerMode.None,
      },
      {
        chainId: ChainId.RegenMainnet,
        name: 'regen',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        noTokenCreation: true,
        accentColor: '#53b878',
        factoryContractAddress:
          'regen1gg4etmpcvnk49fwxn0tuvn2cw7txvhcrkmgltnxur7r6gc2xl5fsdz2kut',
        explorerUrlTemplates: {
          tx: 'https://explorer.chainroot.io/regen/transactions/REPLACE',
          gov: 'https://explorer.chainroot.io/regen/proposals',
          govProp: 'https://explorer.chainroot.io/regen/proposals/REPLACE',
          wallet: 'https://explorer.chainroot.io/regen/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V280Alpha2,
      },
      {
        chainId: ChainId.RegenTestnet,
        name: 'regen',
        mainnet: false,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#53b878',
        factoryContractAddress:
          'regen1cpewugrc7gx9lx9qf63ahxsslhs004zvdfuagdunfpfqzxn3fnyq5drgqn',
        explorerUrlTemplates: {
          tx: 'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/tx/REPLACE',
          gov: 'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/gov',
          govProp:
            'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/gov/REPLACE',
          wallet:
            'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/account/REPLACE',
        },
        latestVersion: ContractVersion.V280Alpha2,
      },
      {
        chainId: ChainId.RegenMainnet,
        name: 'regen',
        mainnet: true,
        indexer: SupportedChainIndexerMode.Tx,
        noTokenCreation: true,
        accentColor: '#53b878',
        factoryContractAddress:
          'regen1gg4etmpcvnk49fwxn0tuvn2cw7txvhcrkmgltnxur7r6gc2xl5fsdz2kut',
        explorerUrlTemplates: {
          tx: 'https://explorer.chainroot.io/regen/transactions/REPLACE',
          gov: 'https://explorer.chainroot.io/regen/proposals',
          govProp: 'https://explorer.chainroot.io/regen/proposals/REPLACE',
          wallet: 'https://explorer.chainroot.io/regen/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V280Alpha2,
      },
      {
        chainId: ChainId.RegenTestnet,
        name: 'regen',
        mainnet: false,
        indexer: SupportedChainIndexerMode.Tx,
        accentColor: '#53b878',
        factoryContractAddress:
          'regen1cpewugrc7gx9lx9qf63ahxsslhs004zvdfuagdunfpfqzxn3fnyq5drgqn',
        explorerUrlTemplates: {
          tx: 'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/tx/REPLACE',
          gov: 'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/gov',
          govProp:
            'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/gov/REPLACE',
          wallet:
            'https://explorer-regen-upgrade.vitwit.com/regen-upgrade/account/REPLACE',
        },
        latestVersion: ContractVersion.V280Alpha2,
      },
      // {
      //   chainId: ChainId.TerpTestnet,
      //   name: 'terp',
      //   mainnet: true,
      //   accentColor: '#b4e07c',
      //   factoryContractAddress:
      //     '',
      //   explorerUrlTemplates: {
      //     tx: 'https://testnet-explorer.terp.network/tx/REPLACE',
      //     gov: 'https://testnet-explorer.terp.network/gov',
      //     govProp: 'https://testnet-explorer.terp.network/gov/REPLACE',
      //     wallet: 'https://testnet-explorer.terp.network/account/REPLACE',
      //   },
      //   latestVersion: ContractVersion.V270,
      //   indexer: SupportedChainIndexerMode.None,
      // },
    ]

const convertConfiguredChainToSupportedChain = (
  chain: (typeof BASE_SUPPORTED_CHAINS)[number]
): SupportedChainConfig => {
  // If testing, use the test codeIds. It's safe to require fs and path here
  // since this will only run in a node environment.
  const allCodeIdsToUse = TEST_ENV
    ? JSON.parse(
      // eslint-disable-next-line regex/invalid
      // Use `eval('require')` instead of `require` so webpack doesn't attempt
      // to bundle these node packages in the browser. The test environment is
      // only used in tests run by node, so these will never be used in the
      // browser.
      //
      // eslint-disable-next-line regex/invalid
      eval('require')('fs').readFileSync(
        // eslint-disable-next-line regex/invalid
        eval('require')('path').join(__dirname, './codeIds.test.json'),
        'utf8'
      )
    )
    : ALL_CODE_IDS

  const allCodeIds = allCodeIdsToUse[chain.chainId as ChainId] || {}
  const codeIds = allCodeIds[chain.latestVersion] || {}

  return {
    ...chain,
    codeIds,
    allCodeIds,
    codeHashes:
      ALL_CODE_HASHES[chain.chainId as ChainId]?.[chain.latestVersion],
    allCodeHashes: ALL_CODE_HASHES[chain.chainId as ChainId],
    polytone: ALL_POLYTONE[chain.chainId as ChainId],
  }
}

// Extract info from JSON config.
export let SUPPORTED_CHAINS: SupportedChainConfig[] = BASE_SUPPORTED_CHAINS.map(
  convertConfiguredChainToSupportedChain
)

export const POLYTONE_CONFIG_PER_CHAIN: [ChainId, PolytoneConfig][] =
  SUPPORTED_CHAINS.map(({ chainId, polytone: polytone = {} }) => [
    chainId as ChainId,
    polytone,
  ])

export const VALENCE_SUPPORTED_CHAINS = SUPPORTED_CHAINS.filter(
  ({ valence }) => valence
).map(({ chainId }) => chainId as ChainId)

export const CHAIN_ENDPOINTS: Partial<
  Record<
    ChainId,
    {
      rpc: string
      rest: string
    }
  >
> = {
  [ChainId.JunoMainnet]: {
    rpc: 'https://juno-rpc.polkachu.com',
    rest: 'https://juno-api.polkachu.com',
  },
  [ChainId.JunoTestnet]: {
    rpc: 'https://juno-testnet-rpc.polkachu.com',
    rest: 'https://juno-testnet-api.polkachu.com',
  },
  [ChainId.OsmosisMainnet]: {
    rpc: 'https://osmosis-rpc.publicnode.com',
    rest: 'https://osmosis-rest.publicnode.com',
  },
  [ChainId.OsmosisTestnet]: {
    rpc: 'https://osmosis-testnet-rpc.polkachu.com',
    rest: 'https://osmosis-testnet-api.polkachu.com',
  },
  [ChainId.StargazeMainnet]: {
    rpc: 'https://stargaze-rpc.polkachu.com',
    rest: 'https://stargaze-api.polkachu.com',
  },
  [ChainId.StargazeTestnet]: {
    rpc: 'https://stargaze-testnet-rpc.polkachu.com',
    rest: 'https://stargaze-testnet-api.polkachu.com',
  },
  [ChainId.NeutronMainnet]: {
    rpc: 'https://rpc-lb.neutron.org',
    rest: 'https://rest-lb.neutron.org',
  },
  [ChainId.NeutronTestnet]: {
    rpc: 'https://rpc-lb-pion.ntrn.tech',
    rest: 'https://rest-lb-pion.ntrn.tech',
  },
  [ChainId.CosmosHubMainnet]: {
    rpc: 'https://cosmos-rpc.polkachu.com',
    rest: 'https://cosmos-api.polkachu.com',
  },
  [ChainId.CosmosHubProviderTestnet]: {
    rpc: 'https://cosmos-testnet-rpc.polkachu.com',
    rest: 'https://cosmos-testnet-api.polkachu.com',
  },
  [ChainId.TerraMainnet]: {
    rpc: 'https://rpc.phoenix-foundation.dev',
    rest: 'https://lcd.phoenix-foundation.dev',
  },
  [ChainId.TerraClassicMainnet]: {
    rpc: 'https://terra-classic-rpc.publicnode.com',
    rest: 'https://terra-classic-lcd.publicnode.com',
  },
  [ChainId.MigalooMainnet]: {
    rpc: 'https://migaloo-rpc.polkachu.com',
    rest: 'https://migaloo-api.polkachu.com',
  },
  [ChainId.MigalooTestnet]: {
    rpc: 'https://migaloo-testnet-rpc.polkachu.com',
    rest: 'https://migaloo-testnet-api.polkachu.com',
  },
  [ChainId.KujiraMainnet]: {
    rpc: 'https://kujira-rpc.publicnode.com',
    rest: 'https://kujira-rest.publicnode.com',
  },
  [ChainId.KujiraTestnet]: {
    rpc: 'https://kujira-testnet-rpc.polkachu.com',
    rest: 'https://kujira-testnet-api.polkachu.com',
  },
  [ChainId.ChihuahuaMainnet]: {
    rpc: 'https://chihuahua-rpc.polkachu.com',
    rest: 'https://chihuahua-api.polkachu.com',
  },
  [ChainId.OraichainMainnet]: {
    rpc: 'https://rpc.orai.io',
    rest: 'https://lcd.orai.io',
  },
  [ChainId.ArchwayMainnet]: {
    rpc: 'https://archway-rpc.polkachu.com',
    rest: 'https://archway-api.polkachu.com',
  },
  [ChainId.BitsongTestnet]: {
    rpc: 'https://rpc-testnet.explorebitsong.com',
    rest: 'https://lcd-testnet.explorebitsong.com',
  },
  [ChainId.BitsongMainnet]: {
    rpc: 'https://rpc.explorebitsong.com',
    rest: 'https://lcd.explorebitsong.com',
  },
  [ChainId.OmniflixHubMainnet]: {
    rpc: 'https://omniflix-rpc.polkachu.com',
    rest: 'https://omniflix-api.polkachu.com',
  },
  [ChainId.OmniflixHubTestnet]: {
    rpc: 'https://rpc.testnet.omniflix.network',
    rest: 'https://api.testnet.omniflix.network',
  },
  [ChainId.SecretTestnet]: {
    rpc: 'https://pulsar.rpc.secretnodes.com',
    rest: 'https://pulsar.lcd.secretnodes.com',
  },
  [ChainId.BabylonTestnet]: {
    rpc: 'https://babylon-testnet-rpc.polkachu.com',
    rest: 'https://babylon-testnet-api.polkachu.com',
  },
  [ChainId.ThorchainMainnet]: {
    rpc: 'https://gateway.liquify.com/chain/thorchain_rpc',
    rest: 'https://gateway.liquify.com/chain/thorchain_api',
  },
  [ChainId.ThorchainStagenet]: {
    rpc: 'https://stagenet-rpc.ninerealms.com',
    rest: 'https://stagenet-thornode.ninerealms.com',
  },
  [ChainId.IntergazeMainnet]: {
    rpc: 'https://rpc.intergaze-apis.com',
    rest: 'https://rest.intergaze-apis.com',
  },
  [ChainId.DaodiseoTestnet]: {
    rpc: 'https://testnet-rpc.daodiseo.chaintools.tech',
    rest: 'https://testnet-api.daodiseo.chaintools.tech',
  },
  [ChainId.KopiMainnet]: {
    rpc: 'https://rpc.kopi.money',
    rest: 'https://rest.kopi.money',
  },
  [ChainId.PryzmMainnet]: {
    rpc: 'https://pryzm-rpc.polkachu.com',
    rest: 'https://pryzm-api.polkachu.com',
  },
  [ChainId.RegenMainnet]: {
    rpc: 'https://regen-rpc.publicnode.com',
    rest: 'https://regen-lcd.publicnode.com',
  },
  [ChainId.RegenTestnet]: {
    rpc: 'https://rpc-regen-upgrade.vitwit.com',
    rest: 'https://api-regen-upgrade.vitwit.com',
  },
  [ChainId.TerpMainnet]: {
    rpc: 'https://rpc.terp.network',
    rest: 'https://api.terp.network',
  },
}

export const GAS_OVERRIDES: Partial<
  Record<
    ChainId,
    {
      amount: number
      denom: string
    }
  >
> = {
  [ChainId.KujiraTestnet]: {
    amount: 0.00125,
    denom: 'ukuji',
  },
}

// The chains not to show in the governance UI.
const NO_GOV_CHAIN_IDS = ['noble-1']

const convertChainToBaseChainConfig = (
  chain: AnyChain
): BaseChainConfig | undefined => {
  // Skip if chain already exists in configured chains.
  if (SUPPORTED_CHAINS.some((c) => c.chainId === chain.chainId)) {
    return
  }

  // Skip if no RPC exists for chain. Can't use `getRpcForChainId` helper
  // because that file depends on this one. Yay circular dependencies.
  if (
    !(chain.chainId in CHAIN_ENDPOINTS) &&
    !chain.chainRegistry?.apis?.rpc?.length
  ) {
    return
  }

  let explorerUrlTemplates: BaseChainConfig['explorerUrlTemplates'] = undefined
  const explorers = chain.chainRegistry?.explorers
  if (explorers) {
    const mintscanExplorer = explorers.find(
      (explorer) =>
        explorer.kind?.toLowerCase() === 'mintscan' &&
        explorer.url?.includes('mintscan.io')
    )
    if (mintscanExplorer) {
      explorerUrlTemplates = {
        tx: mintscanExplorer.url + '/txs/REPLACE',
        gov: mintscanExplorer.url + '/proposals',
        govProp: mintscanExplorer.url + '/proposals/REPLACE',
        wallet: mintscanExplorer.url + '/account/REPLACE',
      }
    }

    if (!explorerUrlTemplates) {
      const pingPubExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'ping.pub' &&
          // Some explorers have kind = 'ping.pub' but the wrong URL.
          explorer.url?.includes('ping.pub')
      )
      if (pingPubExplorer) {
        explorerUrlTemplates = {
          tx: pingPubExplorer.url + '/tx/REPLACE',
          gov: pingPubExplorer.url + '/gov',
          govProp: pingPubExplorer.url + '/gov/REPLACE',
          wallet: pingPubExplorer.url + '/account/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const atomScanExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'atomscan' &&
          explorer.url?.includes('atomscan.com')
      )
      if (atomScanExplorer) {
        explorerUrlTemplates = {
          tx: atomScanExplorer.url + '/transactions/REPLACE',
          gov: atomScanExplorer.url + '/votes',
          govProp: atomScanExplorer.url + '/votes/REPLACE',
          wallet: atomScanExplorer.url + '/accounts/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const bigDipperExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'bigdipper' &&
          explorer.url?.includes('bigdipper.live')
      )
      if (bigDipperExplorer) {
        explorerUrlTemplates = {
          tx: bigDipperExplorer.url + '/transactions/REPLACE',
          gov: bigDipperExplorer.url + '/proposals',
          govProp: bigDipperExplorer.url + '/proposals/REPLACE',
          wallet: bigDipperExplorer.url + '/accounts/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const explorersGuruExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'explorers.guru' &&
          explorer.url?.includes('explorers.guru')
      )
      if (explorersGuruExplorer) {
        explorerUrlTemplates = {
          tx: explorersGuruExplorer.url + '/transaction/REPLACE',
          gov: explorersGuruExplorer.url + '/proposals',
          govProp: explorersGuruExplorer.url + '/proposals/REPLACE',
          wallet: explorersGuruExplorer.url + '/account/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const stakeflowExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'stakeflow' &&
          explorer.url?.includes('stakeflow.io')
      )
      if (stakeflowExplorer) {
        explorerUrlTemplates = {
          tx: stakeflowExplorer.url + '/transactions/REPLACE',
          gov: stakeflowExplorer.url + '/proposals',
          govProp: stakeflowExplorer.url + '/proposals/REPLACE',
          wallet: stakeflowExplorer.url + '/accounts/REPLACE',
        }
      }
    }
  }

  return {
    chainId: chain.chainId,
    name: chain.chainName,
    mainnet: chain.chainRegistry?.network_type === 'mainnet',
    accentColor: '',
    noGov: NO_GOV_CHAIN_IDS.includes(chain.chainId),
    explorerUrlTemplates,
  }
}
/**
 * All configured chains. Configured chains are either supported chains, which
 * DAO DAO is deployed on, or other chains that show up in the governance UI.
 */
export let CONFIGURED_CHAINS: BaseChainConfig[] = [
  ...SUPPORTED_CHAINS,
  // Add other chains from chain registry.
  ...(TEST_ENV
    ? []
    : chains
      .flatMap((chain) => convertChainToBaseChainConfig(chain) || [])
      .sort((a, b) => a.name.localeCompare(b.name))),
]

/**
 * Add a chain to the chains list and configured chains.
 *
 * For use in testing.
 */
export const _addChain = ({
  chain,
  rpcEndpoint,
  restEndpoint,
}: {
  chain: Chain | AnyChain
  rpcEndpoint: string
  restEndpoint: string
}) => {
  const anyChain =
    'chain_id' in chain ? convertChainRegistryChainToAnyChain(chain) : chain

  // Remove any existing chain with the same chain ID or name.
  const indexOfChain = chains.findIndex(
    (c) => c.chainId !== anyChain.chainId && c.chainName !== anyChain.chainName
  )
  if (indexOfChain !== -1) {
    chains.splice(indexOfChain, 1)
  }

  const indexOfConfiguredChain = CONFIGURED_CHAINS.findIndex(
    (c) => c.chainId !== anyChain.chainId && c.name !== anyChain.chainName
  )
  if (indexOfConfiguredChain !== -1) {
    CONFIGURED_CHAINS.splice(indexOfConfiguredChain, 1)
  }

  const indexOfSupportedChain = SUPPORTED_CHAINS.findIndex(
    (c) => c.chainId !== anyChain.chainId && c.name !== anyChain.chainName
  )
  if (indexOfSupportedChain !== -1) {
    SUPPORTED_CHAINS.splice(indexOfSupportedChain, 1)
  }

  // Add the new chain.
  chains.push(anyChain)
  const baseChainConfig = convertChainToBaseChainConfig(anyChain)
  if (baseChainConfig) {
    CONFIGURED_CHAINS.push(baseChainConfig)
  }

  // Set preferred RPC and REST endpoints.
  CHAIN_ENDPOINTS[anyChain.chainId as keyof typeof CHAIN_ENDPOINTS] = {
    rpc: rpcEndpoint,
    rest: restEndpoint,
  }
}

/**
 * Add a supported chain.
 *
 * For use in testing.
 */
export const _addSupportedChain = ({
  chain,
  version,
  factoryContractAddress,
  explorerUrl,
}: {
  chain: Chain | AnyChain
  version: ContractVersion
  factoryContractAddress: string
  explorerUrl: string
}): SupportedChainConfig => {
  const anyChain =
    'chain_id' in chain ? convertChainRegistryChainToAnyChain(chain) : chain

  const baseExplorerUrl = `${explorerUrl}/${anyChain.chainId}`

  // Remove any existing chain with the same chain ID or name.
  SUPPORTED_CHAINS = SUPPORTED_CHAINS.filter(
    (c) => c.chainId !== anyChain.chainId && c.name !== anyChain.chainName
  )

  const config = convertConfiguredChainToSupportedChain({
    chainId: anyChain.chainId,
    name: anyChain.chainName,
    mainnet: false,
    indexer: SupportedChainIndexerMode.None,
    accentColor: '',
    factoryContractAddress,
    explorerUrlTemplates: {
      tx: `${baseExplorerUrl}/tx/REPLACE`,
      gov: `${baseExplorerUrl}/gov`,
      govProp: `${baseExplorerUrl}/gov/REPLACE`,
      wallet: `${baseExplorerUrl}/account/REPLACE`,
    },
    latestVersion: version,
  })

  // Add to supported chains.
  SUPPORTED_CHAINS.push(config)

  return config
}
