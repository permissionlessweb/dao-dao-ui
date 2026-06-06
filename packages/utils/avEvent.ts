import { Coin } from "@dao-dao/types"

// license fees via chain-id 
export const getLicenseFee = (
    chainId: string
): Coin => {
    switch (chainId) {
        // Mainnets
        case 'juno-1':
            return { denom: 'ujuno', amount: '1000000' }; // 1 JUNO
        case 'phoenix-1': // Terra 2.0
            return { denom: 'uluna', amount: '5000000' }; // 5 LUNA
        case 'osmosis-1':
            return { denom: 'uosmo', amount: '10000000' }; // 10 OSMO
        case 'injective-1':
            return { denom: 'inj', amount: '10000000000000000000' }; // 10 INJ (18 decimals)
        case 'kaiyo-1': // Kujira
            return { denom: 'ukuji', amount: '250000000' }; // 250 KUJI
        case 'chihuahua-1':
            return { denom: 'uhuahua', amount: '2000000000' }; // 2000 HUAHUA
            
        // Testnets
        case 'uni-6': // Juno testnet
            return { denom: 'ujunox', amount: '5000000' };
        case 'osmo-test-5': // Osmosis testnet
            return { denom: 'uosmo', amount: '10000000' };
        case 'injective-888': // Injective testnet
            return { denom: 'inj', amount: '10000000000000000000' };
            
        // Default for unknown chains (using ATOM)
        default:
            return { denom: 'uatom', amount: '300000' }; // 0.3 ATOM
    }
}